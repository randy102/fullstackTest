import React from "react";
import { Redirect } from "react-router-dom";

export default function ProtectedRoute({ comp: Component, ...rest }) {
  rest = rest[0]

  function isAuthenticated() {
    const token = localStorage.getItem('token')
    if(token && token === "authenticated")
      return true
    return false
  }

  return (
   <div>
     {isAuthenticated() ? <Component {...rest}/> : <Redirect to="/login" />}
   </div>
    
  )
}
