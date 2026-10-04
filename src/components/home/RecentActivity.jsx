import { ArrowDownToLine, ArrowUpFromLine, GitCompareArrows } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { batches } from '../../data/batches.js'
import { getPitaasStock, reconciliationRecords } from '../../data/reconciliation.js'
import { locations } from '../../data/locations.js'
import { movements } from '../../data/movements.js'
import { formatDateTime } from '../../utils/formatDate.js'
import { buildComparisonRows, getComparisonTotals } from '../../utils/reconciliationReport.js'
import { getLocationName } from '../../utils/locationHelpers.js'

const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' })

function formatMonth(value) {
  return monthFormatter.format(new Date(`${value}-01T00:00:00`))
}

function buildMovementActivities() {
  return movements.map((movement) => {
    const batch = batches.find((candidate) => candidate.id === movement.batchId)
    const isIncoming = movement.scanType === 'IN'
    const fromLocation = getLocationName(movement.fromLocationId, movement.fromLocation)
    const toLocation = getLocationName(movement.toLocationId, movement.toLocation)
    const itemLabel = `${movement.itemCount} ${movement.itemCount === 1 ? 'item' : 'items'}`

    return {
      id: `activity-${movement.id}`,
      icon: isIncoming ? ArrowDownToLine : ArrowUpFromLine,
      eventType: isIncoming && movement.fromLocation === 'Supplier' ? 'New Arrival' : isIncoming ? 'In Scan' : 'Out Scan',
      related: batch?.batchName ?? movement.batchId,
      description: isIncoming ? `${itemLabel} received at ${toLocation}.` : `${itemLabel} sent from ${fromLocation} to ${toLocation}.`,
      date: movement.date,
      path: `/universal-sets/batches/${movement.batchId}`,
    }
  })
}

function buildReconciliationActivities() {
  return reconciliationRecords.map((record) => {
    const location = locations.find((candidate) => candidate.id === record.locationId)
    const rows = buildComparisonRows(getPitaasStock(record.locationId), record.reported)
    const { differenceCount } = getComparisonTotals(rows)

    return {
      id: `activity-reconciliation-${record.locationId}-${record.month}`,
      icon: GitCompareArrows,
      eventType: 'Reconciliation',
      related: location?.name ?? record.locationId,
      description: `${differenceCount} ${differenceCount === 1 ? 'difference' : 'differences'} found for ${formatMonth(record.month)}.`,
      date: `${record.month}-01T09:00:00`,
      path: '/reports/reconciliation',
    }
  })
}

function getRecentActivities() {
  return [...buildMovementActivities(), ...buildReconciliationActivities()]
    .sort((first, second) => new Date(second.date) - new Date(first.date))
    .slice(0, 7)
}

export function RecentActivity() {
  const navigate = useNavigate()
  const activities = getRecentActivities()

  return <section className="space-y-3" aria-labelledby="recent-activity-heading">
    <div>
      <h2 id="recent-activity-heading" className="text-base font-semibold text-(--text)">Recent Activity</h2>
      <p className="mt-1 text-sm text-(--text-muted)">The latest important operational events across PiTaaS.</p>
    </div>
    {activities.length === 0 ? <Card className="border-dashed !p-4">
      <p className="text-sm font-semibold text-(--text)">No recent activity.</p>
      <p className="mt-1 text-sm text-(--text-muted)">Recent operational events will appear here.</p>
    </Card> : <Card className="!p-0 !overflow-hidden">
      <div className="divide-y divide-(--border)">
        {activities.map(({ id, icon: Icon, eventType, related, description, date, path }) => <button
          key={id}
          type="button"
          className="group flex w-full flex-col gap-2 px-4 py-4 text-left transition hover:bg-amber-50 sm:flex-row sm:items-start sm:gap-3 sm:px-5"
          onClick={() => navigate(path)}
        >
          <span className="flex min-w-0 flex-1 items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--surface-muted) text-(--interactive-text)">
              <Icon size={16} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-(--text)">{eventType}</span>
                <Badge tone="neutral">{related}</Badge>
              </span>
              <span className="mt-1 block text-sm text-(--text-muted)">{description}</span>
            </span>
          </span>
          <time className="pl-11 text-xs text-(--text-muted) sm:shrink-0 sm:pl-0 sm:text-right" dateTime={date}>{formatDateTime(date)}</time>
        </button>)}
      </div>
    </Card>}
  </section>
}
