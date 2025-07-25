import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import { IoMdClose } from "react-icons/io";
const SearchBar = ({value,onChange,handleSearch, onClearSearch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-blue-900 rounded-md'>
        
        <input
        type='text'
        value ={value}
        placeholder="Search Notes"
        className = "w-full text-xs bg-transparent py-[11px] outline-none"
        onChange={onChange}
        />
        {value &&<IoMdClose onClick={onClearSearch} className="text-xl text-white cursor-pointer mr-2 hover:text-gray-400"/>}
        <FaMagnifyingGlass className="text-white cursor-pointer hover:text-gray-400" onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar