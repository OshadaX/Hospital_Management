import { useState, useEffect, useMemo } from 'react'
import type { Doctor } from '../../types/doctor'
import { doctorsService } from '../../services/doctorsService'
import { Sidebar } from '../../components/shared/Sidebar'

// Sub-components
import { DoctorsHeader } from './components/DoctorsHeader'
import { DoctorsFilters } from './components/DoctorsFilters'
import { DoctorsGrid } from './components/DoctorsGrid'

// ── Fallback mock data ──
const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Jenkins',
    specialization: 'Cardiology',
    email: 'sarah.jenkins@carepulse.com',
    phoneNumber: '+1 (555) 123-4567',
    isAvailable: true,
  },
  {
    id: 2,
    firstName: 'Marcus',
    lastName: 'Chen',
    specialization: 'Neurology',
    email: 'm.chen@carepulse.com',
    phoneNumber: '+1 (555) 987-6543',
    isAvailable: true,
  },
  {
    id: 3,
    firstName: 'Elena',
    lastName: 'Rostova',
    specialization: 'Pediatrics',
    email: 'e.rostova@carepulse.com',
    phoneNumber: '+1 (555) 456-7890',
    isAvailable: false,
  },
]

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // ── Data Fetching ──
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const data = await doctorsService.getAll()
        setDoctors(data)
      } catch {
        setDoctors(MOCK_DOCTORS)
        setError(null)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  // ── Filter Logic ──
  const specializations = useMemo(
    () => [...new Set(doctors.map((d) => d.specialization))],
    [doctors]
  )

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const fullName = (d.firstName + ' ' + d.lastName).toLowerCase()
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSpec = !specializationFilter || d.specialization === specializationFilter

      let matchesStatus = true
      if (statusFilter === 'Available') matchesStatus = d.isAvailable === true
      if (statusFilter === 'Unavailable') matchesStatus = d.isAvailable === false

      return matchesSearch && matchesSpec && matchesStatus
    })
  }, [doctors, searchQuery, specializationFilter, statusFilter])

  // ── Handlers ──
  const handleEdit = (doctor: Doctor) => console.log('Edit doctor:', doctor.id)
  const handleViewProfile = (doctor: Doctor) => console.log('View profile:', doctor.id)
  const handleAddDoctor = () => console.log('Add new doctor')

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen antialiased flex">
      {/* ── Fixed Sidebar ── */}
      <Sidebar />

      {/* ── Main Content Area ── */}
      <main className="flex-1 md:ml-[260px] min-h-screen flex flex-col bg-surface-container-lowest">
        <DoctorsHeader totalCount={filtered.length} onAdd={handleAddDoctor} />

        <div className="px-8 py-8 flex-1 max-w-[1200px] mx-auto w-full">
          <DoctorsFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            specializationFilter={specializationFilter}
            onSpecializationChange={setSpecializationFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            specializations={specializations}
          />

          <DoctorsGrid
            doctors={filtered}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onViewProfile={handleViewProfile}
          />
        </div>
      </main>
    </div>
  )
}
