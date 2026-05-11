import { useState, useEffect, useMemo } from 'react'
import type { Doctor } from '../../types/doctor'
import { doctorsService } from '../../services/doctorsService'

// ── Fallback mock data so the UI works before backend is connected ──
const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    specialization: 'Cardiology',
    email: 'sarah.jenkins@carepulse.com',
    phone: '+1 (555) 123-4567',
    licenseNumber: 'MD-001',
    department: 'Cardiology',
    workingDays: ['Mon', 'Wed', 'Fri'],
    status: 'Available',
    profileImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA73_ZHHc_HnUf6x5eMd6Hy0K_WXCD_I0THLXZYsTLEcGVO1ra5Jby_dGy-FBvbE4XDi3opVmAA7GoW9qAoIscx7pa3a1Ng4UbyTNETA4hitJEn3gp2fmWIyKvo6PjDb-Gl6v9J5shTbUAn8TYWNh3jhHEwQK-j-xWBd-WaOn-uX_Piu450sQW1mSwnI2W0NBD67DLFAvvaARBKQoJZppphrT01F3puACwNLbG1O_vfDkLbpRHn0u1sd2YjtTc4FGv9K4Z6mG4KCe0',
  },
  {
    id: '2',
    firstName: 'Marcus',
    lastName: 'Chen',
    specialization: 'Neurology',
    email: 'm.chen@carepulse.com',
    phone: '+1 (555) 987-6543',
    licenseNumber: 'MD-002',
    department: 'Neurology',
    workingDays: ['Tue', 'Thu'],
    status: 'InConsultation',
    profileImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7S2ErcsIx3Wh6IJXbpQ6cQcRj4NjuN7rPRrrya7YNZcvGhxuwsVKa6gims6rE5njR-mXnksHAmLhY3CfeBXb_0GAsEDmQ9tGi0-xy6oN6_1wbmT-42hcP60YLSpCuieNHEPqHvylq5HTtcvfsFVbW-OG9_N5gSXF2uOUqHBYDIJjF5dLJOJQ_pb04C2zWZicINKYe-cZk4thaI9vNx5oiwKH5XtJ2tKzHVVqjMHFYLkVMMC4MiFNlmXsnlS4OItJGNnL2gVmw7M',
  },
  {
    id: '3',
    firstName: 'Elena',
    lastName: 'Rostova',
    specialization: 'Pediatrics',
    email: 'e.rostova@carepulse.com',
    phone: '+1 (555) 456-7890',
    licenseNumber: 'MD-003',
    department: 'Pediatrics',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'Available',
    profileImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEenXO_JSIRSaxDPpsBYLNpvrfwFoTRTwXPUhFA3EJzKgLuZdZyaDBFVQBRxfcUnKGTAYU1ACFneGO3jGkRlpsg_s33F8pbmRlwMYLoJiE5aR-VIRt3rXkv-M-tL-2xu9eeD6jWZq9yrPS02JxpPXXhYRQkW5_2YH13Xl8EY2xh7vB6bccZt8E4IOsotCEemuli9A1GZburK5X_HD98JmqOEA2Hlfb94spSOZ1NCsChpSsPkeXHjkkl4DVPMWqGa2jx8vNjZVifAo',
  },
]

// ── DoctorCard sub-component ──────────────────────────────────────
interface DoctorCardProps {
  doctor: Doctor
  onEdit: (doctor: Doctor) => void
  onViewProfile: (doctor: Doctor) => void
}

function DoctorCard({ doctor, onEdit, onViewProfile }: DoctorCardProps) {
  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`

  return (
    <article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col gap-5 relative group hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-shadow">
      {/* Edit button — visible on hover */}
      <button
        aria-label={`Edit ${fullName}`}
        onClick={() => onEdit(doctor)}
        className="absolute top-4 right-4 text-outline hover:text-on-background transition-colors opacity-0 group-hover:opacity-100"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center text-center mt-2">
        <div
          className="w-20 h-20 rounded-full bg-surface-variant mb-4 bg-cover bg-center border border-outline-variant/50"
          style={
            doctor.profileImageUrl
              ? { backgroundImage: `url('${doctor.profileImageUrl}')` }
              : undefined
          }
          aria-label={fullName}
        />
        <h3 className="text-title-lg text-on-background">{fullName}</h3>
        <p className="text-body-md text-on-surface-variant mt-1">{doctor.specialization}</p>
      </div>

      {/* Contact info */}
      <div className="flex flex-col gap-2 mt-2 w-full bg-surface-variant/30 rounded-lg p-3">
        <div className="flex items-center gap-3 text-label-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">mail</span>
          <span className="truncate">{doctor.email}</span>
        </div>
        <div className="flex items-center gap-3 text-label-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>{doctor.phone}</span>
        </div>
      </div>

      {/* Working days */}
      <div className="flex flex-wrap gap-2 mt-1">
        {doctor.workingDays.map((day) => (
          <span
            key={day}
            className="px-2 py-1 rounded border border-outline-variant text-label-sm text-on-surface-variant bg-surface-container-lowest"
          >
            {day}
          </span>
        ))}
      </div>

      {/* View Profile link */}
      <div className="mt-auto pt-5 flex items-center justify-between">
        <button
          onClick={() => onViewProfile(doctor)}
          className="text-primary-container text-body-md font-medium hover:text-primary transition-colors"
        >
          View Profile
        </button>
      </div>
    </article>
  )
}

// ── Main DoctorsPage component ────────────────────────────────────
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // ── Fetch doctors from backend (falls back to mock data) ──
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const data = await doctorsService.getAll()
        setDoctors(data)
      } catch {
        // Use mock data while backend is not yet connected
        setDoctors(MOCK_DOCTORS)
        setError(null)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  // ── Derived: unique specializations for filter dropdown ──
  const specializations = useMemo(
    () => [...new Set(doctors.map((d) => d.specialization))],
    [doctors]
  )

  // ── Filtered list ──
  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const fullName = `${d.firstName} ${d.lastName}`.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        fullName.includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpec = !specializationFilter || d.specialization === specializationFilter
      const matchesStatus = !statusFilter || d.status === statusFilter
      return matchesSearch && matchesSpec && matchesStatus
    })
  }, [doctors, searchQuery, specializationFilter, statusFilter])

  const handleEdit = (doctor: Doctor) => {
    // TODO: navigate to edit page or open modal
    console.log('Edit doctor:', doctor.id)
  }

  const handleViewProfile = (doctor: Doctor) => {
    // TODO: navigate to doctor profile page
    console.log('View profile:', doctor.id)
  }

  const handleAddDoctor = () => {
    // TODO: navigate to add doctor form
    console.log('Add new doctor')
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen antialiased flex">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface-container-lowest flex-col hidden md:flex">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-outline-variant">
          <div className="size-6 text-on-background">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-title-lg font-bold tracking-tight">CarePulse</h1>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              dashboard
            </span>
            <span className="text-body-md font-medium">Dashboard</span>
          </a>

          {/* Active: Doctors */}
          <a
            href="/doctors"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-variant text-on-background font-medium transition-colors relative"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-container rounded-r-full" />
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stethoscope
            </span>
            <span className="text-body-md">Doctors</span>
          </a>

          <a
            href="/appointments"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              calendar_today
            </span>
            <span className="text-body-md font-medium">Appointments</span>
          </a>

          <a
            href="/patients"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              group
            </span>
            <span className="text-body-md font-medium">Patients</span>
          </a>

          <a
            href="/lab-reports"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              biotech
            </span>
            <span className="text-body-md font-medium">Lab Reports</span>
          </a>

          <a
            href="/medicines"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              medication
            </span>
            <span className="text-body-md font-medium">Medicines</span>
          </a>
        </nav>

        <div className="p-4 border-t border-outline-variant">
          <a
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
              settings
            </span>
            <span className="text-body-md font-medium">Settings</span>
          </a>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────── */}
      <main className="flex-1 md:ml-[260px] min-h-screen flex flex-col bg-surface-container-lowest">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant px-8 py-5 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <h2 className="text-headline-lg font-bold text-on-background tracking-tight">Doctors</h2>
            <span className="text-body-lg text-on-surface-variant">{filtered.length} total</span>
          </div>
          <button
            onClick={handleAddDoctor}
            className="flex items-center justify-center h-10 px-5 rounded-lg bg-inverse-surface text-inverse-on-surface text-body-md font-medium transition-transform hover:scale-[0.98]"
          >
            Add Doctor
          </button>
        </header>

        <div className="px-8 py-6 flex-1 max-w-[1200px] mx-auto w-full">
          {/* ── Filters Row ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-outline-variant rounded-lg leading-5 bg-surface-container-lowest placeholder-on-surface-variant text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container sm:text-sm transition-colors"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-3">
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-background text-sm font-medium hover:bg-surface-variant transition-colors focus:outline-none focus:ring-1 focus:ring-primary-container"
              >
                <option value="">Specialization</option>
                {specializations.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-background text-sm font-medium hover:bg-surface-variant transition-colors focus:outline-none focus:ring-1 focus:ring-primary-container"
              >
                <option value="">Status</option>
                <option value="Available">Available</option>
                <option value="InConsultation">In Consultation</option>
                <option value="OffDuty">Off Duty</option>
              </select>
            </div>
          </div>

          {/* ── States ── */}
          {loading && (
            <div className="flex items-center justify-center py-24 text-on-surface-variant">
              <span className="material-symbols-outlined animate-spin text-[32px] mr-3">progress_activity</span>
              Loading doctors...
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-error/20 bg-error-container text-on-error-container mb-6">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-3">
              <span className="material-symbols-outlined text-[48px]">person_search</span>
              <p className="text-body-lg">No doctors found matching your search.</p>
            </div>
          )}

          {/* ── Doctor Cards Grid ── */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onEdit={handleEdit}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
