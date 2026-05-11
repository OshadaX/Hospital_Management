interface DoctorsFiltersProps {
    searchQuery: string
    onSearchChange: (val: string) => void
    specializationFilter: string
    onSpecializationChange: (val: string) => void
    statusFilter: string
    onStatusChange: (val: string) => void
    specializations: string[]
}

export function DoctorsFilters({
    searchQuery,
    onSearchChange,
    specializationFilter,
    onSpecializationChange,
    statusFilter,
    onStatusChange,
    specializations,
}: DoctorsFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-outline-variant rounded-lg leading-5 bg-surface-container-lowest placeholder-on-surface-variant text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container sm:text-sm transition-colors"
                />
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-3">
                <select
                    value={specializationFilter}
                    onChange={(e) => onSpecializationChange(e.target.value)}
                    className="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-background text-sm font-medium hover:bg-surface-variant transition-colors focus:outline-none focus:ring-1 focus:ring-primary-container"
                >
                    <option value="">Specialization</option>
                    {specializations.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-background text-sm font-medium hover:bg-surface-variant transition-colors focus:outline-none focus:ring-1 focus:ring-primary-container"
                >
                    <option value="">Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
            </div>
        </div>
    )
}
