import { Navigate, Route, Routes } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'
import { HomePage } from '../pages/HomePage'
import { SuppliersPage } from '../pages/setup/SuppliersPage'
import { NewArrivalPage } from '../pages/universalSets/NewArrivalPage'
import { BatchesPage } from '../pages/universalSets/BatchesPage'
import { BatchDetailPage } from '../pages/universalSets/BatchDetailPage'
import { ScanItemsPage } from '../pages/scan/ScanItemsPage'
import { LocationsPage } from '../pages/setup/LocationsPage'
import { LocationStockPage } from '../pages/reports/LocationStockPage'
import { ReconciliationPage } from '../pages/reports/ReconciliationPage'
import { SettingsPage } from '../pages/SettingsPage'

export function AppRoutes() {
  return <Routes>
    <Route element={<CustomerLayout />}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/universal-sets/new-arrival" element={<NewArrivalPage />} />
      <Route path="/universal-sets/batches" element={<BatchesPage />} />
      <Route path="/universal-sets/batches/:batchId" element={<BatchDetailPage />} />
      <Route path="/scan" element={<ScanItemsPage />} />
      <Route path="/reports/location-stock" element={<LocationStockPage />} />
      <Route path="/reports/reconciliation" element={<ReconciliationPage />} />
      <Route path="/setup/locations" element={<LocationsPage />} />
      <Route path="/setup/suppliers" element={<SuppliersPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Route>
  </Routes>
}
