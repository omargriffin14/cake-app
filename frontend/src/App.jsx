import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import OrderModal from './components/OrderModal'
import './styles/index.css'

export default function App() {
  const [orderOpen, setOrderOpen] = useState(false)

  return (
    <>
      <Navbar onOrderClick={() => setOrderOpen(true)} />
      <Hero onOrderClick={() => setOrderOpen(true)} />
      <Gallery />
      <About />
      <Contact onOrderClick={() => setOrderOpen(true)} />
      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
    </>
  )
}

// v1.2
