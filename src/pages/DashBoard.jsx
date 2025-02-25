import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/DashBoardComponent/sidebar/Sidebar'
import DashHeader from '../components/DashBoardComponent/dashHeader/DashHeader'

const DashBoard = () => {
  return (
    <div className='flex min-h-screen' >
      <Sidebar/>

      <div className='w-full bg-[#eeeeee] ' > {/* w-full*/}
        <DashHeader/>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashBoard
