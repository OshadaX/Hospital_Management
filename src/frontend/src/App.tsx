import { useState } from 'react'
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  Activity, 
  Settings, 
  Bell, 
  Search,
  LayoutDashboard,
  Menu,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './styles/index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'doctors', icon: Stethoscope, label: 'Doctors' },
    { id: 'patients', icon: Users, label: 'Patients' },
    { id: 'appointments', icon: Calendar, label: 'Appointments' },
    { id: 'lab', icon: Activity, label: 'Lab Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  const stats = [
    { label: 'Total Patients', value: '1,284', change: '+12%', color: 'var(--primary)' },
    { label: 'Active Doctors', value: '42', change: 'Stable', color: 'var(--accent)' },
    { label: 'Today\'s Appointments', value: '18', change: '+4', color: 'var(--success)' },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-panel m-4 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--primary)' }}>
            <Activity size={28} />
            CarePulse
          </h2>
        </div>

        <nav className="flex-1 px-4 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-2 ${
                activeTab === item.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-secondary hover:bg-surface-hover hover:text-white'
              }`}
              style={{ 
                backgroundColor: activeTab === item.id ? 'var(--primary)' : 'transparent',
                color: activeTab === item.id ? 'white' : 'var(--text-secondary)'
              }}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
            </div>
            <div>
              <p className="text-sm font-semibold">Admin Account</p>
              <p className="text-xs text-secondary" style={{ color: 'var(--text-secondary)' }}>Super User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 pt-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Admin</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening in your hospital today.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="glass-panel px-4 py-2 flex items-center gap-2">
              <Search size={18} className="text-secondary" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            <button className="glass-panel p-2 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" style={{ backgroundColor: 'var(--error)' }}></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid-auto mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6"
            >
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-800" style={{ color: stat.color }}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-panel p-8 min-h-[400px]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold capitalize">{activeTab} Management</h2>
              <button className="btn btn-primary">
                Add New {activeTab.slice(0, -1)}
              </button>
            </div>

            <div className="text-center py-20 border-2 border-dashed rounded-2xl" style={{ borderColor: 'var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                No {activeTab} records found. Start by adding a new one.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
