import React from 'react'
import { footer } from './footerData.js';
import logo from "../../Assets/logo1.png"
import { FaPhone,FaAddressCard, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <>
     <div className="w-full flex flex-col mt-8" >
        <footer className='w-full bg-[#132844]' >
            <div className='max-w-7xl w-full mx-auto px-3 md:px-10 py-10 flex flex-col lg:flex-row justify-between gap-8 text-white'>
              <div className='w-full'>
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-2 items-center'>
                    <img src={logo} alt="logo de l'entreprise" className='w-12 h-12' />
                    <h2 className='font-bold text-xl text-blue-400' >Oragon</h2>
                  </div>

                  <div className='flex flex-col gap-6' >
                    <h3 className='font-bold' >Vous voulez nous contactez?</h3>
                    <div className='flex flex-col gap-2' >
                        <span className='flex items-center gap-2' >
                            <MdEmail className='text-xl' />
                            <p>Email:</p>
                            <a href='#' className='text-blue-500' >support@Oragon.com</a>
                        </span>
                        <span className='flex items-center gap-2'>
                            <FaAddressCard className='text-xl' />
                            <p> Adresse:</p>
                            <a href='#' >Gombé, Rue du petit coin, Kinshasa</a>
                        </span>
                        <span className='flex items-center gap-2'>
                            <FaPhone/>
                            <p>Téléphone:</p>
                            <a href='#' >+243 804 543 004</a>
                        </span>
                        <span className='flex items-center gap-6 text-3xl'>
                            <a href='#' ><FaFacebook/></a>
                            <a href='#' ><FaTwitter/></a>
                            <a href='#' ><FaLinkedin/></a>
                        </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-wrap justify-between gap-10 " >
                {footer.map((val,i) => (
                  <div className='flex flex-col gap-6' key={i} >
                    <h3 className="text-lg font-semibold" >{val.title}</h3>
                    
                    <div className='flex flex-col gap-4' >
                        {
                            val.text.map((suVal,i) =>(
                                <p key={i} className='text-[#ffffff50]' >{suVal.list}</p>
                            ))
                        }
                    </div>
                  </div>
                ))}
              </div>

            </div>
            <div className=' text-xs lg:text-sm text-center text-gray-400 my-3'>
              <span>© 2024 Oragon. Conçue Par KabesaYebula.</span>
            </div>
          </footer>
          
      </div>
    </>
  )
}

export default Footer
