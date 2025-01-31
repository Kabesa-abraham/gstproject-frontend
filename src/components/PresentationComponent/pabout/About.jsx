import React from 'react'
import aboutImg from '../../Assets/img5.jpg'

function About() {
  return (
    <section className='w-full min-h-screen flex items-center py-5 ' id='apropo' >
      <div className='max-w-7xl mx-auto px-3 md:px-10 flex flex-col md:flex-row justify-between gap-10 ' >
        <img src={aboutImg} alt="" className='w-[35em] md:w-[28em] h-[18em] lg:w-[35em] lg:h-[25em] object-cover' />

        <div className='flex flex-col gap-5 text-lg lg:text-xl' >
          <h3 className='font-bold' >
            <span className='text-3xl' >Oragon - </span> La solution intelligente pour gérer vos projets efficacement
          </h3>
          <p>
            Oragon est une application de gestion Projet conçue pour les équipes et les indépendants. Avec une interface intuitive et des fonctionnalités puissantes,
            elle vous aide à organiser vos tâches, collaborer en temps réel et suivre vos progrès en toute simplicité.
          </p>

          <button className='bg-orange-500 py-2 rounded-full text-white hover:ring-4 ring-orange-200 duration-200 text-lg font-semibold ' >Voir Plus</button>
        </div>
      </div>
    </section>
  )
}

export default About
