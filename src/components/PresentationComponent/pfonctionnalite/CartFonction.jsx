import React from 'react'

const CartFonction = (props) => {
  return (
    <div className='w-72 flex flex-col gap-3 items-center justify-center '>
        <div className='bg-[#ffffff1c] p-5 text-2xl md:text-3xl text-white flex flex-col justify-center items-center 
                                rounded-bl-[35px] rounded-tr-[35px] hover:scale-125 duration-150 '>
            <img src={props.icon} alt="" className='w-12 h-12' />
        </div>
        <h1 className="text-white text-xl md:text-2xl font-bold text-center" >{props.title}</h1>
        <p className="text-gray-400 font-light text-center text-xs md:text-sm" >{props.description}</p>
    </div>
  )
}

export default CartFonction
