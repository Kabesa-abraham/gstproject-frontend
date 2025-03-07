import React from 'react'
import aboutImg from '../../Assets/img5.jpg'
import {motion} from 'framer-motion';

function About() {
  return (
    <section className='w-full min-h-screen flex items-center py-5 overflow-hidden' id='apropo' >
      <div className='max-w-7xl mx-auto px-3 md:px-10 flex flex-col md:flex-row gap-10 overflow-hidden' >
        
          <motion.img 
            src={aboutImg} alt="" 
            className='w-[35em] md:w-[28em] h-[18em] lg:w-[35em] lg:h-[25em] object-cover' 
            initial={{opacity:0, x:-100} }
            whileInView={{opacity:1, x:0} }
            viewport={{amount:0.5} }
            transition={{duration:.2,delay:.1}}
          />
      

        <motion.div
          className='flex flex-col gap-5 text-sm sm:text-lg lg:text-xl'
          initial={{opacity:0, x:100} }
          whileInView={{opacity:1, x:0} }
          viewport={{amount:0.5} }
          transition={{duration:.2,delay:.3}}
         >
          <h3 className='font-bold' >
            <span className='text-2xl md:text-3xl' >Oragon - </span> La solution intelligente pour gérer vos projets efficacement
          </h3>
          <p>
            Oragon est une application de gestion Projet conçue pour les équipes et les indépendants. Avec une interface intuitive et des fonctionnalités puissantes,
            elle vous aide à organiser vos tâches, collaborer en temps réel et suivre vos progrès en toute simplicité.
          </p>
          <button 
            className='bg-[#4473ca] py-2 rounded-full text-white hover:ring-4 ring-blue-100 duration-200 text-sm md:text-lg font-semibold ' >
           Voir Plus
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default About