// API Configuration for Frontend
// Detect environment at runtime
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

const API_BASE = isDevelopment
  ? 'http://localhost:5000'
  : 'https://backend-fktwb873d-rasesh13s-projects.vercel.app'

console.log('🔗 API Base URL:', API_BASE)
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
