interface DoctorsHeaderProps {
    totalCount: number
    onAdd: () => void
}

export function DoctorsHeader({ totalCount, onAdd }: DoctorsHeaderProps) {
    return (
        <header className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant px-8 py-5 flex items-center justify-between">
            <div className="flex items-baseline gap-4">
                <h2 className="text-headline-lg font-bold text-on-background tracking-tight">Doctors</h2>
                <span className="text-body-lg text-on-surface-variant">{totalCount} total</span>
            </div>
            <button
                onClick={onAdd}
                className="flex items-center justify-center h-10 px-5 rounded-lg bg-inverse-surface text-inverse-on-surface text-body-md font-medium transition-transform hover:scale-[0.98]"
            >
                Add Doctor
            </button>

        </header>
    )
}
