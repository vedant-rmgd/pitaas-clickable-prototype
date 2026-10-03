import { Navigate, Route, Routes } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'
import { HomePage } from '../pages/HomePage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { SuppliersPage } from '../pages/SuppliersPage'
import { NewArrivalPage } from '../pages/universalSets/NewArrivalPage'
import { BatchesPage } from '../pages/universalSets/BatchesPage'
import { BatchDetailPage } from '../pages/universalSets/BatchDetailPage'
import { ScanItemsPage } from '../pages/scan/ScanItemsPage'
import { LocationsPage } from '../pages/setup/LocationsPage'
import { LocationStockPage } from '../pages/reports/LocationStockPage'

export function AppRoutes() {
  return <Routes>
    <Route element={<CustomerLayout />}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/universal-sets/new-arrival" element={<NewArrivalPage />} />
      <Route path="/universal-sets/batches" element={<BatchesPage />} />
      <Route path="/universal-sets/batches/:batchId" element={<BatchDetailPage />} />
      <Route path="/scan" element={<ScanItemsPage />} />
      <Route path="/reports/batch-tracking" element={<PlaceholderPage title="Batch Tracking" subtitle="This page will be implemented in a later task." />} />
      <Route path="/reports/location-stock" element={<LocationStockPage />} />
      <Route path="/reports/reconciliation" element={<PlaceholderPage title="Reconciliation" subtitle="This page will be implemented in a later task." />} />
      <Route path="/setup/locations" element={<LocationsPage />} />
      <Route path="/setup/suppliers" element={<SuppliersPage />} />
      <Route path="/settings" element={<PlaceholderPage title="Settings" subtitle="This page will be implemented in a later task." />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Route>
  </Routes>
}
