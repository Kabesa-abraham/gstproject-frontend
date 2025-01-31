import React from "react"
import { tarification } from "./tarifData.js" 

const PriceCard = () => {
  return (
    <>
      <div className='w-full flex flex-wrap justify-center items-center gap-5'>
        {tarification.map((item, index) => (
          <div className='max-w-96 w-full flex flex-col gap-3 py-5 px-8 shadow-lg shadow-slate-400 border-t border-t-gray-100 
               rounded-lg' key={index}>

            <h3 className="text-lg font-extrabold text-center" >{item.plan}</h3>
            <h1 className="flex items-end gap-1 justify-center font-extrabold text-4xl" >
              <span className="text-3xl" >$</span>
              {item.price}
            </h1>
            <p className="text-center text-sm text-gray-500" >{item.ptext}</p>

            <ul className="flex flex-col gap-6 my-3" >
              {item.list.map((val,i) => {
                const { text, change } = val
                return (
                  <li className="flex items-center gap-3 pl-5" key={i} >
                    <label
                    className="text-xs rounded-full p-2"
                      style={{
                        background: change === "color" ? "#dc35451f" : "#27ae601f",
                        color: change === "color" ? "#dc3848" : "#27ae60",
                      }}
                    >
                      {<val.icon/>}
                    </label>
                    <p className="text-sm font-medium" >{text}</p>
                  </li>
                )
              })}
            </ul>
            <button
              className='px-5 py-3 rounded-full font-semibold border border-[#2771ae85] hover:ring-4 ring-blue-100 duration-150 '
              style={{
                background: item.plan === "Standard" ? "#2771ae" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#2771ae",
              }}
            >
              {item.plan}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default PriceCard
