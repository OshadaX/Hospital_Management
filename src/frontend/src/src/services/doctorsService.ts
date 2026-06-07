import axios from 'axios'
import type { Doctor } from '../types/doctor'

const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const doctorsService = {
  getAll: async (): Promise<Doctor[]> => {
    const response = await api.get('/api/doctors')
    return response.data
  },

  getById: async (id: string): Promise<Doctor> => {
    const response = await api.get(`/api/doctors/${id}`)
    return response.data
  },

  create: async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
    const response = await api.post('/api/doctors', doctor)
    return response.data
  },

  update: async (id: string, doctor: Partial<Doctor>): Promise<Doctor> => {
    const response = await api.put(`/api/doctors/${id}`, doctor)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/doctors/${id}`)
  }
}
