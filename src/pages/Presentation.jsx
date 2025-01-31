import React from 'react'
import Navbar from '../components/PresentationComponent/pnavbar/Navbar'
import Home from '../components/PresentationComponent/phome/Home'
import About from '../components/PresentationComponent/pabout/About'
import Fonctionnalite from '../components/PresentationComponent/pfonctionnalite/Fonctionnalite'
import Pricing from '../components/PresentationComponent/tarification/Pricing'
import Contact from '../components/PresentationComponent/tcontact/Contact'
import Footer from '../components/PresentationComponent/tfooter/Footer'

const Presentation = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <About/>
      <Fonctionnalite/>
      <Pricing/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Presentation
