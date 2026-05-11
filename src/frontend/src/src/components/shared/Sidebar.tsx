import { SidebarLink } from '../ui/SidebarLink'

const navItems = [
    { label: 'Dashboard', icon: 'dashboard', href: '/dashboard' },
    { label: 'Doctors', icon: 'stethoscope', href: '/doctors' },
    { label: 'Appointments', icon: 'calendar_today', href: '/appointments' },
    { label: 'Patients', icon: 'group', href: '/patients' },
    { label: 'Lab Tests', icon: 'science', href: '/lab-reports' },
    { label: 'Medicines', icon: 'pill', href: '/medicines' },
    { label: 'Feedback', icon: 'rate_review', href: '/feedback' },
]

export function Sidebar() {
    return (
        <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-outline-variant bg-surface-container-lowest flex-col hidden md:flex">
            {/* ── Logo Section ── */}
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

            {/* ── Main Navigation ── */}
            <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
                {navItems.map((item) => (
                    <SidebarLink
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </nav>

            {/* ── Footer Section (Settings) ── */}
            <div className="p-4 border-t border-outline-variant">
                <SidebarLink
                    href="/settings"
                    icon="settings"
                    label="Settings"
                />
            </div>
        </aside>
    )
}
