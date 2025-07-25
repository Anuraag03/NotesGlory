import React,{useState} from 'react'
import {FaRegEye,FaRegEyeSlash} from 'react-icons/fa'
const PasswordInput = ({value,onChange,placeholder}) => {
  const [showPassword,setShowPassword] = useState(false);
  const toggleShowPassword = () =>{
    setShowPassword(!showPassword);
  }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 py-1 rounded mb-3 outline-none'>
      <input value={value} onChange={onChange} type={showPassword ? "text" : "password"} placeholder={placeholder || "Password"} className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'/>
      <button type="button" tabIndex={0} className="bg-transparent border-none p-0 m-0" onClick={toggleShowPassword} aria-label={showPassword ? "Hide password" : "Show password"}>
        {showPassword ? <FaRegEye size={22} className="text-blue-500 cursor-pointer" /> : <FaRegEyeSlash size={22} className="text-blue-500 cursor-pointer" />}
      </button>
    </div>
  )
}

export default PasswordInput