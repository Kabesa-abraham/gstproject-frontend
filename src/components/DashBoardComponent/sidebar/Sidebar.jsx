import React, { createContext, useContext, useEffect, useState } from 'react'
import { TbLayoutDashboard } from 'react-icons/tb'
import './sidebar.css'
import { FaCheckSquare, FaFolderOpen } from 'react-icons/fa'
import { AiOutlineCalendar, } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { RiLogoutBoxLine } from 'react-icons/ri'
import {Link} from 'react-router-dom'
import { signOutSuccess } from '../../../Redux/user/userSlice.js'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {ChevronFirst, ChevronLast} from 'lucide-react'
import backendUrl from '../../../utils/backendUrl.js'

const SidebarContext = createContext() //pour le contexte du sidebar

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeOption,setActiveOption] = useState(localStorage.getItem('activeOption') || "dashboard") //pour l'option active
  const handleActive = (value) =>{
    localStorage.setItem('activeOption',value);
    setActiveOption(localStorage.getItem('activeOption'))
  }
 
  const handleSignOut = async() =>{ //pour se déconnecter
    try {
      await fetch(`${backendUrl}/auth/signout`,{method:'POST',credentials: 'include'});
      dispatch(signOutSuccess());
      navigate('/presentation');
    } catch (error) {console.log(error)}
  }


  const [expanded, setExpanded] = useState(true); //pour l'expansion du sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); //pour le responsive

  return (
    <aside className='min-h-screen hidden md:block ' >
      <nav className='h-full flex flex-col bg-[#222224] border-r shadow-sm ' >
        <div className='p-4 pb-2 flex justify-between items-center mb-6' >
          <div className={` overflow-hidden transition-all ${expanded? "flex items-center gap-1 ":'hidden'} `} >
            <img src="/logo.png" alt="enterprise logo" className="w-12" />
            <h3 className='text-2xl text-white' >Oragon</h3>
          </div>
          <button onClick={() => setExpanded(!expanded)} className='hidden lg:inline-block p-1.5 rounded-lg text-zinc-50' >
            {expanded ?<ChevronFirst size={20} /> : <ChevronLast size={20} /> }
          </button>
        </div>

        <SidebarContext.Provider value={{expanded}} >
          <ul className='flex-1 flex flex-col gap-2 px-3' >
            <SidebarItem icon={<TbLayoutDashboard className='text-3xl '/>} 
                         text={"Tableau de Bord"} lien={"/"} active={activeOption==="dashboard"} setActive={()=>handleActive("dashboard")}
                         alert />

            <SidebarItem icon={<FaFolderOpen className='text-3xl text-yellow-500'/>}
                         text={"Mes Projets"} lien={"projet"} active={activeOption==="projet"} setActive={()=>handleActive("projet")} />

            <SidebarItem icon={<FaCheckSquare className='text-3xl text-green-500'/>}
                         text={"Mes Tâches"} lien={"tache"} active={activeOption==="tache"} setActive={()=>handleActive("tache")}  />

            <SidebarItem icon={<AiOutlineCalendar className='text-3xl text-purple-500'/>}
                         text={"Calendrier"} lien={"calendar"} active={activeOption==="calendar"} setActive={()=>handleActive("calendar")}  />

            <SidebarItem icon={<CgProfile className='text-3xl text-blue-500'/>}
                         text={"Profile"} lien={"profile"} active={activeOption==="profile"} setActive={()=>handleActive("profile")}  />

            <div onClick={() =>handleSignOut()}>
              <SidebarItem icon={<RiLogoutBoxLine className='text-3xl text-pink-700'/>} 
                           text={"Déconnexion"} Style={{marginTop:"4em"}}/>
            </div>
          </ul>
        </SidebarContext.Provider>

      </nav>
    </aside>
  ) 
}

export default Sidebar


export const SidebarItem = ({icon, text,alert,Style,lien,active,setActive}) => {
  const {expanded} = useContext(SidebarContext)
  return(
    <Link to={lien&&lien} ><li onClick={setActive} className={`relative flex items-center text-white py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
       ${active? "bg-gradient-to-tr from-[#ffffff17] to-[#ffffff17] text-indigo-800" : "hover:bg-[#ffffff17] text-gray-600"} `} 
       style={Style}
       >

      {icon}
      <span className= {`overflow-hidden transition-all ${expanded ? "inline w-44 ml-3" : "w-0 hidden"}`} >{text}</span>
      {alert&& <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "": "top-2"} `} ></div>}

      {!expanded &&(
         <p className={`z-50 w-32 absolute left-full rounded-md px-3 py-3 ml-7 bg-white text-indigo-800 text-sm
           invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`} 
         >{text}</p>
      )}
    </li> </Link>
  )
}