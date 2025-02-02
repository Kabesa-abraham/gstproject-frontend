import React from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import userIcon from '../../Assets/img13.png';
import { useSelector } from 'react-redux';
import './dashHeader.css'

const DashHeader = () => {

    const {currentUser} = useSelector(state=> state.user);

  return (
    <nav className='w-full flex items-center py-3 px-8 bg-white justify-between gap-10 shadow-sm navbarContainer' >
        <div className='flex flex-col text-[16px] ' >
            <p className='font-bold' >Administrateur</p>
            <h5 className='text-zinc-500 relative -top-0 ' >
                {currentUser.name? currentUser.name : "Utilisateur"} 
                <span className='text-sm' >@ {currentUser.email&& currentUser.email}</span>
            </h5>
        </div>

        <div className='flex items-center gap-5 relative navbarcontainImg' >
            <div>
                <img src={currentUser.image} alt="" className='w-12 h-12 bg-zinc-200 object-cover rounded-full border-2 border-zinc-400' />
            </div>
            <RiLogoutBoxLine className='text-3xl text-zinc-400 hover:text-zinc-600 duration-150 rotate-180 cursor-pointer' />
        </div>
    </nav>
  )
}

export default DashHeader
