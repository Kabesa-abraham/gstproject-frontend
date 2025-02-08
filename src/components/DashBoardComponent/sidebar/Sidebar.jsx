import React, { useState } from 'react'
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

  const [activeOption,setActiveOption] = useState("tableau")
  const handleActive = (value) =>{
    setActiveOption(value)
  }

  return (
    <nav className={` sidebarContainer overflow-hidden min-h-screen bg-[#292828] text-white `} >
      <div className='flex flex-col gap-3' >
        <div className='flex items-center gap-2' >
          <FaBookOpen className='w-12 h-8 px-2 py-2 bg-blue-500 text-xl text-white' />
          <p className='text-2xl font-bold '>ORAGON</p>
        </div>
        <MdMenu className='text-2xl text-[#ffffffb6] ml-3' />
      </div>

      <div className='option_container' >
        <ul className='flex flex-col gap-1 mt-5' >

          <Link to={'/'} >
            <li className={`border-b border-b-zinc-500 mb-5 ${activeOption==="tableau"&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('tableau')} >
              <HiOutlineHome className=' text-3xl' /> <p>Tableau de Bord</p>
            </li>
          </Link>

          <Link to={'projet'} >
            <li className={`${activeOption==='projet'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('projet')}  > 
              <FaFolderOpen className=' text-yellow-500 optionIcon' /> <p>Mes Projets</p> </li>
          </Link>

          <Link to={"tache"} ><li className={`${activeOption==='Taches'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('Taches')}> 
            <FaCheckSquare className=' text-green-500 optionIcon' />  <p>Mes Tâches</p> 
          </li></Link>

          <Link to={'calendar'} ><li className={`${activeOption==='Calendrier'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('Calendrier')} > 
            <AiOutlineCalendar className=' text-purple-500 optionIcon'/> <p>Calendrier</p> 
          </li></Link>

          <Link to={'profile'} >
            <li className={`${activeOption==='Profil'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('Profil')}>
             <CgProfile className=' text-blue-500 optionIcon'/> <p>Mon Profil</p> 
          </li></Link>

          <Link to={'setting'} ><li className={`${activeOption==='setting'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('setting')}> 
            <MdSettings className=' text-gray-400 optionIcon' /> <p>Configuration</p> </li></Link>
        
          <li className={`${activeOption==='Equipe'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('Equipe')}> 
            <FaUsers className=' text-blue-500 optionIcon' /> <p>Equipe</p> </li>

          <li className={`${activeOption==='Chat'&&'bg-[#ffffff17]'}`} onClick={()=>handleActive('Chat')}> 
            <BiMessageDetail className=' text-gray-400 optionIcon' /> <p>Chat</p> </li>

          <li className='mt-10' > <RiLogoutBoxLine className='text-[#c46c24] optionIcon' />  <p>Déconnexion</p></li>

        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
