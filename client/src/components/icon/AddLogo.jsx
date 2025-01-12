
import React from 'react'
import { Link } from 'react-router-dom'
function AddLogo({ nameLogoAdd, to }) {
  return (
  <li>
    <Link to={to} className="block p-2 hover:text-pink-600 hover:bg-gray-300 flex items-center justify-between">
      {nameLogoAdd}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </Link>
  
  </li>
  )
}

export default AddLogo

