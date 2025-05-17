import React, {  useRef, useState ,useEffect} from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
   import {useCart} from '../pages/CartContext';
   import gsap from 'gsap';
  
const Display = () => {
  const details=useLoaderData();
  console.log(details);
  const [quantity,setquantity]=useState(1);
 const {increamentCart}=useCart();
 
 useEffect(() => {
  const tl = gsap.timeline({ duration:3,ease:"power1.out", });

    tl.fromTo(gsap.utils.toArray('.img-gsap '), {
      opacity: 0,
      x: -100,

    },
  {
    opacity:1,
    x:0,
  }).fromTo(gsap.utils.toArray('.detail-gsap'), {
      opacity: 0,
      x: 100,
    },{
     opacity:1,
    x:0, 
    });
  }, []); // Run once on mount

const subtract=()=>{
  setquantity( prev => Math.max(1, prev - 1));
}
const add=()=>{
  setquantity(prev => prev + 1);
}



 const addToCart = async () => {
    const cartData = {
      Quantity: quantity,
      productId: details.product_id,
    };

    try {
      const response = await axios.post('http://localhost/npm/cart.php', cartData );
     if(response.data){
       increamentCart(quantity);
       console.log(response.data);
     }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  return (
    <div style={{ paddingLeft: '8%', paddingRight: '8%' }}>
{
  details.map((detail) => (
    <div key={detail.product_id} className='display'      style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      gap: '10%',
       paddingLeft: '8%',
       paddingRight: '8%',
       paddingBottom: '4%',
       marginTop:'2%',
       opacity:'1',
    }} >
      <img src={detail.image_url} alt="product"  className="img-gsap" />
      
      <div  className="detail-gsap">
      <h2 className='des'>
        {detail.description}
      </h2>
      <h3 className='price'>Price: {detail.price}</h3>
    <div className='table'>
      <p>services:</p>  
   <p>Fullfilled By Yogo  </p> 
   <p>product Name:</p>   
   <p>  {detail.products_name} </p>
     
   <p>weight:</p> 
    <p>{detail.weight_ml}ml</p> 
    <p>Quantity:</p> 
     
    <div className='quantity'>
    <button onClick={subtract}>-</button>
       <div>{quantity}</div>
      <button onClick={add}>+</button>
      

      </div>  
      

      </div>
      <div className='Pay_buttons'>
        <button className='cart' onClick={addToCart}>Add to Cart</button>
      <button className='pay_now'>Pay Now</button></div>
      </div>
    </div>
  ))
}
  

  
    </div>
  )
}

export default Display

export const productDetails=async({params}) => {
  const {id}=params;
  const p_id={
    product_id:id,
  }
  try{
  const response=  await axios.post('http://localhost/npm/display.php',p_id);
    if(response.data){
      return response.data;
    }
    else{
      throw new Error('product not found');
    }
  
    }
 
  catch(error){
   alert(error.message); 
   return null;
  }
}

