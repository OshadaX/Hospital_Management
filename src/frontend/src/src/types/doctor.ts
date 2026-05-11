export interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialization: string
  email: string
  phone: string
  licenseNumber: string
  department: string
  workingDays: string[]
  profileImageUrl?: string
  status: 'Available' | 'InConsultation' | 'OffDuty'
  yearsOfExperience?: number
}

export type DoctorFormData = Omit<Doctor, 'id'>
