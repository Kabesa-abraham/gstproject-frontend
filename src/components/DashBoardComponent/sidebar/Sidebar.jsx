import React from 'react'
import { MdMenu, MdSettings } from 'react-icons/md'
import { HiOutlineHome } from 'react-icons/hi'
import './sidebar.css'
import { FaBookOpen, FaCheckSquare, FaFolderOpen, FaUsers } from 'react-icons/fa'
import { AiOutlineCalendar } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { BiMessageDetail } from 'react-icons/bi'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className='sidebarContainer min-h-screen bg-[#292828] text-white ' >
      <div className='flex flex-col gap-3 border-b border-zinc-400  ' >
        <div className='flex items-center gap-2' >
          <FaBookOpen className='w-12 h-8 px-2 py-2 bg-blue-500 text-xl text-white' />
          <p className='text-2xl font-bold '>ORAGON</p>
        </div>

        <div className='flex flex-col gap-4 mb-3' >
          <MdMenu className='text-2xl text-[#ffffffb6] ml-3' />
          <Link to={'/'} ><button className='flex gap-3 items-center text-[#ffffffb6] border-l-4 border-l-blue-500 rounded-sm px-3 ' >
            <HiOutlineHome className='text-3xl  '/> <p>Tableau de Bord</p>
          </button></Link>
        </div>
      </div>

      <div className='option_container' >
        <ul className='flex flex-col gap-7 mt-5' >
          <Link to={'projet'} ><li> <FaFolderOpen className=' text-yellow-500 optionIcon' /> <p>Mes Projets</p> </li></Link>
          <li> <FaCheckSquare className=' text-green-500 optionIcon' /> <p>Mes Taches</p> </li>
          <li> <AiOutlineCalendar className=' text-purple-500 optionIcon'/> <p>Calendrier</p> </li>

          <li> <CgProfile className=' text-blue-500 optionIcon'/> <p>Mon Profil</p> </li>
          <Link to={'setting'} ><li> <MdSettings className=' text-gray-400 optionIcon' /> <p>Parametres</p> </li></Link>
          
          <li> <FaUsers className=' text-blue-500 optionIcon' /> <p>Equipe</p> </li>
          <li> <BiMessageDetail className=' text-gray-400 optionIcon' /> <p>Chat</p> </li>

          <li className='mt-10' > <RiLogoutBoxLine className='text-[#c46c24] optionIcon' /> <p>Déconnexion</p> </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
