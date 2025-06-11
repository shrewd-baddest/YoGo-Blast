import React, { useEffect, useRef, useState } from 'react'
   import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../pages/CartContext'
import gsap from 'gsap'

const Cart = () => {
  const navigate = useNavigate();
  const { increamentCart,count } = useCart();
  const [products, setproducts] = useState([]);
  const [number, setNumber] = useState(0);
  const [price,setPrice]=useState(0);
  const [id,setId]
  const pay=useRef();
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

    },[count]
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

  const Buy=(product)=>{
 setPrice(product.price)

  }

  const payment=async(product)=>{
   
  const paymentData = {
    productId: product.products_id,
    quantity: product.quantity,
    phoneNumber: number
  };
  try {
    const response = await axios.post('http://localhost/npm/payment.php', paymentData, { withCredentials: true });
    if (response.data.status === 'success') {
      alert(response.data.message);
      navigate('/home');
    } else {
      alert(response.data.message || JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('Error during payment:', error);
    alert('An error occurred while processing the payment. Please try again.');}

  finally {
    setNumber(''); // Clear the phone number input after payment
      }
  }


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
              <button onClick={()=>{pay(product.price)}}>Buy</button>
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
       <div className="pay_form" ref={pay}>
                    <div>
        <p>we guarantee a secure money transaction and 100% refund</p>
              <p className='cart-price'>Ksh: {price.toFixed(2)}</p>
                    </div>
                  <form>          
       <label>Phone Number:</label> <input type="text"  onChange={(e)=>{setNumber(e.target.value)}} />
              <button className='pay' onClick={() => payment(product)}>Pay</button>
                    
                      
      </form>
            </div>
    </div>
  )
}

export default Cart

