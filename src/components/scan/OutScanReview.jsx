import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function OutScanReview({ batch, fromLocation, destination, items, canConfirm, onConfirm }) {
  const counts = items.reduce((summary, item) => ({ ...summary, [item.type]: (summary[item.type] ?? 0) + 1 }), {})

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Review Out Scan</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Review what is leaving its current location before confirming.</p>
    </div>
    <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
      <div><p className="text-xs font-medium text-(--text-muted)">Batch</p><p className="mt-1 text-sm font-semibold text-(--text)">{batch?.batchName ?? 'Not selected'}</p></div>
      <div><p className="text-xs font-medium text-(--text-muted)">Items</p><p className="mt-1 text-sm font-semibold text-(--text)">{items.length}</p></div>
      <div><p className="text-xs font-medium text-(--text-muted)">From</p><p className="mt-1 text-sm font-semibold text-(--text)">{fromLocation?.name ?? 'Not selected'}</p></div>
      <div><p className="text-xs font-medium text-(--text-muted)">Destination</p><p className="mt-1 text-sm font-semibold text-(--text)">{destination?.name ?? 'Not selected'}</p></div>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-2 border-t border-(--border) pt-4">
        <span className="text-xs font-medium text-(--text-muted)">Breakdown:</span>
        {Object.entries(counts).length > 0 ? Object.entries(counts).map(([type, count]) => <Badge key={type} tone="neutral">{type}s: {count}</Badge>) : <span className="text-xs text-(--text-muted)">No items scanned yet.</span>}
      </div>
    </div>
    <div className="flex flex-col gap-3 border-t border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-2 text-xs text-(--text-muted)">
        <Badge tone={canConfirm ? 'info' : 'neutral'}>{canConfirm ? 'Ready to confirm' : 'Incomplete'}</Badge>
        <span>{canConfirm ? 'Items will be marked In Transit.' : 'Select the movement details and scan at least one item.'}</span>
      </div>
      <Button disabled={!canConfirm} onClick={onConfirm}>Confirm Out Scan</Button>
    </div>
  </Card>
}
