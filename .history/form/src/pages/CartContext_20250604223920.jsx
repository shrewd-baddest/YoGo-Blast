import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  

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

