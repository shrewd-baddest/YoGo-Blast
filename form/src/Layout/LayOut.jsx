import React from 'react'
import Nav from '../Navigation/Nav'
import { Outlet } from 'react-router-dom'
import '../styling/pages.css'
import Footer from '../Navigation/Footer'
const LayOut = () => {
  return (
    <div style={{'margin':'0px'}} >
      <Nav />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default LayOut
