import React from 'react'
import { getInitials } from '../../utils/helper'
const ProfileInfo = ({ name, onLogout }) => {
  return (
    <div className='flex items-center gap-3'>
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-white bg-blue-600 ">{getInitials(name)}</div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <button className="text-sm text-white underline cursor-pointer" onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default ProfileInfo