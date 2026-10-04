import { Card } from '../ui/Card'
import { locations } from '../../data/locations.js'
import { movements } from '../../data/movements.js'
import { qrItems } from '../../data/qrItems.js'

const locationTypesById = new Map(locations.map((location) => [location.id, location.type]))

function getOperationalMetrics() {
  const pendingInScans = movements.filter((movement) => (
    movement.scanType === 'OUT' && ['In Transit', 'Pending Arrival'].includes(movement.status)
  )).length
  const itemsInTransit = qrItems.filter((item) => (
    item.status === 'In Transit' || locationTypesById.get(item.currentLocationId) === 'In Transit'
  )).length
  const itemsAtEs = qrItems.filter((item) => (
    locationTypesById.get(item.currentLocationId) === 'Equipment Supplier Warehouse'
  )).length
  const itemsAtClw = qrItems.filter((item) => (
    locationTypesById.get(item.currentLocationId) === 'Co-located Warehouse (CLW)'
  )).length

  return [
    { label: 'Pending In Scans', value: pendingInScans, helper: 'Out-scanned movements awaiting arrival.' },
    { label: 'Items In Transit', value: itemsInTransit, helper: 'Items currently moving to a destination.' },
    { label: 'Items at ES', value: itemsAtEs, helper: 'Items at equipment supplier warehouses.' },
    { label: 'Items at CLW', value: itemsAtClw, helper: 'Items at co-located warehouses.' },
  ]
}

export function OperationalMetrics() {
  const metrics = getOperationalMetrics()

  return <section className="space-y-3" aria-labelledby="operational-overview-heading">
    <div>
      <h2 id="operational-overview-heading" className="text-base font-semibold text-(--text)">Operational Overview</h2>
      <p className="mt-1 text-sm text-(--text-muted)">A quick view of current item movement and location status.</p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, helper }) => <Card key={label} className="!p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">{label}</p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-(--text)">{value}</p>
        <p className="mt-1 text-xs leading-5 text-(--text-muted)">{helper}</p>
      </Card>)}
    </div>
  </section>
}
