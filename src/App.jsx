import {
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Bus,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  Search,
  Settings,
  Wallet,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AcademicsHubPage from './pages/AcademicsHubPage'
import DashboardPage from './pages/DashboardPage'
import FinancePage from './pages/FinancePage'
import StudentDetailsPage from './pages/StudentDetailsPage'
import UnderConstructionPage from './pages/UnderConstructionPage'
import './App.css'

const topNavItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', path: '/students', icon: GraduationCap },
  { label: 'Academics', path: '/academics', icon: BookOpen },
  { label: 'Finance', path: '/finance', icon: Wallet },
  { label: 'Transport', path: '/transport', icon: Bus },
  { label: 'Accounts', path: '/accounts', icon: Building2 },
  { label: 'Vouchers', path: '/vouchers', icon: Receipt },
  { label: 'Reports', path: '/reports', icon: BarChart3 },
]

const utilityItems = [
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Support', path: '/support', icon: CircleHelp },
]

const routeLabelMap = {
  '/finance': 'Finance',
  '/transport': 'Transport',
  '/accounts': 'Accounts',
  '/vouchers': 'Vouchers',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/support': 'Support',
}

function TopNav() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const notificationRef = useRef(null)
  const adminMenuRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }

      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setIsAdminMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 1500)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  return (
    <>
      <header className="top-navbar">
        <div className="brand-wrap">
          <div className="brand-mark" aria-hidden="true">
            <span></span>
          </div>
          <span className="brand-name">SchoolMate</span>
        </div>

        <nav className="top-links" aria-label="Top navigation">
          {topNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'top-link top-link-active' : 'top-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="top-right">
          <button
            type="button"
            className="icon-chip"
            aria-label="Search"
            onClick={() => setToastMessage('Quick search activated')}
          >
            <Search size={16} />
          </button>

          <div className="top-popover-wrap" ref={notificationRef}>
            <button
              type="button"
              className="icon-chip"
              aria-label="Notifications"
              onClick={() => setIsNotificationOpen((value) => !value)}
            >
              <Bell size={16} />
              <span className="notification-dot"></span>
            </button>

            {isNotificationOpen && (
              <div className="top-popover-menu">
                <button type="button">2 new fee reminders</button>
                <button type="button">1 transport alert</button>
                <button type="button">Attendance sync completed</button>
              </div>
            )}
          </div>

          <div className="top-popover-wrap" ref={adminMenuRef}>
            <button
              type="button"
              className="admin-chip"
              onClick={() => setIsAdminMenuOpen((value) => !value)}
            >
              <span className="admin-avatar">A</span>
              <span className="admin-text">
                <strong>Admin</strong>
                <small>Super Admin</small>
              </span>
              <ChevronDown size={14} />
            </button>

            {isAdminMenuOpen && (
              <div className="top-popover-menu admin">
                <button type="button" onClick={() => setToastMessage('Profile opened')}>
                  View Profile
                </button>
                <button type="button" onClick={() => setToastMessage('Settings opened')}>
                  Settings
                </button>
                <button type="button" onClick={() => setToastMessage('Logout triggered')}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {toastMessage && <div className="ui-live-toast top-nav-toast">{toastMessage}</div>}
    </>
  )
}

function Sidebar() {
  return (
    <aside className="side-panel">
      <div className="sidebar-group">
        <span className="sidebar-title">Main</span>
        {topNavItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={`side-${item.path}`}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'side-link side-link-active' : 'side-link'
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
      <div className="sidebar-bottom">
        {utilityItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={`utility-${item.path}`}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'side-link side-link-active' : 'side-link'
              }
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </aside>
  )
}

function Layout() {
  const location = useLocation()
  const isDashboardRoute = location.pathname === '/dashboard'

  return (
    <div className="app-wrap">
      <TopNav />

      <div className="workspace-shell">
        <Sidebar />

        <main className={isDashboardRoute ? 'page-host dashboard-host' : 'page-host'}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students" element={<StudentDetailsPage />} />
            <Route path="/academics" element={<AcademicsHubPage />} />

            <Route path="/finance" element={<FinancePage />} />
            {Object.entries(routeLabelMap)
              .filter(([path]) => path !== '/finance')
              .map(([path, title]) => (
                <Route
                  key={path}
                  path={path}
                  element={<UnderConstructionPage title={title} />}
                />
              ))}

            <Route path="*" element={<UnderConstructionPage title="Page" />} />
          </Routes>
        </main>
      </div>

      <footer className="layout-footer">
        <span>© 2025 SchoolMate. All rights reserved.</span>
        <div>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <span>v2.1.0</span>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return <Layout />
}

export default App
