/**
 * API Client - Handles API calls for both development and production
 * Automatically uses correct base URL based on environment
 */

const getApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL
  
  if (baseUrl) {
    return baseUrl
  }
  
  // Fallback for production
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return window.location.origin.replace(/:\d+$/, '')
  }
  
  return 'http://localhost:5000'
}

class ApiClient {
  constructor() {
    this.baseUrl = getApiUrl()
    console.log(`[API Client] Using base URL: ${this.baseUrl}`)
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    const config = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`[API Error] ${endpoint}:`, error.message)
      throw error
    }
  }

  // Contact Form
  async submitContact(data) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Chatbot
  async sendChatMessage(message) {
    return this.request('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
  }

  // Projects
  async getProjects() {
    return this.request('/api/projects')
  }

  // Health Check
  async healthCheck() {
    return this.request('/health')
  }
}

export default new ApiClient()
