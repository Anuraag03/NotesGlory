import React from 'react'
import SignUpForm from '../../components/Forms/SignUpForm'
import NavBar from '../../components/NavBar/NavBar'

const SignUp = () => {
  return (
    <div>
      <NavBar/>
      <div className='flex items-center justify-center mt-28'>
        <SignUpForm/>
      </div>
      
    </div>
  )
}

export default SignUp