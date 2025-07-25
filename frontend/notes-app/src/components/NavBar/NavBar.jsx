import React,{useState} from 'react'
import ProfileInfo from '../../components/Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {

  const [searchQuery,setSearchQuery] = useState("");


  const navigate = useNavigate();
  const onLogOut= ()=>{
    navigate('/login') // Assuming you want to navigate to the login page on logout
  }

  const handleSearch =()=>{

  };

  const onClearSearch = ()=>{
    setSearchQuery("");
  };
  return (
    <div className='bg-blue-800 text-white px-6 py-2 drop-shadow flex justify-between items-center'>
      <h2 className='text-xl font-medium text-white py-2'>NotesGlory</h2>
      <SearchBar
        value={searchQuery}
        onChange={({target})=>{
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo onLogOut={onLogOut}/>
    </div>
  )
}

export default NavBar