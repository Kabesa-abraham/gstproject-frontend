import React from 'react'

const Contact = () => {
  return (
    <section className='min-h-screen w-full flex items-center' id='contact' >
        <div className='max-w-3xl w-full mx-auto'>
          <form className='sm:shadow-lg p-5 lg:p-10 flex flex-col gap-2'>
            <h4 className="text-lg font-bold" >Remplissez le Formulaire</h4>
            <div className="flex flex-col gap-3 text-sm" >
              <input type='text' placeholder='Nom' className='p-2 outline-blue-500' />
              <input type='text' placeholder='Email' className='p-2 outline-blue-500'  />
              <input type='text' placeholder='Subject' className='p-2 outline-blue-500'  />
            </div>
            <textarea cols='30' rows='5' className="border border-zinc-300 rounded-md pl-2 text-sm outline-blue-500 " ></textarea>
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 font-semibold text-sm rounded-full hover:ring-4 ring-blue-200 duration-150" >Soumettre la requête</button>
          </form>
        </div>
    </section>
  )
}

export default Contact
