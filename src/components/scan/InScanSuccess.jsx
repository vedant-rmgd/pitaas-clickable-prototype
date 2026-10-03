import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { getLocationName } from '../../utils/locationHelpers'

function StatusRow({ item, status, location, destination }) {
  return <div className="flex flex-col gap-2 border-t border-(--border) px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-(--text)">{item.qrId}</p>
      <p className="mt-1 text-xs text-(--text-muted)">{item.type} · {location}</p>
    </div>
    <div className="text-left sm:text-right">
      <p className="text-xs font-semibold text-(--text)">{status}</p>
      <p className="mt-1 text-xs text-(--text-muted)">{destination ? `Destination: ${destination}` : 'Last Scan: In Scan'}</p>
    </div>
  </div>
}

export function InScanSuccess({ receivingLocation, scannedItems, missingItems, onScanMore, onDone }) {
  const receivedCount = scannedItems.length
  const missingCount = missingItems.length

  return <Card className="border-green-200 bg-green-50">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Badge tone="success">In Scan completed</Badge>
        <h2 className="mt-3 text-base font-semibold text-green-900">{receivedCount} {receivedCount === 1 ? 'item was' : 'items were'} received at {receivingLocation?.name ?? 'the receiving location'}.</h2>
        {missingCount > 0 && <p className="mt-1 text-sm leading-5 text-amber-800">{missingCount} expected {missingCount === 1 ? 'item was' : 'items were'} not scanned and remain In Transit.</p>}
        {missingCount === 0 && <p className="mt-1 text-sm leading-5 text-green-800">All expected items were scanned and received.</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={onScanMore}>Scan More Items</Button>
        <Button onClick={onDone}>Done</Button>
      </div>
    </div>

    <div className="mt-5 overflow-hidden rounded-lg border border-green-200 bg-white">
      <div className="border-b border-(--border) px-4 py-3">
        <h3 className="text-sm font-semibold text-(--text)">Simulated item status</h3>
        <p className="mt-1 text-xs text-(--text-muted)">Scanned items are shown at the receiving location for this demo session.</p>
      </div>
      {scannedItems.map((item) => <StatusRow key={item.qrId} item={item} status="At Receiving Location" location={receivingLocation?.name ?? 'Receiving location'} />)}
      {missingItems.map((item) => <StatusRow key={item.qrId} item={item} status="In Transit" location={getLocationName(item.currentLocationId, item.currentLocationName)} destination={receivingLocation?.name ?? 'Receiving location'} />)}
    </div>
  </Card>
}
