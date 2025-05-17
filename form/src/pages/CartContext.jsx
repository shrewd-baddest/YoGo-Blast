import React from 'react'
import { createContext,
useState, useContext } from 'react';

const cartContext=createContext();

export const CartProvider = ({children}) => {
    const [count,setCount]=useState(0);
    const increamentCart=(quantity)=>{
        setCount(prev=>prev+quantity);
    }
  return (
    <div>
      <cartContext.Provider value={{count,increamentCart}}>
       {children}
        </cartContext.Provider>
    </div>
  )
}

    
export const useCart=()=>useContext(cartContext);
