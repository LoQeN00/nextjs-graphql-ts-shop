import React, { createContext, useState, useEffect } from 'react';
import {
  GetCartByIdDocument,
  useAddItemToCartMutation,
  useClearCartMutation,
  useDeleteCartItemMutation,
  useGetCartByIdQuery,
  useIncreaseItemQuantityMutation,
  usePublishCartItemMutation,
  usePublishCartMutation,
} from '../../generated/graphql';
import { displayToast } from '../../lib/displayToast';

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
  readonly image: string;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (product: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem['id']) => void;
  readonly clearCart: () => void;
  readonly total: number;
}

export const CartContext = createContext<CartState | null>(null);

type CartProviderProps = {
  children: React.ReactNode;
};

const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem('SHOPPING_CART');
  if (!itemsFromLocalStorage) return [];
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const setCartItemsInStorage = (items: CartItem[] | []) => {
  if (!items) return;
  localStorage.setItem('SHOPPING_CART', JSON.stringify(items));
};

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { data, refetch } = useGetCartByIdQuery({ variables: { id: 'cl6w1lq0gkdxn0blmu6ymwfdp' } });

  const [insertItemToCart] = useAddItemToCartMutation();
  const [increaseItemQuantity] = useIncreaseItemQuantityMutation();
  const [removeItemsFromCart] = useClearCartMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        },
      },
    ],
  });
  const [deleteItemFromCart] = useDeleteCartItemMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        },
      },
    ],
  });

  const [publishCartItem] = usePublishCartItemMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        },
      },
    ],
  });
  const [publishCart] = usePublishCartMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        },
      },
    ],
  });

  console.log(data);

  useEffect(() => {
    if (!data) return;

    if (!data.cart) return;

    const cartItems = data.cart!.cartItems.map((item) => {
      return {
        id: item.product!.id,
        price: item.product!.price,
        title: item.product!.name,
        count: item.quantity,
        image: item.product!.images[0].url,
      };
    });

    setCartItems(cartItems);
  }, [data]);

  const addItemToCart = async (product: CartItem) => {
    const existingItem = data?.cart?.cartItems.find((existingItem) => existingItem.product?.id === product.id);
    if (!existingItem) {
      displayToast(`Successfully Added ${product.title} to your cart !`);
      const cartItem = await insertItemToCart({
        variables: { cartId: 'cl6w1lq0gkdxn0blmu6ymwfdp', productId: product.id },
      });

      await publishCartItem({
        variables: { id: cartItem.data?.updateCart?.cartItems[cartItem.data?.updateCart?.cartItems.length - 1].id! },
      });

      await publishCart({
        variables: {
          id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        },
      });

      return;
    }

    await increaseItemQuantity({
      variables: {
        cartId: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        cartItemId: existingItem?.id!,
        quantity: existingItem?.quantity! + 1,
      },
    });

    await publishCart({
      variables: {
        id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
      },
    });

    displayToast(`Increased quantity of ${product.title} to ${existingItem?.quantity! + 1} in your cart !`);

    await publishCartItem({
      variables: { id: existingItem?.id! },
    });
  };

  const removeItemFromCart = async (id: CartItem['id']) => {
    const existingItem = data?.cart?.cartItems.find((existingItem) => existingItem.product?.id === id);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      await deleteItemFromCart({
        variables: {
          id: existingItem?.id!,
        },
      });

      return;
    }

    await increaseItemQuantity({
      variables: {
        cartId: 'cl6w1lq0gkdxn0blmu6ymwfdp',
        cartItemId: existingItem?.id!,
        quantity: existingItem?.quantity! - 1,
      },
    });

    await publishCartItem({
      variables: { id: existingItem?.id! },
    });

    await publishCart({
      variables: {
        id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
      },
    });
  };

  const clearCart = async () => {
    await removeItemsFromCart({
      variables: {
        id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
      },
    });

    await publishCart({
      variables: {
        id: 'cl6w1lq0gkdxn0blmu6ymwfdp',
      },
    });
  };

  const total = cartItems.reduce((actualPrice, item) => {
    return actualPrice + item.price * item.count;
  }, 0);

  const value = {
    items: cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
