import { useMemo, useState } from 'react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { formatDateTime } from '../../utils/formatDate'
import { batchStatusTones } from './batchStatus'

export function MovementHistory({ movements }) {
  const [scanTypeFilter, setScanTypeFilter] = useState('ALL')
  const filteredMovements = useMemo(() => movements.filter((movement) => scanTypeFilter === 'ALL' || movement.scanType === scanTypeFilter), [movements, scanTypeFilter])

  return <Card className="!p-0 !overflow-hidden">
    <div className="flex flex-col gap-3 border-b border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-base font-semibold text-[var(--text)]">Movement History</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">A read-only history of how this batch moved through the business lifecycle.</p>
      </div>
      <label className="flex items-center gap-2 text-xs font-semibold text-[var(--text)]">
        <span>Scan Type</span>
        <select value={scanTypeFilter} onChange={(event) => setScanTypeFilter(event.target.value)} className="h-9 rounded-lg border border-[var(--border-strong)] bg-white px-3 text-sm font-normal text-[var(--text)] outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100">
          <option value="ALL">All</option>
          <option value="IN">In Scan</option>
          <option value="OUT">Out Scan</option>
        </select>
      </label>
    </div>
    {movements.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
      <p className="text-sm font-semibold text-[var(--text)]">No movement history yet</p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Scan activity for this batch will appear here.</p>
    </div> : filteredMovements.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
      <p className="text-sm font-semibold text-[var(--text)]">No movements found</p>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Try a different scan type.</p>
    </div> : <div className="space-y-4 p-5 sm:p-6">
      {filteredMovements.map((movement) => <article key={movement.id} className="relative rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text)]">{formatDateTime(movement.date)}</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{movement.itemCount} {movement.itemCount === 1 ? 'item' : 'items'} involved</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={movement.scanType === 'IN' ? 'info' : 'warning'}>{movement.scanType === 'IN' ? 'In Scan' : 'Out Scan'}</Badge>
            <Badge tone={batchStatusTones[movement.status] ?? 'neutral'}>{movement.status}</Badge>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">From</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text)]">{movement.fromLocation}</p>
          </div>
          <span className="text-lg text-[var(--text-muted)] sm:justify-self-center" aria-hidden="true">→</span>
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">To</p>
            <p className="mt-1 text-sm font-semibold text-[var(--text)]">{movement.toLocation}</p>
          </div>
        </div>
      </article>)}
    </div>}
  </Card>
}
