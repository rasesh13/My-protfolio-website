// API Configuration for Frontend
// Detect environment at runtime
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

// Use environment variable or fallback to Render backend
const API_BASE = isDevelopment
  ? 'http://localhost:5000'
  : (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_PROD || 'https://my-protfolio-website-uh8o.onrender.com')

// Add CORS headers globally
if (!isDevelopment) {
  console.log('🌍 Production mode - Using Render backend with CORS')
}

console.log('🔗 API Base URL:', API_BASE)
console.log('Frontend Hostname:', window.location.hostname)
console.log('Frontend Protocol:', window.location.protocol)
console.log('Environment:', isDevelopment ? 'Development' : 'Production')

export const API_ENDPOINTS = {
  // Contact
  CONTACT: `${API_BASE}/api/contact`,
  
  // Chatbot
  CHATBOT: `${API_BASE}/api/chatbot`,
  CHAT: `${API_BASE}/api/chat`,
  
  // Projects
  PROJECTS: `${API_BASE}/api/projects`,
  
  // Health check
  HEALTH: `${API_BASE}/health`,
}

export const getApiUrl = (endpoint) => {
  return API_ENDPOINTS[endpoint] || `${API_BASE}${endpoint}`
}

export default API_BASE
