import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  GetCartByIdDocument,
  useAddItemToCartMutation,
  useClearCartMutation,
  useDeleteCartItemMutation,
  useFindUserCartIdQuery,
  useGetCartByIdQuery,
  useIncreaseItemQuantityMutation,
  usePublishCartItemMutation,
  usePublishCartMutation,
} from '../../generated/graphql';
import { displayToast } from '../../lib/displayToast';
import { useSession } from 'next-auth/react';

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

  const { data: session } = useSession();

  const cartId = useFindUserCartIdQuery({ variables: { id: session?.user.id! }, fetchPolicy: 'network-only' });

  const { data } = useGetCartByIdQuery({
    variables: { id: cartId.data?.account?.cart?.id! },
    fetchPolicy: 'network-only',
  });

  const [insertItemToCart] = useAddItemToCartMutation();
  const [increaseItemQuantity] = useIncreaseItemQuantityMutation();
  const [removeItemsFromCart] = useClearCartMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: cartId.data?.account?.cart?.id,
        },
      },
    ],
  });
  const [deleteItemFromCart] = useDeleteCartItemMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: cartId.data?.account?.cart?.id,
        },
      },
    ],
  });

  const [publishCartItem] = usePublishCartItemMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: cartId.data?.account?.cart?.id,
        },
      },
    ],
  });
  const [publishCart] = usePublishCartMutation({
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: cartId.data?.account?.cart?.id,
        },
      },
    ],
  });

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

  const addItemToCart = useCallback(
    async (product: CartItem) => {
      const existingItem = data?.cart?.cartItems.find((existingItem) => existingItem.product?.id === product.id);
      if (!existingItem) {
        displayToast(`Successfully Added ${product.title} to your cart !`);
        const cartItem = await insertItemToCart({
          variables: { cartId: cartId.data?.account?.cart?.id!, productId: product.id },
        });

        await publishCartItem({
          variables: { id: cartItem.data?.updateCart?.cartItems[cartItem.data?.updateCart?.cartItems.length - 1].id! },
        });

        await publishCart({
          variables: {
            id: cartId.data?.account?.cart?.id!,
          },
        });

        return;
      }

      await increaseItemQuantity({
        variables: {
          cartId: cartId.data?.account?.cart?.id!,
          cartItemId: existingItem?.id!,
          quantity: existingItem?.quantity! + 1,
        },
      });

      await publishCart({
        variables: {
          id: cartId.data?.account?.cart?.id!,
        },
      });

      displayToast(`Increased quantity of ${product.title} to ${existingItem?.quantity! + 1} in your cart !`);

      await publishCartItem({
        variables: { id: existingItem?.id! },
      });
    },
    [
      cartId.data?.account?.cart?.id,
      data?.cart?.cartItems,
      increaseItemQuantity,
      insertItemToCart,
      publishCart,
      publishCartItem,
    ]
  );

  const removeItemFromCart = useCallback(
    async (id: CartItem['id']) => {
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
          cartId: cartId.data?.account?.cart?.id!,
          cartItemId: existingItem?.id!,
          quantity: existingItem?.quantity! - 1,
        },
      });

      await publishCartItem({
        variables: { id: existingItem?.id! },
      });

      await publishCart({
        variables: {
          id: cartId.data?.account?.cart?.id!,
        },
      });
    },
    [
      cartId.data?.account?.cart?.id,
      data?.cart?.cartItems,
      deleteItemFromCart,
      increaseItemQuantity,
      publishCart,
      publishCartItem,
    ]
  );

  const clearCart = useCallback(async () => {
    await removeItemsFromCart({
      variables: {
        id: cartId.data?.account?.cart?.id!,
      },
    });

    await publishCart({
      variables: {
        id: cartId.data?.account?.cart?.id!,
      },
    });
  }, [cartId.data?.account?.cart?.id, publishCart, removeItemsFromCart]);

  const total = useMemo(
    () =>
      cartItems.reduce((actualPrice, item) => {
        return actualPrice + item.price * item.count;
      }, 0),
    [cartItems]
  );

  const value = {
    items: cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
