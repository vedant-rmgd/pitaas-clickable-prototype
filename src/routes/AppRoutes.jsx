import { Route, Routes } from 'react-router-dom'
import { CustomerLayout } from '../layouts/CustomerLayout'
import { AssetDetailPage } from '../pages/AssetDetailPage'
import { AssetsPage } from '../pages/AssetsPage'
import { AuditDetailPage } from '../pages/AuditDetailPage'
import { AuditsPage } from '../pages/AuditsPage'
import { ChangePasswordPage } from '../pages/ChangePasswordPage'
import { CostCentersPage } from '../pages/CostCentersPage'
import { HomePage } from '../pages/HomePage'
import { InventoryPage } from '../pages/InventoryPage'
import { ItemDetailPage } from '../pages/ItemDetailPage'
import { ItemsPage } from '../pages/ItemsPage'
import { ItemsPerWarehousePage } from '../pages/ItemsPerWarehousePage'
import { FeaturesAddonsPage } from '../pages/FeaturesAddonsPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { StockCorrectionsPage } from '../pages/StockCorrectionsPage'
import { StockMovementsPage } from '../pages/StockMovementsPage'
import { NewStockMovementPage } from '../pages/NewStockMovementPage'
import { SuppliersPage } from '../pages/SuppliersPage'
import { WarehouseDetailPage } from '../pages/WarehouseDetailPage'
import { WarehousesPage } from '../pages/WarehousesPage'
import { UomsPage } from '../pages/UomsPage'

export function AppRoutes() {
  return <Routes>
    <Route element={<CustomerLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/items" element={<ItemsPage />} />
      <Route path="/items/:itemCode" element={<ItemDetailPage />} />
      <Route path="/assets" element={<AssetsPage />} />
      <Route path="/assets/:name" element={<AssetDetailPage />} />
      <Route path="/am/assets" element={<AssetsPage />} />
      <Route path="/am/assets/:name" element={<AssetDetailPage />} />
      <Route path="/audits" element={<AuditsPage />} />
      <Route path="/audits/:id" element={<AuditDetailPage />} />
      <Route path="/inventory/audits" element={<AuditsPage />} />
      <Route path="/inventory/audits/:id" element={<AuditDetailPage />} />
      <Route path="/warehouses" element={<WarehousesPage />} />
      <Route path="/warehouses/:warehouse" element={<WarehouseDetailPage />} />
      <Route path="/inventory/warehouses" element={<WarehousesPage />} />
      <Route path="/inventory/warehouses/:warehouse" element={<WarehouseDetailPage />} />
      <Route path="/inventory/stock-entries/new" element={<NewStockMovementPage />} />
      <Route path="/inventory/stock-entries" element={<StockMovementsPage />} />
      <Route path="/inventory/stock-adjustments" element={<StockCorrectionsPage />} />
      <Route path="/reports/items-per-warehouse" element={<ItemsPerWarehousePage />} />
      <Route path="/addons" element={<FeaturesAddonsPage />} />
      <Route path="/settings/change-password" element={<ChangePasswordPage />} />
      <Route path="/master-data/cost-centers" element={<CostCentersPage />} />
      <Route path="/master-data/suppliers" element={<SuppliersPage />} />
      <Route path="/master-data/uoms" element={<UomsPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="*" element={<PlaceholderPage title="Coming soon" subtitle="This part of the Customer app is not in the prototype foundation yet." />} />
    </Route>
  </Routes>
}
