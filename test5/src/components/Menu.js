import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = (props) => {
  function logout(){
    localStorage.removeItem('token')
    props.history.push('/login')
  }

  return (
    <div>
      <h3>Menu</h3>
      <ul id='menu'>
        <li><Link to="/dashboard" replace={true}>Dashboard</Link></li>
        <li><Link to="/setting" replace={true}>Setting</Link></li>
        <li><button onClick={logout} data-test='logout__btn'>Logout</button></li>
      </ul>
    </div>
  )
}