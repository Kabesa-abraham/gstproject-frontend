import React from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { useDispatch,useSelector } from 'react-redux';
import './dashHeader.css'
import { Link,useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../../../Redux/user/userSlice.js';
import { TbLayoutDashboard } from 'react-icons/tb';
import { FaCheckSquare, FaFolderOpen } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import backendUrl from '../../../utils/backendUrl.js';

const DashHeader = () => {

    const {currentUser} = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignout = async() =>{ //pour se déconnecter
        try {
           await fetch(`${backendUrl}/auth/signout`,{method:'POST',credentials: 'include'});
           dispatch(signOutSuccess());
           navigate('/presentation');
        } catch (error) {console.log(error)}
    }

  return (
    <div className="navbar bg-base-100">
        <div className="navbar-start flex items-center gap-5 ">
            <div className="dropdown block md:hidden">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" 
                            />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-64 p-2 shadow flex flex-col gap-3">
                    <SidebarItemHeader icon={<TbLayoutDashboard className='text-2xl '/>} text={"Tableau de Bord"} lien={"/"} /> {/* alert aussi est important */}
                    <SidebarItemHeader icon={<FaFolderOpen className='text-2xl text-yellow-500'/>} text={"Mes Projets"} lien={"projet"} />
                    <SidebarItemHeader icon={<FaCheckSquare className='text-2xl text-green-500'/>} text={"Mes Tâches"} lien={"tache"}  />
                    <SidebarItemHeader icon={<AiOutlineCalendar className='text-2xl text-purple-500'/>} text={"Calendrier"} lien={"calendar"}  />
                    <SidebarItemHeader icon={<CgProfile className='text-2xl text-blue-500'/>} text={"Profile"} lien={"profile"}  />
                    <div onClick={handleSignout} ><SidebarItemHeader icon={<RiLogoutBoxLine className='text-2xl text-pink-700'/>} text={"Déconnexion"} Style={{marginTop:".5em"}}  /></div>
                </ul>
            </div>

            <div className='block md:hidden' >
                <img src="/logo.png" alt="" className='inline-block md:hidden w-10 h-10' />
            </div>

            <div className='hidden md:flex flex-col text-[16px]' >
                <p className='font-bold' >Administrateur</p>
                <h5 className='text-zinc-500 relative -top-0 ' >
                    {currentUser.name? currentUser.name : "Utilisateur"} 
                    <span className='text-sm' >@ {currentUser.email&& currentUser.email}</span>
                </h5>
            </div>
        </div>
       
        <div className="navbar-end flex items-center gap-5 relative navbarcontainImg">
            <Link to={'profile'} ><div>
                <img src={currentUser.image || '/avatar.png'} alt="" className='w-10 h-10 md:w-12 md:h-12 bg-zinc-200 object-cover rounded-full border-2 border-zinc-400' />
            </div></Link>
            <RiLogoutBoxLine className='text-2xl md:text-3xl text-zinc-400 hover:text-zinc-600 duration-150 rotate-180 cursor-pointer' onClick={handleSignout} />
        </div>
    </div>
  )
}

export const SidebarItemHeader = ({icon,text,Style,lien}) => {
  return(
    <Link to={lien} >
        <li className={`w-full flex items-center gap-3 text-black py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors `} 
            style={Style}>
            {icon}
            <span className= {`text-black`} >{text}</span>
        </li> 
    </Link>
  )
}

export default DashHeader