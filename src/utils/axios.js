import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? null // No backend for frontend-only deployment
    : 'http://localhost:3000')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
})

// Add request interceptor for production
api.interceptors.request.use(
  (config) => {
    if (!API_BASE_URL && import.meta.env.MODE === 'production') {
      console.warn('API not available in frontend-only deployment')
      return Promise.reject(new Error('API not available'))
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
