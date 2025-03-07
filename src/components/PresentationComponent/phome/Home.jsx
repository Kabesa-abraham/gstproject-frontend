import React, { useEffect, useState } from 'react'
import img1 from '../../Assets/img1.png';
import img2 from '../../Assets/img2.png';
import img3 from '../../Assets/img3.png';
import img4 from '../../Assets/img4.png';
import './home.css'
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';

const allImages = [img1,img2,img3,img4]

const Home = () => {
    const [currentIndex,setCurrentIndex] = useState(0);
    useEffect(() =>{
     const interval = setInterval(() => {
         setCurrentIndex(prev => (prev + 1) % allImages.length )
     },7000);
     return () => 
         clearInterval(interval)
    },[])

  return (
    <div className='w-full min-h-screen bg-black' id='#' >
        <div className='w-full min-h-screen homeContainer' >
            <div className='max-w-7xl min-h-screen px-3 md:px-10 mx-auto flex justify-between items-center md:gap-10 ' >
                <div className='text-xl text-white flex flex-col gap-6' >
                    <motion.h3 className='relative text-3xl md:text-5xl font-bold text-zinc-100'
                                initial={{opacity:0,left:-80}}
                                whileInView={{opacity:1,left:0}}
                                viewport={{amount:0.5}}
                                transition={{duration:.4,delay:.1}}>
                        Simplifiez la gestion de vos projets, booster votre productivité avec <span className='text-blue-300 font-extrabold'>Oragon.</span>
                    </motion.h3>
                    
                    <motion.p className='text-lg md:text-xl relative'
                         initial={{opacity:0,left:-80}}
                         whileInView={{opacity:1,left:0}}
                         viewport={{amount:0.5}}
                         transition={{duration:.4,delay:.4}}
                    >
                        Une platforme intuitive pour organiser vos tâches, collaborer avec votre équipe et suivre l'avancement de vos projets en toute simplicité.
                    </motion.p>

                    <div className='flex flex-col sm:flex-row items-center gap-8'>
                        <Link to={'/signUp'} ><motion.button className='bg-[#4473ca] px-7 py-4  hover:ring-4 ring-[#4473ca6c] duration-150' 
                                        initial={{opacity:0}}
                                        whileInView={{opacity:1}}
                                        viewport={{amount:0.5}}
                                        transition={{duration:.6,delay:.6}}
                        >
                        Commencer maintenant
                        </motion.button></Link>

                        <Link to={'/signIn'} ><motion.button className=' border border-blue-500 px-7 py-4 hover:bg-[#4473ca] duration-150' 
                                    initial={{opacity:0}}
                                    whileInView={{opacity:1}}
                                    viewport={{amount:0.5}}
                                    transition={{duration:.6,delay:.9}}
                        >
                            Connection
                        </motion.button></Link>
                    </div>
                </div>
                <div>
                    <motion.img 
                        key={currentIndex}
                        src={allImages[currentIndex]} alt="" 
                        className='w-[100em] hidden md:block'
                        initial={{scale:.8,opacity:.5}} 
                        animate={{scale:1.02,opacity:1}}  
                        transition={{duration:5}}
                    />
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Home
