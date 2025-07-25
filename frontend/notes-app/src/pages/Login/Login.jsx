import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import LoginForm from '../../components/Forms/LoginForm'
const Login = () => {
  

  return (
    <div>
      <NavBar/>
      <div className='flex items-center justify-center mt-28'>
        <LoginForm/>
      </div>
      
    </div>
  )
}

export default Login