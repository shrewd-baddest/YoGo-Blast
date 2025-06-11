import React,{useEffect,useState} from 'react'

const Acct = () => {
const [details,setdetails]=useState(null);
useEffect(
  ()=>{
 const dater=async ()=>{
    const response=await fetch('http://localhost/npm/cartDisplay.php',{ withCredentials: true });
      const data = await response.json();
    setdetails(data);
  }
    dater();
  },[]
)

  return (
    <div>

      <h3>My Orders</h3>
      <div className='orders'>
      <p>Unpaid</p>
      <p>To be shipped</p>
      <p>Shipped</p>
      <p>Reviews</p>
      </div>

<h3>My Services</h3>
<div className='services'>
<P>FAQ</P>
<P>Customer Service</P>
<P>Settings</P>
</div>
<h3>Your Details</h3>
<div className="customer_inf0">
<span><h4>identity:</h4>
      h5

</span>
<span><h4>FullName:</h4></span>
<span><h4>email:</h4>
</span>
</div>
<button>Log Out</button>
    </div>
  )
}

export default Acct
