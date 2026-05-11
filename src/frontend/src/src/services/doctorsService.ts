import axios from 'axios'
import type { Doctor, DoctorFormData } from '../types/doctor'

// Update this to match your gateway URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const doctorsService = {
  getAll: async (): Promise<Doctor[]> => {
    const res = await api.get('/api/doctors')
    return res.data
  },

  getById: async (id: string): Promise<Doctor> => {
    const res = await api.get(`/api/doctors/${id}`)
    return res.data
  },

  create: async (data: DoctorFormData): Promise<Doctor> => {
    const res = await api.post('/api/doctors', data)
    return res.data
  },

  update: async (id: string, data: Partial<DoctorFormData>): Promise<Doctor> => {
    const res = await api.put(`/api/doctors/${id}`, data)
    return res.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/doctors/${id}`)
  },
}
