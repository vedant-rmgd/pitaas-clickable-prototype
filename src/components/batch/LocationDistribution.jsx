import { Card } from '../ui/Card'
import { resolveLocation } from '../../utils/locationHelpers'

export function LocationDistribution({ locations }) {
  const totalItems = locations.reduce((total, location) => total + location.itemCount, 0)

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Current Location Distribution</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Where the physical items in this batch are currently located.</p>
    </div>
    <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
      {locations.map((location) => {
        const resolvedLocation = resolveLocation(location.locationId, location.locationName)
        return <div key={location.locationId} className="rounded-lg border border-(--border) bg-(--surface-muted) p-4">
        <p className="text-sm font-semibold text-(--text)">{resolvedLocation.name}</p>
        <p className="mt-1 text-xs text-(--text-muted)">{resolvedLocation.type}</p>
        <p className="mt-4 text-2xl font-semibold tracking-tight text-(--text)">{location.itemCount}</p>
        <p className="text-xs text-(--text-muted)">{location.itemCount === 1 ? 'item' : 'items'}</p>
      </div>
      })}
    </div>
    <div className="flex items-center justify-between border-t border-(--border) px-5 py-3 text-sm sm:px-6">
      <span className="font-semibold text-(--text)">Total distributed</span>
      <span className="font-semibold text-(--text)">{totalItems} items</span>
    </div>
  </Card>
}
