import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DoctorsPage from './src/features/doctors/DoctorsPage'

// TODO: Import other pages as you build them:
// import LoginPage from './src/features/auth/LoginPage'
// import DashboardPage from './src/features/dashboard/DashboardPage'
// import PatientsPage from './src/features/patients/PatientsPage'
// import AppointmentsPage from './src/features/appointments/AppointmentsPage'
// import LabReportsPage from './src/features/lab/LabReportsPage'
// import MedicinesPage from './src/features/medicines/MedicinesPage'
// import SettingsPage from './src/features/settings/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: redirect to doctors for now */}
        <Route path="/" element={<Navigate to="/doctors" replace />} />

        {/* Feature pages */}
        <Route path="/doctors" element={<DoctorsPage />} />

        {/* Placeholder routes — uncomment as you add pages */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        {/* <Route path="/patients" element={<PatientsPage />} /> */}
        {/* <Route path="/appointments" element={<AppointmentsPage />} /> */}
        {/* <Route path="/lab-reports" element={<LabReportsPage />} /> */}
        {/* <Route path="/medicines" element={<MedicinesPage />} /> */}
        {/* <Route path="/settings" element={<SettingsPage />} /> */}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/doctors" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
