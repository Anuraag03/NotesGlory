import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../Input/PasswordInput';
import { validateEmail } from '../../utils/helper';

const SignUpForm = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");  
    const [error,setError] = useState(null);
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name) {
            setError("Please enter your name");
        } else if (!validateEmail(email)) {
            setError("Please enter a valid email address");
        } else if (!password) {
            setError("Please enter a password");
        } else {
            setError("");
            // Handle sign up logic here
        }
    };
  return (
    <div className='w-96 border border-blue-500 rounded  text-white px-3 py-7 flex flex-col justify-between items-center'>
        <form className="w-80" onSubmit={handleSignUp}>
            <h4 className='text-2xl  mb-7 text-white'>Sign Up</h4>
            <input   type='text' placeholder='Name' className="input-box w-full" required value={name} onChange={(e)=>setName(e.target.value)}/>
            <input   type='email' placeholder='Email' className="input-box w-full" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='btn-primary cursor-pointer'>Sign Up</button>
            <p className='text-sm text-center mt-4'>Already have an account? <a href='/login' className='text-blue-500 font-medium underline text-primary'>Login</a></p>


            
            
        </form>
    </div>
  )
}

export default SignUpForm