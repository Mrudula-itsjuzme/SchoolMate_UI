import {
  Bell,
  Bus,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  CirclePlus,
  FileText,
  IndianRupee,
  LogOut,
  Plus,
  Search,
  Settings,
  User,
  UsersRound,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const stats = [
  {
    title: 'Total Students',
    value: '850',
    icon: UsersRound,
    iconClass: 'dashboard-kpi-icon students',
  },
  {
    title: 'Fees Pending',
    value: '₹1,25,000',
    icon: IndianRupee,
    iconClass: 'dashboard-kpi-icon fees',
  },
  {
    title: 'Attendance',
    value: '92%',
    icon: CheckCircle2,
    iconClass: 'dashboard-kpi-icon attendance',
  },
  {
    title: 'Active Vehicle',
    value: '12',
    icon: Bus,
    iconClass: 'dashboard-kpi-icon vehicles',
  },
]

const activities = [
  {
    text: 'New student enrolled: ',
    highlight: 'Riya Sharma',
    tone: 'blue',
    time: 'Just now',
  },
  {
    text: 'Fee payment collected from ',
    highlight: 'Anil Kumar',
    tone: 'orange',
    time: 'Just now',
  },
  {
    text: 'Vehicle maintenance scheduled for ',
    highlight: 'Bus A',
    tone: 'green',
    time: 'Just now',
  },
  {
    text: 'Attendance sync completed for ',
    highlight: 'LKG - B',
    tone: 'blue',
    time: '2 min ago',
  },
  {
    text: 'Transport checklist updated for ',
    highlight: 'Bus C',
    tone: 'green',
    time: '5 min ago',
  },
]

const chartBars = [
  { month: 'Jan', income: 44, expense: 36 },
  { month: 'Feb', income: 66, expense: 40 },
  { month: 'Mar', income: 62, expense: 44 },
  { month: 'Apr', income: 90, expense: 64 },
  { month: 'Jun', income: 70, expense: 58 },
]

const notifications = [
  'Fee reminders sent to 14 guardians',
  '2 behavior reports need review',
  'Bus A maintenance due tomorrow',
]

const createActions = [
  { key: 'student', label: 'Create Student', icon: User },
  { key: 'voucher', label: 'Create Voucher', icon: FileText },
  { key: 'payment', label: 'Add Fee Payment', icon: IndianRupee },
  { key: 'task', label: 'Quick Task', icon: CirclePlus },
]

function DashboardPage() {
  const [searchValue, setSearchValue] = useState('')
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(chartBars[0].month)
  const [toastMessage, setToastMessage] = useState('')

  const adminMenuRef = useRef(null)
  const notificationRef = useRef(null)
  const createRef = useRef(null)

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setIsAdminMenuOpen(false)
      }

      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }

      if (createRef.current && !createRef.current.contains(event.target)) {
        setIsCreateOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 1600)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  const filteredActivities = useMemo(() => {
    if (!searchValue.trim()) {
      return activities.slice(0, 3)
    }

    const query = searchValue.trim().toLowerCase()

    return activities
      .filter((item) => `${item.text}${item.highlight}`.toLowerCase().includes(query))
      .slice(0, 3)
  }, [searchValue])

  const handleCreateAction = (label) => {
    setIsCreateOpen(false)
    setToastMessage(`${label} action opened`)
  }

  const handleStatAction = (label) => {
    setToastMessage(`${label} details opened`)
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-top-row">
        <label className="dashboard-search-wrap">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </label>

        <div className="dashboard-admin-wrap">
          <div className="dashboard-notification-wrap" ref={notificationRef}>
            <button
              type="button"
              className={isNotificationOpen ? 'dashboard-icon-btn active' : 'dashboard-icon-btn'}
              aria-label="Notifications"
              onClick={() => setIsNotificationOpen((value) => !value)}
            >
              <Bell size={20} />
            </button>

            {isNotificationOpen && (
              <div className="dashboard-notification-panel">
                {notifications.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>

          <div ref={adminMenuRef}>
            <button
              type="button"
              className={isAdminMenuOpen ? 'dashboard-admin-chip active' : 'dashboard-admin-chip'}
              onClick={() => setIsAdminMenuOpen((value) => !value)}
            >
              <span className="dashboard-admin-avatar">A</span>
              <span>Admin</span>
              <ChevronDown size={16} />
            </button>

            {isAdminMenuOpen && (
              <div className="dashboard-admin-menu">
                <button type="button" onClick={() => setToastMessage('Profile panel opened')}>
                  <User size={18} />
                  <span>View Profile</span>
                </button>
                <button type="button" onClick={() => setToastMessage('Settings panel opened')}>
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <button type="button" onClick={() => setToastMessage('Logout flow triggered')}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-stats-grid">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.title} className="dashboard-stat-card">
              <div className="dashboard-stat-title-row">
                <span className={item.iconClass}>
                  <Icon size={20} />
                </span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.value}</p>
            </article>
          )
        })}
      </div>

      <div className="dashboard-main-grid">
        <article className="dashboard-panel">
          <h2>Recent Activities</h2>

          {filteredActivities.length === 0 ? (
            <div className="dashboard-empty-state">No activities found for this search.</div>
          ) : (
            <ul className="dashboard-activity-list">
              {filteredActivities.map((activity) => (
              <li key={`${activity.text}-${activity.highlight}`}>
                <span className={`dot ${activity.tone}`}>
                  <Circle size={8} fill="currentColor" strokeWidth={0} />
                </span>
                <span className="activity-text">
                  {activity.text}
                  <strong>{activity.highlight}</strong>
                </span>
                <span className="activity-time">{activity.time}</span>
              </li>
              ))}
            </ul>
          )}
        </article>

        <article className="dashboard-panel">
          <h2>Finance Overview</h2>
          <h3>Fees Paid vs Pending</h3>

          <div className="dashboard-finance-content">
            <div className="dashboard-pie-wrap">
              <div className="dashboard-pie-chart">
                <span className="paid-value">72%</span>
                <span className="pending-value">28%</span>
              </div>

              <div className="dashboard-pie-legend">
                <span>
                  <i className="legend-box paid"></i>Paid
                </span>
                <span>
                  <i className="legend-box pending"></i>Pending
                </span>
              </div>
            </div>

            <div className="dashboard-bar-wrap">
              <div className="bar-grid-lines"></div>
              <div className="dashboard-bar-chart">
                {chartBars.map((bar) => (
                  <button
                    type="button"
                    key={bar.month}
                    className={selectedMonth === bar.month ? 'bar-set active' : 'bar-set'}
                    onClick={() => setSelectedMonth(bar.month)}
                  >
                    <div className="bar income" style={{ height: `${bar.income}px` }}></div>
                    <div className="bar expense" style={{ height: `${bar.expense}px` }}></div>
                    <span>{bar.month}</span>
                  </button>
                ))}
              </div>

              <p className="selected-month-note">Selected month: {selectedMonth}</p>

              <div className="dashboard-bar-legend">
                <span>
                  <i className="legend-box income"></i>Income
                </span>
                <span>
                  <i className="legend-box expense"></i>Expenses
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="dashboard-bottom-grid">
        <article className="dashboard-panel transport-panel">
          <h2>Transport Summary</h2>
          <div className="transport-row">
            <span className="transport-dot blue"></span>
            <p>
              Next Service: <strong>Bus B</strong> on 15th Feb
            </p>
          </div>
          <div className="transport-row">
            <span className="transport-dot orange"></span>
            <p>
              Fuel Usage: <strong>320 L</strong> This Month
            </p>
          </div>
        </article>

        <article className="dashboard-panel stats-panel">
          <h2>Student Statistics</h2>

          <button
            type="button"
            className="stats-line-item"
            onClick={() => handleStatAction('Dropout')}
          >
            <span>
              Dropouts: <strong>5</strong>
            </span>
            <ChevronRight size={20} />
          </button>

          <button
            type="button"
            className="stats-line-item"
            onClick={() => handleStatAction('Behavioral issues')}
          >
            <span>
              Behavioral Issues: <strong>8</strong>
            </span>
            <ChevronRight size={20} />
          </button>
        </article>
      </div>

      <div className="dashboard-create-wrap" ref={createRef}>
        <button
          type="button"
          className="dashboard-create-btn"
          onClick={() => setIsCreateOpen((value) => !value)}
        >
          <Plus size={24} />
          Create
        </button>

        {isCreateOpen && (
          <div className="dashboard-create-menu">
            {createActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  type="button"
                  key={action.key}
                  onClick={() => handleCreateAction(action.label)}
                >
                  <Icon size={16} />
                  <span>{action.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {toastMessage && <div className="ui-live-toast">{toastMessage}</div>}
    </section>
  )
}

export default DashboardPage
