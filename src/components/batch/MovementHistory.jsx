import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { formatDateTime } from '../../utils/formatDate'
import { batchStatusTones } from './batchStatus'
import { getLocationName } from '../../utils/locationHelpers'

export function MovementHistory({ movements }) {
  const [scanTypeFilter, setScanTypeFilter] = useState('ALL')
  const filteredMovements = useMemo(() => movements.filter((movement) => scanTypeFilter === 'ALL' || movement.scanType === scanTypeFilter), [movements, scanTypeFilter])

  return <Card className="!p-0 !overflow-hidden">
    <div className="flex flex-col gap-3 border-b border-(--border) px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <h2 className="text-base font-semibold text-(--text)">Movement History</h2>
        <p className="mt-1 text-sm text-(--text-muted)">A read-only history of how this batch moved through the business lifecycle.</p>
      </div>
      <label className="flex items-center gap-2 text-xs font-semibold text-(--text)">
        <span>Scan Type</span>
        <select value={scanTypeFilter} onChange={(event) => setScanTypeFilter(event.target.value)} className="h-9 rounded-lg border border-(--border-strong) bg-white px-3 text-sm font-normal text-(--text) outline-none focus:border-(--primary) focus:ring-4 focus:ring-blue-100">
          <option value="ALL">All</option>
          <option value="IN">In Scan</option>
          <option value="OUT">Out Scan</option>
        </select>
      </label>
    </div>
    {movements.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
      <p className="text-sm font-semibold text-(--text)">No movement history yet</p>
      <p className="mt-1 text-sm text-(--text-muted)">Scan activity for this batch will appear here.</p>
    </div> : filteredMovements.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
      <p className="text-sm font-semibold text-(--text)">No movements found</p>
      <p className="mt-1 text-sm text-(--text-muted)">Try a different scan type.</p>
    </div> : <div className="space-y-4 p-5 sm:p-6">
      {filteredMovements.map((movement) => <article key={movement.id} className="relative rounded-lg border border-(--border) bg-(--surface-muted) p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-(--text)">{formatDateTime(movement.date)}</p>
            <p className="mt-1 text-xs text-(--text-muted)">{movement.itemCount} {movement.itemCount === 1 ? 'item' : 'items'} involved</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={movement.scanType === 'IN' ? 'info' : 'warning'}>{movement.scanType === 'IN' ? 'In Scan' : 'Out Scan'}</Badge>
            <Badge tone={batchStatusTones[movement.status] ?? 'neutral'}>{movement.status}</Badge>
          </div>
        </div>
        <div className="mt-4 flex min-w-0 items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-(--text-muted)">From</p>
            <p className="mt-1 text-sm font-semibold text-(--text)">{getLocationName(movement.fromLocationId, movement.fromLocation)}</p>
          </div>
          <ArrowRight className="shrink-0 text-(--text-muted)" size={18} aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-(--text-muted)">To</p>
            <p className="mt-1 text-sm font-semibold text-(--text)">{getLocationName(movement.toLocationId, movement.toLocation)}</p>
          </div>
        </div>
      </article>)}
    </div>}
  </Card>
}
