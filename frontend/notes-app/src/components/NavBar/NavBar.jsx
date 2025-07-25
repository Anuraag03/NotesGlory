import React,{useState} from 'react'
import ProfileInfo from '../../components/Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const NavBar = ({
  searchInput,
  onInputChange,
  onClearSearch
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('name') || 'User';

  const onLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  return (
    <div className='bg-blue-800 text-white px-6 py-2 drop-shadow flex justify-between items-center'>
      <h2
        className='text-xl font-medium text-white py-2 cursor-pointer'
        onClick={() => navigate('/')}
      >
        NotesGlory
      </h2>
      {token && (
        <SearchBar
          value={searchInput}
          onChange={onInputChange}
          onClearSearch={onClearSearch}
        />
      )}
      {token && <ProfileInfo name={userName} onLogout={onLogOut}/>} 
    </div>
  )
}

export default NavBar