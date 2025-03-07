import React, { useState } from 'react'
import logoSite from '../../Assets/logo1.png'
import "./navbar.css"
import {MdClose, MdMenu} from 'react-icons/md'
import {Link} from 'react-router-dom'

const Navbar = () => {

  const [closeMenu, setCloseMenu] = useState(false);
  const handleClose = () =>{
    setCloseMenu(prev => prev===true ? false : true)
  }

  const [theActiver,setTheActiver] = useState("accueil")
  const handleActive = (value) =>{ //pour l'option active
    setTheActiver(value)
  }

  return (
    <div className=' fixed z-50 w-full py-3 bg-white border-b border-b-zinc-200' >
      <div className='max-w-7xl px-3 md:px-10 flex justify-between items-center mx-auto' >
        <a href='#' ><div className='flex items-center gap-1' >
          <img src={logoSite} className='w-10 h-10' />
          <h1 className='text-xl font-bold ' >Oragon</h1>
        </div></a>

        <div className={`${!closeMenu&&'activer'} navbarResponsive flex md:flex-row items-center gap-10 md:gap-5 `}  >
          <ul className='flex flex-col md:flex-row items-center gap-5 font-semibold relative optionContainer' >
            <a href="#"><li onClick={()=>{handleActive("accueil"); handleClose()} } className={`${theActiver==="accueil"&&"theActive"}`} >Accueil</li></a>
            <a href="#apropo">  <li onClick={()=>{handleActive("about"); handleClose()} } className={`${theActiver==="about"&&"theActive"}`} >A propos</li></a>
            <a href="#fonctionnalite"><li onClick={()=>{handleActive("fonctionnalite"); handleClose()} } className={`${theActiver==="fonctionnalite"&&"theActive"}`} >Fonctionnalités</li></a>
            <a href="#tarification"><li onClick={()=>{handleActive("tarif"); handleClose()} } className={`${theActiver==="tarif"&&"theActive"}`} >Tarif</li></a>
            <a href="#contact"><li onClick={()=>{handleActive("contact"); handleClose()} } className={`${theActiver==="contact"&&"theActive"}`} >Contacte</li></a>
          </ul>

          <Link to={'/signIn'} ><button className='border rounded-sm py-2 px-4 font-bold border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-150 cursor-pointer
                            md:hidden lg:inline-block' >
            Se connecter
          </button></Link>
        </div>

        {
          closeMenu===false? <MdMenu className='text-3xl md:hidden ' onClick={handleClose} /> :
          <MdClose className='text-3xl md:hidden' onClick={handleClose} />
        }
      </div>
    </div>
  )
}

export default Navbar
