import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface CartItem {
  readonly id: number;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (product: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem['id']) => void;
  readonly clearCart: () => void;
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

const displayToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
};

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);

  useEffect(() => {
    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  const addItemToCart = (product: CartItem) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find((existingItem) => existingItem.id === product.id);
      if (!existingItem) {
        displayToast(`Successfully Added ${product.title} to your cart !`);
        return [...prevState, product];
      }

      const newItems = prevState.map((existingItem) => {
        if (existingItem.id === product.id) {
          displayToast(`Increased count of ${existingItem.title} to ${existingItem.count + 1}`);
          return { ...existingItem, count: existingItem.count + 1 };
        }

        return existingItem;
      });

      return newItems;
    });
  };

  const removeItemFromCart = (id: CartItem['id']) => {
    setCartItems((prevState) => {
      const existingItem = prevState.find((existingItem) => existingItem.id === id);
      if (!existingItem) return prevState;

      if (existingItem.count === 1) {
        return prevState.filter((product) => product.id !== id);
      }

      const newItems = prevState.map((product) => {
        return product.id === id ? { ...product, count: product.count - 1 } : product;
      });

      return newItems;
    });
  };

  const clearCart = () => {
    setCartItemsInStorage([]);
    setCartItems([]);
  };

  const value = {
    items: cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
