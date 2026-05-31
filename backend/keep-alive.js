/**
 * Keep-Alive Service for Vercel Deployment
 * Pings the backend every 5 minutes to prevent cold starts
 * Run this with: node keep-alive.js
 */

import axios from 'axios'

const BACKEND_URL = process.env.BACKEND_URL || 'https://backend-alpha-ebon-24.vercel.app'
const INTERVAL = 5 * 60 * 1000 // 5 minutes in milliseconds

console.log(`🔄 Keep-Alive Service Starting`)
console.log(`📍 Backend URL: ${BACKEND_URL}`)
console.log(`⏱️  Ping interval: ${INTERVAL / 1000 / 60} minutes\n`)

// Initial ping
pingBackend()

// Set up recurring pings
setInterval(pingBackend, INTERVAL)

async function pingBackend() {
  try {
    const timestamp = new Date().toLocaleTimeString()
    console.log(`[${timestamp}] 🔥 Pinging backend to keep it warm...`)
    
    const response = await axios.get(`${BACKEND_URL}/warmup`, {
      timeout: 10000
    })
    
    console.log(`[${timestamp}] ✅ Backend pinged successfully`)
    console.log(`[${timestamp}] Status: ${response.data.status}\n`)
  } catch (error) {
    const timestamp = new Date().toLocaleTimeString()
    console.error(`[${timestamp}] ❌ Ping failed:`, error.message)
    console.error(`[${timestamp}] Retrying in 5 minutes...\n`)
  }
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✋ Keep-Alive Service stopping...')
  process.exit(0)
})
