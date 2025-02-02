import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/DashBoardComponent/sidebar/Sidebar'
import DashHeader from '../components/DashBoardComponent/dashHeader/DashHeader'

const DashBoard = () => {
  return (
    <div className='flex min-h-screen' >
      <Sidebar/>

      <div className='flex-1 overscroll-y-auto bg-[#eeeeee] flex flex-col ' >
        <DashHeader/>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashBoard
