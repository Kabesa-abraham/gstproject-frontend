import React from "react"
import PriceCard from "./PriceCard"

const Pricing = () => {
  return (
    <>
      <section className='min-h-screen w-full flex flex-col justify-center gap-10 py-5' id="tarification">
        <h1 className="font-extrabold text-3xl text-center" >Tarification</h1>

        <div className='max-w-7xl w-full mx-auto'>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Pricing
