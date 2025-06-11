import React, { useEffect, useState } from 'react'
   import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../pages/CartContext'
import gsap from 'gsap'

const Cart = () => {
  const navigate = useNavigate();
  const { increamentCart,Co } = useCart();
  const [products, setproducts] = useState([]);
  // const [deletingId, setDeletingId] = useState(null);
   console.log(products);
   const fetchCartProducts = async () => {
    try {
      const response = await fetch('http://localhost/npm/cartDisplay.php', { credentials: 'include' });
      const data = await response.json();
      setproducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Cart page');
    }
  };
  useEffect(
    ()=>{
    fetchCartProducts();

    },[]
  )

  useEffect(() => {
const tl=gsap.timeline();
// const plays=gsap.utils.toArray('.cart-products');
tl.from(
  '.cart-products',{
    opacity:0,
    duration:1.4,
    x:-300,
    stagger:{
      amount:3,
      grid:'auto',
      axis:'x',
      from:'end'
    }
   }
  //  ,{
  //   opacity:1,
  //   x:0,
  // } 
)
  }, []);



  const deleteProduct = async (product) => {
    //  setDeletingId(product.products_id);
    const deletedQuantity = product.quantity - 1;
    const deleteData = {
      deleteId: product.products_id,
      deleteQuantity: deletedQuantity
    };

    try {
      const res = await axios.post('http://localhost/npm/update.php', deleteData, { withCredentials: true });

      if (res.data.status === "success") {
        increamentCart(-1);
        alert(res.data.message);
        // Refresh the cart after successful delete
        fetchCartProducts();
      } else {
        console.error('Error while updating the cart:', res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
     finally {
    setDeletingId(null);
  }
  };

  return (
    <div>
      {products && products.length > 0 ? (
        products.map((product, index) =>(
          <div key={index} className='cart-products'>
            <img src={product.image_url} className='cart-Image' />
            <p className='cart-weight'>{product.weight_ml}ml</p>
            <p className='cart-quantity'>{product.quantity}</p>
            <div className='cart-buttons'>
              <button onClick={() => { navigate(`/home/product/${product.products_id}`) }}>View</button>
              <button>Buy</button>
<button onClick={() => deleteProduct(product)} className='delete' >
  Delete
  {/* {deletingId === product.products_id ? 'Deleting...' : 'Delete'} */}
  {/* disabled={deletingId === product.products_id} */}
</button>
            </div>
          </div>
          
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}

export default Cart

