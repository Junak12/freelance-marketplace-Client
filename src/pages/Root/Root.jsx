import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from "react-router";
import Footer from '../../components/Footer/Footer';


const Root = () => {
  return (
    <div className="py-2 px-2 md:py-3 md:px-3  lg:py-4">
      <div className="fixed top-0 left-0 w-full z-50 lg:py-3">
        <Navbar />
      </div>
      <div className='mt-19'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root
