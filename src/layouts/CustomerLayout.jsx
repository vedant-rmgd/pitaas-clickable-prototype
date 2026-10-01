import { Outlet } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'

export function CustomerLayout() {
  return <AppShell><Outlet /></AppShell>
}
