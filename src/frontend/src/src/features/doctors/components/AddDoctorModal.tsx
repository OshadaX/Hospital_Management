import { useState } from 'react'
import type { Doctor } from '../../../types/doctor'

interface AddDoctorModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Omit<Doctor, 'id'>) => Promise<void>
}

export function AddDoctorModal({ isOpen, onClose, onSubmit }: AddDoctorModalProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        specialization: '',
        email: '',
        phoneNumber: '',
        isAvailable: true
    })
    const [submitting, setSubmitting] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await onSubmit(formData)
            onClose()
            // Reset form
            setFormData({ firstName: '', lastName: '', specialization: '', email: '', phoneNumber: '', isAvailable: true })
        } catch (error) {
            console.error("Failed to add doctor", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
                    <h3 className="text-title-lg font-bold">Add New Doctor</h3>
                    <button onClick={onClose} className="text-outline hover:text-on-background">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-md font-medium text-on-surface-variant">First Name</label>
                            <input
                                required
                                className="px-3 py-2 rounded-lg border border-outline bg-surface-container-low focus:outline-none focus:border-primary"
                                value={formData.firstName}
                                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-md font-medium text-on-surface-variant">Last Name</label>
                            <input
                                required
                                className="px-3 py-2 rounded-lg border border-outline bg-surface-container-low focus:outline-none focus:border-primary"
                                value={formData.lastName}
                                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-label-md font-medium text-on-surface-variant">Specialization</label>
                        <input
                            required
                            className="px-3 py-2 rounded-lg border border-outline bg-surface-container-low focus:outline-none focus:border-primary"
                            value={formData.specialization}
                            onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-label-md font-medium text-on-surface-variant">Email</label>
                        <input
                            type="email"
                            required
                            className="px-3 py-2 rounded-lg border border-outline bg-surface-container-low focus:outline-none focus:border-primary"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-label-md font-medium text-on-surface-variant">Phone Number</label>
                        <input
                            className="px-3 py-2 rounded-lg border border-outline bg-surface-container-low focus:outline-none focus:border-primary"
                            value={formData.phoneNumber}
                            onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center gap-3 py-2">
                        <input
                            type="checkbox"
                            id="available"
                            className="size-4 accent-primary"
                            checked={formData.isAvailable}
                            onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                        />
                        <label htmlFor="available" className="text-body-md font-medium cursor-pointer">Available for Appointments</label>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-label-lg font-bold text-on-surface-variant hover:bg-surface-variant"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-2 rounded-lg bg-inverse-surface text-inverse-on-surface text-label-lg font-bold hover:bg-on-surface transition-colors disabled:opacity-50"
                        >
                            {submitting ? 'Adding...' : 'Add Doctor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
