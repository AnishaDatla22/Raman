import React, { Component } from 'react';
import {handleResponse} from './../helpers/handle-response';



export const ApiGateWay = {
  
  Post,
  Get,
  PostFile,
  
};

const endip='http://127.0.0.1:8000'
 function  Post (url,payload){

    const requestOptions = {
      method: 'POST',
      crossDomain:true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
  };
    
     
      return fetch(endip+url, requestOptions)
      
  
      
        
  
  
  };

  function  PostFile (url,payload){

    const requestOptions = {
      method: 'POST',
      body: payload
      
  };
    
     
      return fetch(endip+url, requestOptions)
      
  
      
        
  
  
  };


 function  Get (url){

  const requestOptions = {
    crossDomain:true,
    method: 'GET'
  
  };
  
     
      return fetch(endip+url, requestOptions)
     
  
      
        
  
  
  };
  




