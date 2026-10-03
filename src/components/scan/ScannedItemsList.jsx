import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { getLocationName } from '../../utils/locationHelpers'

export function ScannedItemsList({ items, onRemove, mode = 'out' }) {
  const isInScan = mode === 'in'
  const counts = items.reduce((summary, item) => ({ ...summary, [item.type]: (summary[item.type] ?? 0) + 1 }), {})

  return <Card className="!p-0 !overflow-hidden">
    <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-base font-semibold text-(--text)">{isInScan ? 'Received Items' : 'Scanned Items'}</h2>
        <p className="mt-1 text-sm text-(--text-muted)">{isInScan ? 'Items accepted for this In Scan movement.' : 'Items selected for this Out Scan movement.'}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="info">Scanned Items: {items.length}</Badge>
        {Object.entries(counts).map(([type, count]) => <Badge key={type} tone="neutral">{type}s: {count}</Badge>)}
      </div>
    </div>
    {items.length === 0 ? <div className="px-5 py-8 text-sm text-(--text-muted) sm:px-6">No QR items scanned yet.</div> : <div className="max-h-96 overflow-auto">
      <table className="min-w-200 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="sticky top-0 z-10 bg-(--surface-muted) text-xs uppercase tracking-wide text-(--text-muted)">
            <th scope="col" className="px-5 py-3 font-semibold">QR ID</th>
            <th scope="col" className="px-5 py-3 font-semibold">Type</th>
            <th scope="col" className="px-5 py-3 font-semibold">{isInScan ? 'Batch' : 'Current Location'}</th>
            <th scope="col" className="px-5 py-3 font-semibold">{isInScan ? 'Expected From' : 'Batch'}</th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => <tr key={item.qrId} className="border-t border-(--border)">
            <td className="px-5 py-3.5 font-semibold text-(--text)">{item.qrId}</td>
            <td className="px-5 py-3.5 text-(--text-muted)">{item.type}</td>
            <td className="px-5 py-3.5 text-(--text-muted)">{isInScan ? item.batchName : getLocationName(item.currentLocationId, item.currentLocationName)}</td>
            <td className="px-5 py-3.5 text-(--text-muted)">{isInScan ? item.expectedFromName : item.batchName}</td>
            <td className="px-5 py-3.5 text-right"><button type="button" className="text-xs font-semibold text-(--danger) hover:text-red-700" onClick={() => onRemove(item.qrId)}>Remove</button></td>
          </tr>)}
        </tbody>
      </table>
    </div>}
  </Card>
}
