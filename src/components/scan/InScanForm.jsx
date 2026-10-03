import { useMemo, useState } from 'react'
import { ArrowRight, MapPin, Package } from 'lucide-react'
import { batches } from '../../data/batches'
import { movements } from '../../data/movements'
import { qrItems } from '../../data/qrItems'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Dialog } from '../ui/Dialog'
import { InScanExpectedSummary } from './InScanExpectedSummary'
import { InScanReview } from './InScanReview'
import { InScanSuccess } from './InScanSuccess'
import { MissingItemsList } from './MissingItemsList'
import { QrScanner } from './QrScanner'
import { ScannedItemsList } from './ScannedItemsList'
import { getTypeCounts } from './scanUtils'
import { getLocationById, getLocationName } from '../../utils/locationHelpers'

function FieldSelect({ label, value, onChange, children, disabled = false }) {
  return <label className="flex flex-col gap-1.5">
    <span className="text-xs font-semibold text-(--text)">{label}</span>
    <select value={value} onChange={onChange} disabled={disabled} className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none transition hover:border-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50">
      {children}
    </select>
  </label>
}

export function InScanForm({ onDone }) {
  const [selectedMovementId, setSelectedMovementId] = useState('')
  const [receivingLocationId, setReceivingLocationId] = useState('')
  const [scannedQrIds, setScannedQrIds] = useState([])
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)

  const pendingMovements = useMemo(() => movements.filter((movement) => movement.scanType === 'OUT' && movement.status === 'In Transit' && movement.itemQrIds?.length), [])
  const selectedMovement = pendingMovements.find((movement) => movement.id === selectedMovementId)
  const selectedBatch = batches.find((batch) => batch.id === selectedMovement?.batchId)
  const expectedItems = useMemo(() => selectedMovement?.itemQrIds.map((qrId) => qrItems.find((item) => item.qrId === qrId)).filter(Boolean) ?? [], [selectedMovement])
  const scannedItems = scannedQrIds.map((qrId) => qrItems.find((item) => item.qrId === qrId)).filter(Boolean).map((item) => ({
    ...item,
    batchName: selectedBatch?.batchName ?? item.batchId,
    expectedFromName: selectedMovement ? getLocationName(selectedMovement.fromLocationId, selectedMovement.fromLocation) : getLocationName(item.currentLocationId, item.currentLocationName),
  }))
  const missingItems = expectedItems.filter((item) => !scannedQrIds.includes(item.qrId)).map((item) => ({ ...item, batchName: selectedBatch?.batchName ?? item.batchId }))
  const receivingLocation = getLocationById(receivingLocationId)
  const expectedFrom = selectedMovement ? getLocationById(selectedMovement.fromLocationId) : null
  const availableDemoQrIds = missingItems.map((item) => item.qrId)
  const isScanComplete = Boolean(selectedMovement && expectedItems.length > 0 && scannedItems.length >= expectedItems.length)
  const expectedCounts = useMemo(() => getTypeCounts(expectedItems), [expectedItems])
  const scannedCounts = useMemo(() => getTypeCounts(scannedItems), [scannedItems])
  const canConfirm = Boolean(selectedMovement && receivingLocation && scannedItems.length > 0 && !isConfirmed)

  const handleMovementChange = (event) => {
    const movementId = event.target.value
    const movement = pendingMovements.find((candidate) => candidate.id === movementId)
    setSelectedMovementId(movementId)
    setReceivingLocationId(movement?.toLocationId ?? '')
    setScannedQrIds([])
    setIsConfirmed(false)
    setConfirmationOpen(false)
  }

  const handleScan = (rawQrId) => {
    const qrId = rawQrId.trim().toUpperCase()
    if (!qrId) return { success: false, error: 'Enter a QR ID before scanning.' }
    if (scannedQrIds.includes(qrId)) return { success: false, error: `${qrId} has already been scanned.` }

    const item = qrItems.find((candidate) => candidate.qrId.toUpperCase() === qrId)
    if (!item) return { success: false, error: `${qrId} was not found.` }
    if (!expectedItems.some((expectedItem) => expectedItem.qrId === item.qrId)) return { success: false, error: `${qrId} was not included in this incoming movement.` }

    setScannedQrIds((current) => [...current, item.qrId])
    setIsConfirmed(false)
    return { success: true }
  }

  const resetScanSession = () => {
    setSelectedMovementId('')
    setReceivingLocationId('')
    setScannedQrIds([])
    setIsConfirmed(false)
    setConfirmationOpen(false)
  }

  const handleDone = () => {
    resetScanSession()
    onDone?.()
  }

  return <div className="flex flex-col gap-5">
    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Package size={18} className="text-(--primary)" aria-hidden="true" />
          <h2 className="text-base font-semibold text-(--text)">Incoming Movement</h2>
        </div>
        <p className="mt-1 text-sm text-(--text-muted)">Select the pending movement that has arrived at a receiving location.</p>
      </div>
      <div className="p-5 sm:p-6">
        <FieldSelect label="Incoming Batch / Movement" value={selectedMovementId} onChange={handleMovementChange}>
          <option value="">Select incoming movement</option>
          {pendingMovements.map((movement) => {
            const batch = batches.find((candidate) => candidate.id === movement.batchId)
            const fromName = getLocationName(movement.fromLocationId, movement.fromLocation)
            const toName = getLocationName(movement.toLocationId, movement.toLocation)
            return <option key={movement.id} value={movement.id}>{batch?.batchName ?? movement.batchId} — {fromName} → {toName} ({movement.itemCount} items)</option>
          })}
        </FieldSelect>
        {selectedMovement && <div className="mt-4 flex flex-col gap-3 rounded-lg border border-(--border) bg-(--surface-muted) px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2 text-sm text-(--text)">
            <span className="truncate font-semibold">{selectedBatch?.batchName ?? selectedMovement.batchId}</span>
            <ArrowRight size={15} className="shrink-0 text-(--text-muted)" aria-hidden="true" />
            <span className="shrink-0 text-(--text-muted)">{selectedMovement.itemCount} expected items</span>
          </div>
          <Badge tone="warning">In Transit</Badge>
        </div>}
      </div>
    </Card>

    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-(--primary)" aria-hidden="true" />
          <h2 className="text-base font-semibold text-(--text)">Location Context</h2>
        </div>
        <p className="mt-1 text-sm text-(--text-muted)">The incoming movement already defines where the items are arriving from and to.</p>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <FieldSelect label="Arriving At" value={receivingLocationId} onChange={() => {}} disabled={!selectedMovement}>
          <option value="">Select receiving location</option>
          {receivingLocation && <option value={receivingLocation.id}>{receivingLocation.name}</option>}
        </FieldSelect>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-(--text)">Coming From</span>
          <div className="flex h-10 items-center rounded-lg border border-(--border) bg-(--surface-muted) px-3 text-sm text-(--text)">{expectedFrom?.name ?? selectedMovement?.fromLocation ?? 'Select an incoming movement'}</div>
        </div>
      </div>
    </Card>

    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-(--text)">Scan QR Items</h2>
        <p className="mt-1 text-sm text-(--text-muted)">Scan the items received for this incoming movement.</p>
      </div>
      <div className="p-5 sm:p-6">
        <QrScanner demoQrIds={availableDemoQrIds} disabled={!selectedMovement || isScanComplete} onScan={handleScan} helperText={isScanComplete ? 'All expected items have been scanned. Remove an item to scan it again.' : selectedMovement ? 'Scan each expected item. Items outside this movement will be rejected.' : 'Select an incoming movement before scanning.'} />
      </div>
    </Card>

    {!isConfirmed ? <>
      <ScannedItemsList items={scannedItems} mode="in" onRemove={(qrId) => {
        setScannedQrIds((current) => current.filter((id) => id !== qrId))
        setIsConfirmed(false)
      }} />
      <InScanExpectedSummary expectedItems={expectedItems} scannedItems={scannedItems} expectedCounts={expectedCounts} scannedCounts={scannedCounts} remaining={missingItems.length} />
      <MissingItemsList items={missingItems} hasMovement={Boolean(selectedMovement)} />
      <InScanReview
        batch={selectedBatch}
        expectedFrom={expectedFrom}
        receivingLocation={receivingLocation}
        expectedItems={expectedItems}
        scannedItems={scannedItems}
        missingItems={missingItems}
        expectedCounts={expectedCounts}
        scannedCounts={scannedCounts}
        canConfirm={canConfirm}
        onConfirm={() => setConfirmationOpen(true)}
      />
    </> : <InScanSuccess receivingLocation={receivingLocation} scannedItems={scannedItems} missingItems={missingItems} onScanMore={resetScanSession} onDone={handleDone} />}

    <Dialog
      open={confirmationOpen}
      onClose={() => setConfirmationOpen(false)}
      title="Confirm In Scan?"
      description="Confirm the items received at the selected location."
      footer={null}
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-(--border) bg-(--surface-muted) px-4 py-3 text-sm text-(--text)">
          <p className="font-semibold">{scannedItems.length} of {expectedItems.length} expected {expectedItems.length === 1 ? 'item has' : 'items have'} been scanned.</p>
          <p className="mt-1 text-xs text-(--text-muted)">Arriving At: {receivingLocation?.name ?? 'Not selected'}</p>
        </div>
        {missingItems.length > 0 ? <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-800">{missingItems.length} expected {missingItems.length === 1 ? 'item has' : 'items have'} not been scanned and will remain In Transit.</p> : <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">All expected items have been scanned.</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={() => setConfirmationOpen(false)}>Cancel</Button>
          <Button disabled={!canConfirm} onClick={() => {
            setIsConfirmed(true)
            setConfirmationOpen(false)
          }}>Confirm In Scan</Button>
        </div>
      </div>
    </Dialog>
  </div>
}
