import { Card } from '../ui/Card'
import { locations } from '../../data/locations.js'
import { qrItems } from '../../data/qrItems.js'

const locationTypesById = new Map(locations.map((location) => [location.id, location.type]))

function getOperationalMetrics() {
  const countAtLocationType = (locationType) => qrItems.filter((item) => locationTypesById.get(item.currentLocationId) === locationType).length
  const itemsInTransit = qrItems.filter((item) => item.status === 'In Transit' || locationTypesById.get(item.currentLocationId) === 'In Transit').length

  return [
    { label: 'ITEMS AT MY WAREHOUSES', value: countAtLocationType('Customer Warehouse') },
    { label: 'ITEMS AT EQUIPMENT WAREHOUSES', value: countAtLocationType('Equipment Supplier Warehouse') },
    { label: 'ITEMS AT COMPANY SITES', value: countAtLocationType('Company Site(Pickup)') },
    { label: 'ITEMS AT CLW', value: countAtLocationType('Co-located Warehouse (CLW)') },
    { label: 'ITEMS IN TRANSIT', value: itemsInTransit },
  ]
}

export function OperationalMetrics() {
  const metrics = getOperationalMetrics()

  return <section className="space-y-3" aria-labelledby="operational-overview-heading">
    <div>
      <h2 id="operational-overview-heading" className="text-base font-semibold text-(--text)">Operational Overview</h2>
      <p className="mt-1 text-sm text-(--text-muted)">A quick view of current item movement and location status.</p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map(({ label, value }) => <Card key={label} className="!p-4">
        <p className="min-h-8 text-xs font-semibold uppercase leading-4 tracking-wide text-(--text-muted)">{label}</p>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-(--text)">{value}</p>
      </Card>)}
    </div>
  </section>
}
