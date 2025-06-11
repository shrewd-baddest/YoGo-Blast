import React, {  useRef, useState ,useEffect} from 'react';
import axios from 'axios';
import { useLoaderData,Link } from 'react-router-dom';
   import {useCart} from '../pages/CartContext';
   import gsap from 'gsap';
  
const Display = () => {
  const detail=useLoaderData();
   console.log(detail);
  const [quantity,setquantity]=useState(1);
  const {increamentCart}=useCart(); 
  const [choices,setChoices]=useState([])
 const newImages = choices?.[0] || [];
const imagesLike = choices?.[1] || [];
  useEffect(
()=>{
const n_image=async()=>{
  try{

    const newImages=await fetch('http://localhost/npm/home.php');
  setChoices(await newImages.json());
  }
  catch(error){
    console.log(error);
    return null;
  }
  finally{
     console.log('home page');
     
  }
}
n_image();
},
[]
  )
 
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
      productId:detail.products_id,
    };
    console.log(cartData.productId);
    try {
      const response = await axios.post(
        'http://localhost/npm/cart.php',
        cartData,
        { withCredentials: true }   //Include credentials in the request
      );
      if(response.data.status=="success"){
        increamentCart(quantity);
        alert(response.data.message);
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  return (
    <div style={{ paddingLeft: '8%', paddingRight: '8%' }}>
{
  // details.map((detail) => (

    <div key={detail.products_id} className='display'      style={{
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
    
  // ))
}
  
<h3 className='gsap-new' style={{opacity:'1',}} >What are the New Sales</h3>
<div className='new'>
 {newImages.map((newImage)=>(
  <div key={newImage.id} className='newImage'>
<Link to= {`/home/product/${newImage.products_id}`} className='nlinks' style={{textDecoration:"none"}} > 
<img 
     src={newImage.image_url} loading="lazy" />
     <p> {newImage.products_name} {newImage.weight_ml} ml</p>
     <p className='price'>Ksh:{newImage.price}</p>
     </Link>
     
</div>
 ))}
</div>
<h3>Tasty Flavours for our  Customers</h3>
 <div className="like">
 {imagesLike.map(
(imagePresent)=>(
  <div key={imagePresent.products_id} className='likedImage'>
{   console.log()}
<Link to= {`/home/product/${imagePresent.products_id}`} className='llinks' style={{textDecoration:"none"}} > 
<img 
     src={imagePresent.image_url} loading="lazy" />
     <p> {imagePresent.products_name} {imagePresent.weight_ml} ml</p>
     <p className='price'>Ksh:{imagePresent.price}</p>
     </Link>

</div>
))}
</div>
  
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
throw new Response("Not Found", { status: 404 });
    }
  
    }
 
  catch(error){
   alert(error.message); 
   return null;
  }
}
export const cart=async()=>{
  
  try{

   const number=await fetch('http://localhost/npm/cart.php');
  return number.json();
  }
  catch(error){
    console.log(error);
    return null; 
  }
  finally{
     console.log('home page');
     
  }
}

