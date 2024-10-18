import React from "react";
import './homepage.css';
import './homepage.jpeg';
import { Navigate } from 'react-router-dom';
import Login from "../login/login";
import Auth from '../../../services/Auth';

function Homepage(){
  console.log("on home page");
  if(Auth.retriveToken() && Auth.retriveToken()!=='undefined'){
    return (<Navigate to='/home'/>);
  }
  else {
    return (
      <div>
          <div className="parallax">
            <Login />
          </div>
      </div>
    );
  }
}

export default Homepage;
