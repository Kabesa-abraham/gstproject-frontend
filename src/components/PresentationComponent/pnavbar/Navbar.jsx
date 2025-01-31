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

  return (
    <div className=' fixed z-50 w-full py-3 bg-white border-b border-b-zinc-200' >
      <div className='max-w-7xl px-3 md:px-10 flex justify-between items-center mx-auto' >
        <div className='flex items-center gap-1' >
          <img src={logoSite} className='w-10 h-10' />
          <h1 className='text-xl font-bold ' >Oragon</h1>
        </div>

        <div className={`${!closeMenu&&'activer'} navbarResponsive flex md:flex-row items-center gap-10 md:gap-5 `}  >
          <ul className='flex flex-col md:flex-row items-center gap-5 font-semibold relative' >
            <li onClick={handleClose}><a href="#">Accueil</a></li>
            <li onClick={handleClose}><a href="#apropo">A propos</a></li>
            <li onClick={handleClose}><a href="#fonctionnalite">Fonctionnalités</a></li>
            <li onClick={handleClose}><a href="#tarification">Tarif</a></li>
            <li onClick={handleClose}><a href="#">Blog</a></li>
            <li onClick={handleClose}><a href="#contact">Nous Contactez</a></li>
          </ul>

          <Link to={'/signIn'} ><button className='border py-2 px-4 font-bold border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white duration-150 cursor-pointer
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
