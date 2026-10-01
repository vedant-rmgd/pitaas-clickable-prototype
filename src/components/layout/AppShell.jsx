import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'

export function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return <div className="app-shell">
    <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    <div className="app-main">
      <header className="mobile-header"><button className="icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button><span>PiTaaS</span><div className="avatar avatar--small">AM</div></header>
      <main>{children}</main>
    </div>
  </div>
}
