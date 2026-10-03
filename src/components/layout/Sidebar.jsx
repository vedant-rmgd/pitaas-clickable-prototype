import { useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Database,
  FileChartColumn,
  Home as HomeIcon,
  LogOut,
  Package,
  ScanLine,
  Settings,
  X,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

const navigationGroups = [
  {
    label: 'Universal Sets',
    icon: Package,
    children: [
      { label: 'New Arrival', to: '/universal-sets/new-arrival' },
      { label: 'Batches', to: '/universal-sets/batches' },
    ],
  },
  {
    label: 'Reports',
    icon: FileChartColumn,
    children: [
      { label: 'Batch Tracking', to: '/reports/batch-tracking' },
      { label: 'Warehouse Stock', to: '/reports/location-stock' },
      { label: 'Reconciliation', to: '/reports/reconciliation' },
    ],
  },
  {
    label: 'Setup',
    icon: Database,
    children: [
      { label: 'Locations', to: '/setup/locations' },
      { label: 'Suppliers', to: '/setup/suppliers' },
    ],
  },
]

function isPathActive(pathname, to) {
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onClose }) {
  const location = useLocation()
  const [openGroups, setOpenGroups] = useState({
    'Universal Sets': true,
    Reports: false,
    Setup: false,
  })

  const toggleGroup = (label) => {
    if (collapsed) {
      onToggle()
      setOpenGroups((current) => ({ ...current, [label]: true }))
      return
    }

    setOpenGroups((current) => ({ ...current, [label]: !current[label] }))
  }

  const renderGroup = ({ label, icon: Icon, children }) => {
    const groupOpen = openGroups[label]
    const groupActive = children.some((child) => isPathActive(location.pathname, child.to))

    return <div className={`nav-group ${groupActive ? 'nav-group--active' : ''}`} key={label}>
      <button type="button" className={`nav-link nav-group__trigger ${groupActive ? 'nav-link--active' : ''}`} title={collapsed ? label : undefined} aria-expanded={groupOpen} onClick={() => toggleGroup(label)}><Icon size={19} strokeWidth={1.8} />{!collapsed && <span>{label}</span>}{!collapsed && (groupOpen ? <ChevronUp className="nav-group__chevron" size={17} /> : <ChevronDown className="nav-group__chevron" size={17} />)}</button>
      {!collapsed && groupOpen && <div className="nav-group__children">{children.map((child) => <NavLink key={child.to} to={child.to} className={({ isActive }) => `nav-link nav-link--child ${isActive || isPathActive(location.pathname, child.to) ? 'nav-link--active' : ''}`} onClick={onClose}>{child.label}</NavLink>)}</div>}
    </div>
  }

  return <>
    {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
      <div className="sidebar__top">
        <div className="profile"><div className="avatar">AM</div>{!collapsed && <div className="profile__copy"><strong>Apex Manager MV...</strong><span>Customer Manager</span></div>}</div>
        <button className="icon-button sidebar__collapse" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
        <button className="icon-button sidebar__close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
      </div>

      <nav className="sidebar__nav" aria-label="Primary navigation">
        <NavLink to="/home" className={`nav-link ${location.pathname === '/home' || location.pathname === '/' ? 'nav-link--active' : ''}`} title={collapsed ? 'Home' : undefined} onClick={onClose}><HomeIcon size={19} strokeWidth={1.8} />{!collapsed && <span>Home</span>}</NavLink>

        {renderGroup(navigationGroups[0])}

        <NavLink to="/scan" className={`nav-link ${isPathActive(location.pathname, '/scan') ? 'nav-link--active' : ''}`} title={collapsed ? 'Scan Items' : undefined} onClick={onClose}><ScanLine size={19} strokeWidth={1.8} />{!collapsed && <span>Scan Items</span>}</NavLink>
        {navigationGroups.slice(1).map(renderGroup)}
        <NavLink to="/settings" className={`nav-link ${isPathActive(location.pathname, '/settings') ? 'nav-link--active' : ''}`} title={collapsed ? 'Settings' : undefined} onClick={onClose}><Settings size={19} strokeWidth={1.8} />{!collapsed && <span>Settings</span>}</NavLink>
      </nav>

      <div className="sidebar__footer"><button className="nav-link nav-link--logout" title={collapsed ? 'Logout' : undefined}><LogOut size={19} strokeWidth={1.8} />{!collapsed && <span>Logout</span>}</button></div>
    </aside>
  </>
}
