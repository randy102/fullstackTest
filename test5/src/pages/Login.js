import React from 'react'
import { Redirect } from 'react-router-dom'

const Login = (props) => {
  function login(e){
    e.preventDefault()

    const passwordInp = document.querySelector('[data-test="login__pwd"]')

    if(passwordInp.value === "123"){
      localStorage.setItem("token","authenticated")
      props.history.push('/dashboard')
    }
    else{
      e.target.reset()
    }
  }

  const token = localStorage.getItem("token")

  if(token) return <Redirect to="/dashboard"/>

  return (
   
      <form onSubmit={login}>
        <input data-test='login__pwd' type='password' />
        <button data-test='login__submit' type='submit'>login</button>
      </form>
   
  )
}

export default Login