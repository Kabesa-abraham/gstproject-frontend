import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/DashBoardComponent/sidebar/Sidebar'

const DashBoard = () => {
  return (
    <div className='flex min-h-screen' >
      <Sidebar/>

      <div className='flex-1 overscroll-y-auto' >
        <Outlet/>
      </div>
    </div>
  )
}

export default DashBoard
