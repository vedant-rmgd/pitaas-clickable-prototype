import { Card } from '../ui/Card'

export function MissingItemsList({ items, hasMovement }) {
  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Missing Items</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Items expected in this movement that have not been scanned yet.</p>
    </div>
    {!hasMovement ? <div className="px-5 py-8 text-sm text-(--text-muted) sm:px-6">Select an incoming movement to compare its expected items.</div> : items.length === 0 ? <div className="px-5 py-8 text-sm text-green-700 sm:px-6">No missing items. All expected items have been scanned.</div> : <div className="divide-y divide-(--border)">
      {items.map((item) => <div key={item.qrId} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-(--text)">{item.qrId}</p>
          <p className="mt-1 text-xs text-(--text-muted)">{item.type} · {item.batchName}</p>
        </div>
        <span className="text-xs font-medium text-amber-700">Not scanned / not received in this In Scan session.</span>
      </div>)}
    </div>}
  </Card>
}
