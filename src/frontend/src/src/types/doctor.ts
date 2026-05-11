export interface Doctor {
  id: number
  firstName: string
  lastName: string
  specialization: string
  email: string
  phoneNumber: string
  isAvailable: boolean
  createdAt?: string
}

export type DoctorFormData = Omit<Doctor, 'id' | 'createdAt'>
