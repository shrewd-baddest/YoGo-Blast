import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost/npm/cart.php', {crea: true })
      .then(response => {
        const Counts = response.data.total_quantity || 0;
        setCount(Counts);
      })
      .catch(error => {
        console.error('Error fetching cart count:', error);
      });
  }, [count]);

  const increamentCart = (quantity) => {
    setCount(prev => Math.max(0, prev + quantity));
  };

  return (
    <cartContext.Provider value={{ count, increamentCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);

