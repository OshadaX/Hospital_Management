import type { Doctor } from '../../../types/doctor'

interface DoctorCardProps {
    doctor: Doctor
    onEdit: (doctor: Doctor) => void
    onViewProfile: (doctor: Doctor) => void
}

export function DoctorCard({ doctor, onEdit, onViewProfile }: DoctorCardProps) {
    const profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        doctor.firstName + ' ' + doctor.lastName
    )}&background=random`

    return (
        <article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col gap-5 relative group hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-shadow">
            {/* Edit button — visible on hover */}
            <button
                aria-label={`Edit ${doctor.firstName} ${doctor.lastName}`}
                onClick={() => onEdit(doctor)}
                className="absolute top-4 right-4 text-outline hover:text-on-background transition-colors opacity-0 group-hover:opacity-100"
            >
                <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>

            {/* Avatar + Name */}
            <div className="flex flex-col items-center text-center mt-2">
                <div
                    className="w-20 h-20 rounded-full bg-surface-variant mb-4 bg-cover bg-center border border-outline-variant/50"
                    style={{ backgroundImage: `url('${profileImageUrl}')` }}
                    aria-label={doctor.firstName + ' ' + doctor.lastName}
                />
                <h3 className="text-title-lg text-on-background">{doctor.firstName + ' ' + doctor.lastName}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-body-md text-on-surface-variant">{doctor.specialization}</p>
                    <span className={`w-2 h-2 rounded-full ${doctor.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2 mt-2 w-full bg-surface-variant/30 rounded-lg p-3">
                <div className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3 text-label-md text-on-surface-variant">
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>{doctor.phoneNumber}</span>
                </div>
            </div>

            {/* View Profile link */}
            <div className="mt-auto pt-5 flex items-center justify-between">
                <button
                    onClick={() => onViewProfile(doctor)}
                    className="text-primary-container text-body-md font-medium hover:text-primary transition-colors"
                >
                    View Profile
                </button>
                <span className={`text-label-sm font-semibold ${doctor.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {doctor.isAvailable ? 'Available' : 'Unavailable'}
                </span>
            </div>
        </article>
    )
}
