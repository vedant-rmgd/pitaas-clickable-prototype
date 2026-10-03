import { LocationTypeBadge } from '../location/LocationTypeBadge'
import { Card } from '../ui/Card'

function Metric({ label, value, emphasis = false }) {
  return <div className={`rounded-lg border px-4 py-3 ${emphasis ? 'border-blue-200 bg-blue-50' : 'border-(--border) bg-(--surface-muted)'}`}>
    <p className="text-xs font-medium text-(--text-muted)">{label}</p>
    <p className={`mt-1 text-2xl font-semibold tracking-tight ${emphasis ? 'text-blue-900' : 'text-(--text)'}`}>{value}</p>
  </div>
}

export function LocationStockOverview({ location, counts, onChangeLocation }) {
  return <div className="flex flex-col gap-5">
    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-(--text)">Warehouse Context</h2>
            <p className="mt-1 text-sm text-(--text-muted)">Details for the selected physical warehouse.</p>
          </div>
          {onChangeLocation && <button type="button" className="self-start text-sm font-semibold text-(--primary) hover:text-blue-800" onClick={onChangeLocation}>Change Warehouse</button>}
        </div>
      </div>
      <dl className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        <div>
          <dt className="text-xs font-medium text-(--text-muted)">Warehouse Name</dt>
          <dd className="mt-1 text-sm font-semibold text-(--text)">{location.name}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-(--text-muted)">Warehouse Type</dt>
          <dd className="mt-1"><LocationTypeBadge type={location.type} /></dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-(--text-muted)">Organization</dt>
          <dd className="mt-1 text-sm font-semibold text-(--text)">{location.organization}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-(--text-muted)">Location</dt>
          <dd className="mt-1 text-sm font-semibold text-(--text)">{location.city}</dd>
        </div>
      </dl>
    </Card>

    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-(--text)">Current Stock</h2>
        <p className="mt-1 text-sm text-(--text-muted)">Physical QR-coded items currently recorded at this warehouse.</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        <Metric label="Caps" value={counts.caps} />
        <Metric label="Sleeves" value={counts.sleeves} />
        <Metric label="Pallets" value={counts.pallets} />
        <Metric label="Total Items" value={counts.total} emphasis />
      </div>
    </Card>
  </div>
}
