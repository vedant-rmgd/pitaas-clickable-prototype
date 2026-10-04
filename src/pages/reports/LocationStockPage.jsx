import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocationStockOverview } from '../../components/reports/LocationStockOverview'
import { LocationItemsTable } from '../../components/reports/LocationItemsTable'
import { StockByBatch } from '../../components/reports/StockByBatch'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { LocationTypeBadge } from '../../components/location/LocationTypeBadge'
import { Select } from '../../components/ui/Select'
import { batches } from '../../data/batches'
import { locations, locationTypes } from '../../data/locations'
import { qrItems } from '../../data/qrItems'

const emptyCounts = { caps: 0, sleeves: 0, pallets: 0, total: 0 }

function getItemTypeKey(type) {
  if (type === 'Cap') return 'caps'
  if (type === 'Sleeve') return 'sleeves'
  return 'pallets'
}

export function LocationStockPage() {
  const navigate = useNavigate()
  const [selectedLocationId, setSelectedLocationId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const activeLocations = locations.filter((location) => location.status === 'Active')
  const selectedLocation = activeLocations.find((location) => location.id === selectedLocationId)
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredLocations = activeLocations.filter((location) => {
    const matchesSearch = !normalizedSearch || `${location.name} ${location.organization} ${location.city}`.toLowerCase().includes(normalizedSearch)
    const matchesType = !selectedType || location.type === selectedType
    return matchesSearch && matchesType
  })
  const locationItems = qrItems.filter((item) => item.currentLocationId === selectedLocationId)
  const counts = selectedLocation ? locationItems.reduce((current, item) => {
    const key = getItemTypeKey(item.type)
    return { ...current, [key]: current[key] + 1, total: current.total + 1 }
  }, emptyCounts) : emptyCounts
  const groups = locationItems.reduce((current, item) => {
    const row = current[item.batchId] ?? { batchId: item.batchId, caps: 0, sleeves: 0, pallets: 0, total: 0 }
    const key = getItemTypeKey(item.type)
    row[key] += 1
    row.total += 1
    current[item.batchId] = row
    return current
  }, {})
  const batchRows = Object.values(groups).map((row) => {
    const batch = batches.find((item) => item.id === row.batchId)
    return { ...row, batchName: batch?.batchName ?? row.batchId, receivedDate: batch?.createdDate }
  })

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Reports / Warehouse Stock"
      title="Warehouse Stock"
      subtitle="Select a warehouse to view the Universal Packaging items currently present there."
    />

    {!selectedLocation ? <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-(--text)">Available Warehouses</h2>
            <p className="mt-1 text-sm text-(--text-muted)">Choose where you want to view current stock.</p>
          </div>
          <span className="text-xs font-semibold text-(--text-muted)">{filteredLocations.length} {filteredLocations.length === 1 ? 'warehouse' : 'warehouses'}</span>
        </div>
      </div>
      <div className="grid gap-3 border-b border-(--border) bg-(--surface-muted) p-5 sm:grid-cols-2 sm:p-6">
        <Input label="Search" placeholder="Search warehouses by name, organization, or location..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <Select label="Type" value={selectedType} onChange={(event) => setSelectedType(event.target.value)} options={[{ value: '', label: 'All Warehouses' }, ...locationTypes.map((type) => ({ value: type, label: type }))]} />
      </div>
      {filteredLocations.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
        <p className="text-sm font-semibold text-(--text)">{activeLocations.length === 0 ? 'No warehouses found.' : 'No matching warehouses found.'}</p>
        <p className="mt-1 text-sm text-(--text-muted)">{activeLocations.length === 0 ? 'Create an active location to view warehouse stock.' : 'Try changing your warehouse name, organization, location, or type filter.'}</p>
      </div> : <div className="grid gap-3 p-5 sm:p-6">
        {filteredLocations.map((location) => <button key={location.id} type="button" className="flex min-w-0 flex-col items-start gap-2 rounded-lg border border-(--border) bg-white p-4 text-left transition hover:border-amber-300 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200" onClick={() => setSelectedLocationId(location.id)}>
          <div className="flex w-full min-w-0 items-start justify-between gap-3">
            <span className="truncate text-sm font-semibold text-(--text)">{location.name}</span>
            <LocationTypeBadge type={location.type} />
          </div>
          <span className="text-xs text-(--text-muted)">Location: {location.city}</span>
        </button>)}
      </div>}
    </Card> : locationItems.length === 0 ? <>
      <LocationStockOverview location={selectedLocation} counts={counts} onChangeLocation={() => setSelectedLocationId('')} />
      <Card className="mt-5 border-dashed text-center">
        <p className="text-sm font-semibold text-(--text)">No items currently at this warehouse.</p>
        <p className="mt-1 text-sm text-(--text-muted)">Items will appear here after they are In Scanned into this warehouse.</p>
      </Card>
    </> : <div className="flex flex-col gap-5">
      <LocationStockOverview location={selectedLocation} counts={counts} onChangeLocation={() => setSelectedLocationId('')} />
      <StockByBatch rows={batchRows} onBatchClick={(batchId) => navigate(`/universal-sets/batches/${batchId}`)} />
      <LocationItemsTable items={locationItems} batches={batches} />
    </div>}
  </PageContainer>
}
