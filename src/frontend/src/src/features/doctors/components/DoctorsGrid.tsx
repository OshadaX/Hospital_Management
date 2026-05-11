import type { Doctor } from '../../../types/doctor'
import { DoctorCard } from './DoctorCard'

interface DoctorsGridProps {
    doctors: Doctor[]
    loading: boolean
    error: string | null
    onEdit: (doctor: Doctor) => void
    onViewProfile: (doctor: Doctor) => void
}

export function DoctorsGrid({
    doctors,
    loading,
    error,
    onEdit,
    onViewProfile,
}: DoctorsGridProps) {
    // 1. Loading State
    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 text-on-surface-variant">
                <span className="material-symbols-outlined animate-spin text-[32px] mr-3">
                    progress_activity
                </span>
                Loading doctors...
            </div>
        )
    }

    // 2. Error State
    if (error) {
        return (
            <div className="flex items-center gap-3 p-4 rounded-lg border border-error/20 bg-error-container text-on-error-container mb-6">
                <span className="material-symbols-outlined">error</span>
                {error}
            </div>
        )
    }

    // 3. Empty State (No results found)
    if (doctors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-3">
                <span className="material-symbols-outlined text-[48px]">person_search</span>
                <p className="text-body-lg">No doctors found matching your search.</p>
            </div>
        )
    }

    // 4. Data Grid
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
                <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onEdit={onEdit}
                    onViewProfile={onViewProfile}
                />
            ))}
        </div>
    )
}
