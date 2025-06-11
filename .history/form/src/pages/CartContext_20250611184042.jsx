import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const refreshCartCount = () => {
    axios.get('http://localhost/npm/cart.php', { withCredentials: true })
      .then(response => {
        const Counts = parseInt(response.data.total_quantity, 10) || 0;
        setCount(Counts);
      })
      .catch(error => {
        console.error('Error fetching cart count:', error);
      });
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

  const increamentCart = (quantity) => {
    const num = Number(quantity);
    setCount(prev => Math.max(0, prev + (isNaN(num) ? 0 : num)));
  };

  return (
    <cartContext.Provider value={{ count, increamentCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);

