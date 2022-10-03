import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../services/api';
import { IRaffle } from '../utils/interfaces';
import Toast from '../components/Toast';

interface ICartRaffle {
  quantity: number;
  raffle: IRaffle;
}

interface CartContextState {
  cart: ICartRaffle[];
  addRaffleToCart: (raffle: IRaffle) => void;
  removeRaffleToCart: (id: string) => void;
  updateCart: (cart: ICartRaffle[]) => void;
  handleSubmit: () => void;
}

const CartContext = createContext<CartContextState>({} as CartContextState);

interface ICartProviderProps {
  children: ReactNode;
}

// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
// });

const CartProvider = ({ children }: ICartProviderProps) => {
  const [cart, setCart] = useState<ICartRaffle[]>([]);

  const addCartSessionStore = useCallback((cart: ICartRaffle[]) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, []);

  const addRaffleToCart = useCallback((raffle: IRaffle) => {
    setCart((oldCart) => {
      const existsIntoCart = oldCart.some((cartRaffle) => cartRaffle.raffle.id === raffle.id);
      if (existsIntoCart) {
        Toast.fire({
          icon: 'warning',
          title: 'Este item já esta incluso no seu carrinho!',
        });
        return oldCart;
      }
      const newCart = [...oldCart, { raffle, quantity: 1 }];
      addCartSessionStore(newCart);
      Toast.fire({
        icon: 'success',
        title: 'Adicionado com sucesso ao carrinho!',
      });
      return newCart;
    });
  }, []);

  const removeRaffleToCart = useCallback((raffleId: string) => {
    setCart((oldCart) => {
      const newCart = oldCart.filter((cardRaffle) => cardRaffle.raffle.id !== raffleId);
      addCartSessionStore(newCart);
      return newCart;
    });
  }, []);

  const updateCart = useCallback((cart: ICartRaffle[]) => {
    addCartSessionStore(cart);
    setCart(cart);
  }, []);

  const handleSubmit = async () => {
    const selectedRaffles = cart.map((item) => {
      return {
        id: item.raffle.id,
        quantity: item.quantity,
      };
    });
    try {
      const response = await api.post('/orders', {
        selectedRaffles: selectedRaffles,
      });
      Swal.fire({
        text: 'Pedido realizado com sucesso',
        icon: 'success',
      });
      sessionStorage.removeItem('cart');
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const cart = sessionStorage.getItem('cart');
    if (cart) return setCart(JSON.parse(cart));
    // if (!cart) return sessionStorage.setItem('cart', [].toString());
  }, []);

  return (
    <CartContext.Provider value={{ addRaffleToCart, removeRaffleToCart, cart, updateCart, handleSubmit }}>
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextState {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
