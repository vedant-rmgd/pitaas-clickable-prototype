import { useMemo, useState } from 'react'
import { MapPin, Package } from 'lucide-react'
import { batches } from '../../data/batches'
import { locations } from '../../data/locations'
import { qrItems } from '../../data/qrItems'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { OutScanReview } from './OutScanReview'
import { QrScanner } from './QrScanner'
import { ScannedItemsList } from './ScannedItemsList'
import { getLocationName } from '../../utils/locationHelpers'

function FieldSelect({ label, value, onChange, children, disabled = false }) {
  return <label className="flex flex-col gap-1.5">
    <span className="text-xs font-semibold text-(--text)">{label}</span>
    <select value={value} onChange={onChange} disabled={disabled} className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none transition hover:border-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50">
      {children}
    </select>
  </label>
}

export function OutScanForm({ onDone }) {
  const [selectedBatchId, setSelectedBatchId] = useState('')
  const [fromLocationId, setFromLocationId] = useState('')
  const [destinationLocationId, setDestinationLocationId] = useState('')
  const [scannedQrIds, setScannedQrIds] = useState([])
  const [destinationError, setDestinationError] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const selectedBatch = batches.find((batch) => batch.id === selectedBatchId)
  const validFromLocationIds = selectedBatch?.locationDistribution.filter((location) => location.itemCount > 0).map((location) => location.locationId) ?? []
  const batchItems = useMemo(() => qrItems.filter((item) => item.batchId === selectedBatchId), [selectedBatchId])
  const fromLocation = locations.find((location) => location.id === fromLocationId)
  const destination = locations.find((location) => location.id === destinationLocationId)
  const scannedItems = scannedQrIds.map((qrId) => qrItems.find((item) => item.qrId === qrId)).filter(Boolean)
  const availableDemoQrIds = batchItems.filter((item) => item.currentLocationId === fromLocationId && !scannedQrIds.includes(item.qrId)).map((item) => item.qrId)
  const hasMovementDetails = Boolean(selectedBatchId && fromLocationId && destinationLocationId && fromLocationId !== destinationLocationId)
  const canConfirm = hasMovementDetails && scannedItems.length > 0 && !isConfirmed

  const batchStatusSummary = selectedBatch ? `${selectedBatch.totalItems} items · ${selectedBatch.locationCount} locations · ${selectedBatch.status}` : ''

  const resetScanSession = () => {
    setScannedQrIds([])
    setIsConfirmed(false)
    setDestinationError('')
  }

  const handleBatchChange = (event) => {
    setSelectedBatchId(event.target.value)
    setFromLocationId('')
    setDestinationLocationId('')
    resetScanSession()
  }

  const handleFromLocationChange = (event) => {
    const nextLocationId = event.target.value
    setFromLocationId(nextLocationId)
    if (destinationLocationId === nextLocationId) setDestinationLocationId('')
    setDestinationError('')
    resetScanSession()
  }

  const handleDestinationChange = (event) => {
    const nextLocationId = event.target.value
    if (nextLocationId === fromLocationId) {
      setDestinationError('Destination must be different from the current location.')
      return
    }
    setDestinationLocationId(nextLocationId)
    setDestinationError('')
    setIsConfirmed(false)
  }

  const handleScan = (rawQrId) => {
    const qrId = rawQrId.trim().toUpperCase()
    if (!qrId) return { success: false, error: 'Enter a QR ID before scanning.' }
    if (scannedQrIds.includes(qrId)) return { success: false, error: `${qrId} has already been scanned.` }

    const item = qrItems.find((candidate) => candidate.qrId.toUpperCase() === qrId)
    if (!item) return { success: false, error: `${qrId} was not found.` }
    if (item.batchId !== selectedBatchId) return { success: false, error: `${qrId} does not belong to the selected batch.` }
    if (item.currentLocationId !== fromLocationId) return { success: false, error: `${qrId} is currently at ${getLocationName(item.currentLocationId, item.currentLocationName)}, not ${fromLocation?.name ?? 'the selected location'}.` }

    setScannedQrIds((current) => [...current, item.qrId])
    setIsConfirmed(false)
    return { success: true }
  }

  const handleConfirm = () => {
    if (!canConfirm) return
    setIsConfirmed(true)
  }

  return <div className="flex flex-col gap-5">
    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-(--primary)" aria-hidden="true" />
          <h2 className="text-base font-semibold text-(--text)">Movement Details</h2>
        </div>
        <p className="mt-1 text-sm text-(--text-muted)">Choose the batch and locations for this outgoing movement.</p>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
        <FieldSelect label="Batch" value={selectedBatchId} onChange={handleBatchChange}>
          <option value="">Select batch</option>
          {batches.map((batch) => <option key={batch.id} value={batch.id}>{batch.batchName}</option>)}
        </FieldSelect>
        <FieldSelect label="From Location" value={fromLocationId} onChange={handleFromLocationChange} disabled={!selectedBatchId}>
          <option value="">Select current location</option>
          {validFromLocationIds.map((locationId) => {
            const location = locations.find((item) => item.id === locationId)
            return location && <option key={location.id} value={location.id}>{location.name}</option>
          })}
        </FieldSelect>
        <FieldSelect label="Destination" value={destinationLocationId} onChange={handleDestinationChange} disabled={!fromLocationId}>
          <option value="">Select destination</option>
          {locations.filter((location) => location.id !== fromLocationId).map((location) => <option key={location.id} value={location.id}>{location.name}</option>)}
        </FieldSelect>
        {destinationError && <p className="text-xs font-medium text-(--danger) sm:col-span-3" role="alert">{destinationError}</p>}
      </div>
      {selectedBatch && <div className="flex flex-col gap-2 border-t border-(--border) bg-(--surface-muted) px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span className="text-sm font-semibold text-(--text)">{selectedBatch.batchName}</span>
        <span className="text-xs text-(--text-muted)">{batchStatusSummary}</span>
      </div>}
    </Card>

    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-(--primary)" aria-hidden="true" />
          <h2 className="text-base font-semibold text-(--text)">Scan QR Items</h2>
        </div>
        <p className="mt-1 text-sm text-(--text-muted)">Scan the exact items leaving {fromLocation?.name ?? 'the current location'}.</p>
      </div>
      <div className="p-5 sm:p-6">
        <QrScanner demoQrIds={availableDemoQrIds} disabled={!hasMovementDetails} onScan={handleScan} helperText={hasMovementDetails ? 'Scan each item that is leaving this location. Items will be marked In Transit after confirmation.' : 'Select a batch, From Location, and Destination before scanning.'} />
        {selectedBatch && <p className="mt-3 text-xs text-(--text-muted)">{batchItems.length} registered items are available in the selected batch.</p>}
      </div>
    </Card>

    <ScannedItemsList items={scannedItems.map((item) => ({ ...item, batchName: selectedBatch?.batchName ?? '' }))} onRemove={(qrId) => {
      setScannedQrIds((current) => current.filter((id) => id !== qrId))
      setIsConfirmed(false)
    }} />

    {!isConfirmed ? <OutScanReview batch={selectedBatch} fromLocation={fromLocation} destination={destination} items={scannedItems} canConfirm={canConfirm} onConfirm={handleConfirm} /> : <Card className="border-green-200 bg-green-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge tone="success">Out Scan completed</Badge>
          <h2 className="mt-3 text-base font-semibold text-green-900">{scannedItems.length} {scannedItems.length === 1 ? 'item is' : 'items are'} now In Transit</h2>
          <p className="mt-1 text-sm leading-5 text-green-800">The selected items are moving from {fromLocation.name} to {destination.name}.</p>
          <p className="mt-3 text-xs text-green-700">Previous Location: {fromLocation.name} · Last Scan: Out Scan</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={resetScanSession}>Scan More Items</Button>
          <Button onClick={onDone}>Done</Button>
        </div>
      </div>
    </Card>}
  </div>
}
