// API Configuration for Frontend
// Detect environment at runtime
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

// Determine API base URL - MUST be Render in production
const API_BASE = isDevelopment 
  ? 'http://localhost:5000'
  : 'https://my-protfolio-website-uh8o.onrender.com'

// Log setup
console.log('🔧 API Configuration:')
console.log('   Environment:', isDevelopment ? 'Development' : 'Production')
console.log('   Frontend:', window.location.href)
console.log('   API Base:', API_BASE)

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE}/api/contact`,
  CHATBOT: `${API_BASE}/api/chatbot`,
  CHAT: `${API_BASE}/api/chat`,
  PROJECTS: `${API_BASE}/api/projects`,
  HEALTH: `${API_BASE}/health`,
}

console.log('   Contact endpoint:', API_ENDPOINTS.CONTACT)

export const getApiUrl = (endpoint) => {
  return API_ENDPOINTS[endpoint] || `${API_BASE}${endpoint}`
}

export default API_BASE
