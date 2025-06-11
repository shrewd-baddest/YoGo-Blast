import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const Loginn = () => {
  const [Emaili, setEmaili] = useState('');
  const [Code, setCode] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const buton = 'LOGIN';
  const url = 'http://localhost/npm/Login.php';

  const navigate = useNavigate();

  const butt = useRef(null);
  const hoover = (event) => {
    event.target.style.cursor = 'pointer';
  }
  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const userRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const emails = userRes.data.email;
        if (!emails) {
          alert('Google login failed: No email found');
          return;
        }
        // Only send email to backend for Google login
        axios.post(url, { Emaili: emails })
          .then(response => {
            if (response.data.status === 'success') {
              navigate('/home');
            } else {
              alert('Record does not exist');
            }
          })
          .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed');
          });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  });

  useEffect(
    () => {
      butt.current.addEventListener('mouseover', hoover);

      butt.current.addEventListener('mouseout', hoover);
    }
    , []
  )

  const Login = (e) => {
    e.preventDefault();
    const ddata = {
      Emaili: Emaili,
      Code: Code
    }

    axios.post(url, ddata)
      .then(Response => {

        if (Response.data.status == 'success') {
          navigate('/home');
        }
        else {
          alert('');
        }
        // alert('hey');
      })
      .catch(error => alert(error));
  }


  return (
    <div>
      <div className="form">

        <form onSubmit={Login}>
          <label htmlFor="">Email:</label>
          <input type="email" onChange={(e) => { setEmaili(e.target.value) }} /> <br />
          <label htmlFor="">PASSWORD:</label> <input type='password' onChange={(e) => setCode(e.target.value)} /><br />
          <input type="submit" value={buton} /><br />
        </form>
        <button onClick={login} className='google'>
          sign in with google
        </button>

        <button onClick={() => navigate('signup')} ref={butt} className='acct'>CREATE ACCOUNT</button>
      </div>

    </div>
  )
}

export default Loginn




