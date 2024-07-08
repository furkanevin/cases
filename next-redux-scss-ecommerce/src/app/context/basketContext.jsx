'use client';
import { useLocalStorage } from '@uidotdev/usehooks';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage('basket', []);

  const addToBasket = (newProduct) => {
    const found = basket.find((i) => i.id === newProduct.id);

    if (found) {
      const updated = { ...found, amount: found.amount + 1 };

      const newBasket = basket.map((item) =>
        item.id === updated.id ? updated : item
      );

      setBasket(newBasket);

      toast.info(`Ürün miktarı arttırıldı (${updated.amount})`);
    } else {
      setBasket([...basket, { ...newProduct, amount: 1 }]);

      toast.success('Ürün sepete eklendi');
    }
  };

  const removeFromBasket = (delete_id) => {
    const filtred = basket.filter((i) => i.id !== delete_id);

    setBasket(filtred);

    toast.error('Ürün sepetten kaldırıldı');
  };

  const decreaseAmount = (delete_id) => {
    const found = basket.find((i) => i.id === delete_id);

    if (found.amount > 1) {
      const updated = { ...found, amount: found.amount - 1 };

      const newBasket = basket.map((i) => (i.id === updated.id ? updated : i));

      setBasket(newBasket);

      toast.info(`Ürünün miktarı azaltıldı (${updated.amount})`);
    } else {
      removeFromBasket(delete_id);
    }
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, removeFromBasket, decreaseAmount }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasketContext() {
  return useContext(BasketContext);
}
