import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../Utilities/Util'
import Logo from "../../Assets/LandingPage/logo_white.png";
import { Image } from "react-bootstrap";
import Loader from "../../Assets/Loader.svg";
import "./style.scss"

const StoreLoader
 = () => {
   useEffect(() => {     
   }, [])
    
   
  return (
          <div className="store-loader text-center d-flex flex-column">
          <Image src={Loader} alt="" className="mb-3 update__spinner loader" />
          <img
            src={
              localStorage.getItem("storeLoader")
                ? localStorage.getItem("storeLoader")
                : Logo
            }
            alt=""
          />
        </div>
        
  );
}

export default StoreLoader
