import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Specials from './components/Specials'
import OrderModal from './components/OrderModal'
import SpecialsModal from './components/SpecialsModal'
import './styles/index.css'

export default function App() {
  const [orderOpen, setOrderOpen] = useState(false)
  const [specialsOpen, setSpecialsOpen] = useState(false)

  return (
    <>
      <Navbar
        onOrderClick={() => setOrderOpen(true)}
        onSpecialsClick={() => setSpecialsOpen(true)}
      />
      <Hero onOrderClick={() => setOrderOpen(true)} />
      <Specials onOrderClick={() => setSpecialsOpen(true)} />
      <Gallery />
      <About />
      <Contact onOrderClick={() => setOrderOpen(true)} />
      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
      {specialsOpen && <SpecialsModal onClose={() => setSpecialsOpen(false)} />}
    </>
  )
}

// v1.4
