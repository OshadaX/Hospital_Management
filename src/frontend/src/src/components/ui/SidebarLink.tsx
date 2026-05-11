import { NavLink } from 'react-router-dom'

interface SidebarLinkProps {
    href: string
    icon: string
    label: string
}

export function SidebarLink({ href, icon, label }: SidebarLinkProps) {
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors relative ${isActive
                    ? 'bg-surface-variant text-on-background font-medium'
                    : 'text-on-surface-variant hover:bg-surface-variant'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    {/* 1. The Active Indicator (The blue vertical bar) */}
                    {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-container rounded-r-full" />
                    )}

                    {/* 2. The Icon */}
                    <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        {icon}
                    </span>

                    {/* 3. The Label */}
                    <span className="text-body-md">{label}</span>
                </>
            )}
        </NavLink>
    )
}
