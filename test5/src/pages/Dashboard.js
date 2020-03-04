import React from 'react'
import {Menu} from '../components/Menu'
const Dashboard = (props) => {
  return (
    <div>
    <Menu {...props}/>
      <p data-test='db__welcome'>
        Welcome to dashboard page
      </p>
    </div>
  )
}

export default Dashboard