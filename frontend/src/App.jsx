import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Chatbot from './components/Chatbot'
import './App.css'

export default function App() {
  const location = useLocation()

  // Auto scroll to top on route change with smooth transition
  useEffect(() => {
    // Small delay to let page transition animate
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="w-full overflow-x-hidden bg-black relative">
      {/* Premium visual effects */}
      <CustomCursor />
      <ParticleBackground />
      <CursorGlow />
      <Chatbot />

      {/* Main layout with navbar and outlet */}
      <div className="relative z-10">
        <Navbar />
        <div className="transition-all duration-300">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}
