import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Acct = () => {
  const navigate = useNavigate();
  const [details,setdetails] = useState(null);
  console.log(details);

  useEffect(() => {
    const dater = async () => {
      const response = await fetch('http://localhost/npm/Acct.php', { credentials: 'include' });
      const data = await response.json();
      setdetails(data);
    }
    dater();
  }, [])

  const logOut = async () => {
    try {
      const response = await axios.post('http://localhost/npm/Acct.php', { msg: 'logOut' }, { withCredentials: true });
      if (response.data.status === 'success') {
        alert('user successfully logged Out');
        navigate('/home');
      } else {
        alert(response.data.message || JSON.stringify(response.data));
      }
    } catch (error) {
      alert(error);
    }
  }

  return ( 
    <.
    <div className='Account' style={{ paddingLeft: '8%', paddingRight: '8%' } >
      <h3>My Orders</h3>
      <div className='orders'>
        <p>Unpaid</p>
        <p>To be shipped</p>
        <p>Shipped</p>
        <p>Reviews</p>
      </div>

      <h3>My Services</h3>
      <div className='services'>
        <p>FAQ</p>
        <p>Customer Service</p>
        <p>Settings</p>
      </div>
      <h3>Your Details</h3>
      {details && (
        <div className="customer_info">
          <span>
            <h3>identity:</h3>
            <h4>{details.ID}</h4>
          </span>
          <span>
            <h3>FullName:</h3>
            <h4>{details.firstName} {details.secondName}</h4>
          </span>
          <span>
            <h3>email:</h3>
            <h4>{details.email}</h4>
          </span>
        </div>
      )}
      <button onClick={logOut}>Log Out</button>
    </div>
  )
}

export default Acct
