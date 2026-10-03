import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { scanTypeLabels } from './scanUtils'

function SummaryField({ label, value }) {
  return <div>
    <p className="text-xs font-medium text-(--text-muted)">{label}</p>
    <p className="mt-1 text-sm font-semibold text-(--text)">{value}</p>
  </div>
}

export function InScanReview({ batch, expectedFrom, receivingLocation, expectedItems, scannedItems, missingItems, expectedCounts, scannedCounts, canConfirm, onConfirm }) {
  const remaining = missingItems.length

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Review In Scan</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Review the received items before confirming this incoming movement.</p>
    </div>
    <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
      <SummaryField label="Batch" value={batch?.batchName ?? 'Not selected'} />
      <SummaryField label="Coming From" value={expectedFrom?.name ?? 'Not selected'} />
      <SummaryField label="Arriving At" value={receivingLocation?.name ?? 'Not selected'} />
      <SummaryField label="Expected Items" value={`${expectedItems.length} ${expectedItems.length === 1 ? 'item' : 'items'}`} />
      <SummaryField label="Scanned Items" value={`${scannedItems.length} ${scannedItems.length === 1 ? 'item' : 'items'}`} />
      <SummaryField label="Not Scanned Items" value={`${remaining} ${remaining === 1 ? 'item' : 'items'}`} />
      <div className="flex flex-wrap items-center gap-2 border-t border-(--border) pt-4 sm:col-span-2">
        <span className="text-xs font-medium text-(--text-muted)">Item breakdown:</span>
        {Object.entries(scanTypeLabels).map(([type, label]) => <Badge key={type} tone="neutral">{label}: {scannedCounts[type] ?? 0} / {expectedCounts[type] ?? 0}</Badge>)}
      </div>
    </div>
    <div className="flex flex-col gap-3 border-t border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-start gap-2 text-xs text-(--text-muted)">
        <Badge tone={canConfirm ? remaining === 0 ? 'success' : 'warning' : 'neutral'}>{canConfirm ? remaining === 0 ? 'Ready to confirm' : 'Partial arrival' : 'Incomplete'}</Badge>
        <span>{canConfirm ? remaining === 0 ? 'All expected items will be received.' : `${remaining} expected ${remaining === 1 ? 'item remains' : 'items remain'} in transit.` : 'Select a movement and scan at least one item.'}</span>
      </div>
      <Button disabled={!canConfirm} onClick={onConfirm}>Confirm In Scan</Button>
    </div>
  </Card>
}
