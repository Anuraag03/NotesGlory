import React from 'react'

const NavBar = () => {
  return (
    <div className='bg-blue-800 text-white px-6 py-2 drop-shadow flex justify-between items-center'>
      <h2 className='text-xl font-medium text-white py-2'>NotesGlory</h2>
      <ProfileInfo/>
    </div>
  )
}

export default NavBar