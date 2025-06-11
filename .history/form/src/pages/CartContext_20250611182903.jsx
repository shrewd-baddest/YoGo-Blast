import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost/npm/cart.php', { withCredentials: true })
      .then(response => {
        const Counts = response.data.total_quantity || 0;
        parseInt(Counts);
    
        setCount(Counts);
      })
      .catch(error => {
        console.error('Error fetching cart count:', error);
      });
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

