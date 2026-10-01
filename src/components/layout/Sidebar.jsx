import { useState } from 'react'
import {
  Archive,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Database,
  FileChartColumn,
  Home as HomeIcon,
  LogOut,
  Package,
  Puzzle,
  Settings,
  ShieldCheck,
  Warehouse,
  X,
} from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Assets', to: '/assets', icon: Archive },
  { label: 'Audits', to: '/audits', icon: ShieldCheck },
  { label: 'Warehouses', to: '/warehouses', icon: Warehouse },
  { label: 'Reports', to: '/reports/items-per-warehouse', icon: FileChartColumn },
]

export function Sidebar({ collapsed, onToggle, mobileOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [inventoryOpen, setInventoryOpen] = useState(true)
  const [masterDataOpen, setMasterDataOpen] = useState(false)
  const isInventoryActive = location.pathname.startsWith('/items') || location.pathname.startsWith('/inventory')
  const isMasterDataActive = location.pathname.startsWith('/master-data')
  const isAssetActive = location.pathname.startsWith('/assets') || location.pathname.startsWith('/am/assets')
  const isAuditActive = location.pathname.startsWith('/audits') || location.pathname.startsWith('/inventory/audits')
  const isWarehouseActive = location.pathname.startsWith('/warehouses') || location.pathname.startsWith('/inventory/warehouses')

  return <>
    {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
      <div className="sidebar__top">
        <div className="profile"><div className="avatar">AM</div>{!collapsed && <div className="profile__copy"><strong>Apex Manager MV...</strong><span>Customer Manager</span></div>}</div>
        <button className="icon-button sidebar__collapse" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
        <button className="icon-button sidebar__close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button>
      </div>

      <nav className="sidebar__nav" aria-label="Primary navigation">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} title={collapsed ? 'Home' : undefined} onClick={onClose}><HomeIcon size={19} strokeWidth={1.8} />{!collapsed && <span>Home</span>}</NavLink>

        <div className={`nav-group ${isInventoryActive ? 'nav-group--active' : ''}`}>
          <button type="button" className={`nav-link nav-group__trigger ${isInventoryActive ? 'nav-link--active' : ''}`} title={collapsed ? 'Inventory' : undefined} aria-expanded={inventoryOpen} onClick={() => { navigate('/inventory'); setInventoryOpen(true); if (collapsed) onToggle() }}><Package size={19} strokeWidth={1.8} />{!collapsed && <span>Inventory</span>}{!collapsed && (inventoryOpen ? <ChevronUp className="nav-group__chevron" size={17} /> : <ChevronDown className="nav-group__chevron" size={17} />)}</button>
          {!collapsed && inventoryOpen && <div className="nav-group__children">
            <NavLink to="/items" className={({ isActive }) => `nav-link nav-link--child ${isActive ? 'nav-link--active' : ''}`} onClick={onClose}>Items</NavLink>
            <NavLink to="/inventory/stock-entries" className={({ isActive }) => `nav-link nav-link--child ${isActive ? 'nav-link--active' : ''}`} onClick={onClose}>Stock Movements</NavLink>
            <NavLink to="/inventory/stock-adjustments" className={({ isActive }) => `nav-link nav-link--child ${isActive ? 'nav-link--active' : ''}`} onClick={onClose}>Stock Adjustments</NavLink>
          </div>}
        </div>

        {navItems.map(({ label, to, icon: Icon }) => <NavLink key={label} to={to} className={({ isActive }) => `nav-link ${(isActive || (label === 'Assets' && isAssetActive) || (label === 'Audits' && isAuditActive) || (label === 'Warehouses' && isWarehouseActive)) ? 'nav-link--active' : ''}`} title={collapsed ? label : undefined} onClick={onClose}><Icon size={19} strokeWidth={1.8} />{!collapsed && <span>{label}</span>}</NavLink>)}

        <div className="sidebar__utilities">
          {!collapsed && <div className="sidebar__section-label">Utilities</div>}
          <NavLink to="/addons" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} title={collapsed ? 'Modules' : undefined} onClick={onClose}><Puzzle size={19} strokeWidth={1.8} />{!collapsed && <span>Modules</span>}</NavLink>
          <NavLink to="/settings/change-password" className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`} title={collapsed ? 'Settings' : undefined} onClick={onClose}><Settings size={19} strokeWidth={1.8} />{!collapsed && <span>Settings</span>}</NavLink>
          <div className={`nav-group ${isMasterDataActive ? 'nav-group--active' : ''}`}>
            <button type="button" className={`nav-link nav-group__trigger ${isMasterDataActive ? 'nav-link--active' : ''}`} title={collapsed ? 'Master Data' : undefined} aria-expanded={masterDataOpen} onClick={() => { if (collapsed) { onToggle(); setMasterDataOpen(true) } else setMasterDataOpen((open) => !open) }}><Database size={19} strokeWidth={1.8} />{!collapsed && <span>Master Data</span>}{!collapsed && (masterDataOpen ? <ChevronUp className="nav-group__chevron" size={17} /> : <ChevronDown className="nav-group__chevron" size={17} />)}</button>
            {!collapsed && masterDataOpen && <div className="nav-group__children"><NavLink to="/master-data/cost-centers" className={({ isActive }) => `nav-link nav-link--child ${isActive ? 'nav-link--active' : ''}`} onClick={onClose}>Cost Centers</NavLink><NavLink to="/master-data/suppliers" className={({ isActive }) => `nav-link nav-link--child ${isActive ? 'nav-link--active' : ''}`} onClick={onClose}>Suppliers</NavLink><NavLink to="/master-data/uoms" className={({ isActive }) => `nav-link nav-link--child ${isActive ? 'nav-link--active' : ''}`} onClick={onClose}>UoM</NavLink></div>}
          </div>
        </div>
      </nav>

      <div className="sidebar__footer"><button className="nav-link nav-link--logout" title={collapsed ? 'Logout' : undefined}><LogOut size={19} strokeWidth={1.8} />{!collapsed && <span>Logout</span>}</button></div>
    </aside>
  </>
}
