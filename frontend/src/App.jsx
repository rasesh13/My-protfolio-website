import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import axios from 'axios'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import ParticleBackground from './components/ParticleBackground'
import Chatbot from './components/Chatbot'
import { API_ENDPOINTS } from './config/api'
import './App.css'

export default function App() {
  const location = useLocation()

  // Warmup backend on mount and periodically to prevent cold starts
  useEffect(() => {
    const warmupBackend = async () => {
      try {
        const backendUrl = API_ENDPOINTS.HEALTH.replace('/health', '/warmup')
        console.log('🔥 Warming up backend at:', backendUrl)
        await axios.get(backendUrl, { timeout: 5000 })
        console.log('✅ Backend warmup successful')
      } catch (error) {
        console.log('⚠️ Backend warmup failed (this is ok):', error.message)
      }
    }

    // Warmup on initial load
    warmupBackend()

    // Warmup every 4 minutes to keep serverless warm
    const warmupInterval = setInterval(warmupBackend, 4 * 60 * 1000)

    return () => clearInterval(warmupInterval)
  }, [])

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

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  )
}
