import React from 'react'
import {motion} from 'framer-motion'

const DashBoardCard = ({iconCard,nameCard,numberTotal,bgColorCard,mydelay}) => {
  return (
    <motion.div className={`h-[110px] min-w-[250px] max-w-full md:max-w-[19%] w-full p-1 text-white flex items-center gap-2 rounded-md`} style={{backgroundColor:bgColorCard}} 
         initial={{opacity:0,}}
                  whileInView={{opacity:1}}
                  viewport={{amount:0.5}}
                  transition={{duration:.3,delay:mydelay}}
    >
        <div className='text-2xl md:text-5xl'  >{iconCard}</div>

        <div className={`h-full w-full bg-white bg-opacity-15 flex flex-col gap-1 justify-center rounded-md pl-5`} >
            <p className='text-xl md:text-3xl font-medium' >{numberTotal}</p>
            <h4 className='text-[#ffffffab] font-medium text-sm md:text-lg' >{nameCard}</h4>
        </div>
    </motion.div>
  )
}

export default DashBoardCard