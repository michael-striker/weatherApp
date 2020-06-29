import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

 export default function Load() {
    return(   
      <Loader
         type='ThreeDots'
         color='#00BFFF'
         height={80}
         width={80}
         timeout={60*1000} 
      />
    ) 
 }