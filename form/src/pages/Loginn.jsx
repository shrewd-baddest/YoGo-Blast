import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';


 const Loginn = () => {
const [Emaili,setEmaili]=useState('');
const [Code,setCode]=useState('');
const [deta,setdeta]=useState('');
const buton='LOGIN';
const url='http://localhost/npm/Login.php';


  const navigate=useNavigate();

  const butt=useRef(null);
  const hoover=(event)=>{
    event.target.style.cursor='pointer';
  
  }

  
  useEffect(
    ()=>{
      butt.current.addEventListener('mouseover',hoover);

      // return ()=>{butt.current.rremoveEventListener('mouseover',hoover)};
    }
    ,[]
  )

const Login= (e)=>{
e.preventDefault();
const ddata={
Emaili:Emaili,  
Code:Code
}
// alert(ddata.Emaili ,ddata.Code);
axios.post(url,ddata)
.then(Response =>{
 
  if(Response.data.status =='success'){
 navigate('/home');
  }
  else{
alert('record does not exist');
  }
// alert('hey');
} )
  .catch(error => alert(error));


// useEffect( ()=>{
// fetch('http://localhost/npm/Login.php')
// .then(response=>response.json())
// .then((ret)=>setdeta(ret))
// .catch( error=>console.error('error fetching data'))
//  },
// []
// )
//  console.log(deta['ID']);
}


  return (
    <div>
    <div className="form">

      <form onSubmit={Login}>
  <label htmlFor="">Email:</label>
  <input type="text" onChange={(e)=>{setEmaili(e.target.value)}} /> <br />
  <label htmlFor="">PASSWORD:</label> <input type='password' onChange={(e)=>setCode(e.target.value)}/><br />
  <input type="submit" value={buton} /><br />
</form>
  <button onClick={()=>navigate('/signup')} ref={butt} className='acct'>CREATE ACCOUNT</button>
    </div>
 
    </div>
  )
}

export default Loginn




 