import { Card } from '../ui/Card'
import { getTypeCounts, scanTypeLabels } from './scanUtils'

function Metric({ label, value, emphasis = false }) {
  return <div className={`rounded-lg border px-4 py-3 ${emphasis ? 'border-blue-200 bg-blue-50' : 'border-(--border) bg-(--surface-muted)'}`}>
    <p className="text-xs font-medium text-(--text-muted)">{label}</p>
    <p className={`mt-1 text-xl font-semibold ${emphasis ? 'text-blue-900' : 'text-(--text)'}`}>{value}</p>
  </div>
}

export function InScanExpectedSummary({ expectedItems, scannedItems, expectedCounts = getTypeCounts(expectedItems), scannedCounts = getTypeCounts(scannedItems), remaining = expectedItems.length - scannedItems.length }) {

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Expected vs Scanned</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Compare the incoming movement with the QR items received so far.</p>
    </div>
    {!expectedItems.length ? <div className="px-5 py-8 text-sm text-(--text-muted) sm:px-6">Select an incoming movement to see expected items.</div> : <div className="space-y-5 p-5 sm:p-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Expected" value={expectedItems.length} />
        <Metric label="Scanned" value={scannedItems.length} emphasis />
        <Metric label="Remaining" value={remaining} />
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">Item breakdown</h3>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {Object.entries(scanTypeLabels).map(([type, label]) => <div key={type} className="flex items-center justify-between rounded-lg border border-(--border) px-3 py-2.5 text-sm">
            <span className="text-(--text-muted)">{label}</span>
            <span className="font-semibold text-(--text)">{scannedCounts[type] ?? 0} / {expectedCounts[type] ?? 0}</span>
          </div>)}
        </div>
      </div>
      {remaining === 0 ? <p className="rounded-lg bg-green-50 px-3 py-2.5 text-sm font-medium text-green-800">All expected items have been scanned.</p> : <p className="rounded-lg bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-800">{remaining} expected {remaining === 1 ? 'item has' : 'items have'} not been scanned.</p>}
    </div>}
  </Card>
}
