import React from 'react'
import './foctionnalite.css'
import {fonctionDatas} from './fonctionnaliteData.js'
import CartFonction from './CartFonction.jsx'

const Fonctionnalite = () => {
  return (
    <section className='w-full bg-[#132844] py-4 md:py-10 ' id='fonctionnalite' >
      <div className='max-w-7xl mx-auto flex flex-col gap-6' >
        <h1 className='text-white font-bold text-center text-xl sm:text-2xl md:text-3xl ' >Fonctionnalité</h1>
        
        <div className='flex items-center justify-center flex-wrap gap-5 md:gap-10' >
            {
                fonctionDatas.map((item,index) =>(
                    <CartFonction key={index} icon={item.icon} title={item.title} description={item.description} />
                ))
            }
        </div>
      </div>
    </section>
  )
}

export default Fonctionnalite
