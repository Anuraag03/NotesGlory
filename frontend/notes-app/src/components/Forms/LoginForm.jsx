import React from 'react'
import PasswordInput from '../Input/PasswordInput'
import { useState } from 'react'
import { validateEmail } from '../../utils/helper'
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email');
        } else if (!password) {
            setError('Please enter password');
        } else {
            setError("");
            const { login } = await import('../../api');
            const result = await login(email, password);
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('name', result.name || 'User');
                window.location.href = '/dashboard';
            } else {
                setError(result.error || 'Login failed');
            }
        }
    }
  return (
    
    <div className='w-96 border border-blue-500 rounded  text-white px-3 py-7 flex flex-col justify-between items-center'>
        <form className="w-80" onSubmit={handleLogin}>
            <h4 className='text-2xl  mb-7 text-white'>Login</h4>
            
            <input value={email} onChange={(e)=>setEmail(e.target.value)}  type='email' placeholder='Email' className="input-box w-full" required />
            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='btn-primary cursor-pointer'>Login</button>
            <p className='text-sm text-center mt-4'>Don't have an account? <a href='/signup' className='text-blue-500 font-medium underline text-primary'>Sign Up</a></p>
            
        </form>
    </div>
  )
}

export default LoginForm