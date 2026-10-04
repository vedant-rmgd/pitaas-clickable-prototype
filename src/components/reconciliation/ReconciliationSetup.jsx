import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Select } from '../ui/Select'

export function ReconciliationSetup({
  locations,
  selectedLocationId,
  selectedMonth,
  onLocationChange,
  onMonthChange,
}) {
  const selectedLocation = locations.find((location) => location.id === selectedLocationId)
  const locationOptions = [
    { value: '', label: 'Select an Equipment Supplier location' },
    ...locations.map((location) => ({ value: location.id, label: location.name })),
  ]

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Reconciliation Setup</h2>
      <p className="mt-1 text-sm leading-5 text-(--text-muted)">Choose the supplier location and monthly reporting period to begin.</p>
    </div>
    <div className="space-y-5 p-5 sm:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Equipment Supplier Location"
          value={selectedLocationId}
          onChange={(event) => onLocationChange(event.target.value)}
          options={locationOptions}
        />
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-(--text)">Month</span>
          <input
            type="month"
            value={selectedMonth}
            onChange={(event) => onMonthChange(event.target.value)}
            className="h-10 rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none focus:border-(--primary) focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>

      {selectedLocation && <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-blue-700">Selected Location</p>
            <p className="mt-1 text-sm font-semibold text-blue-950">{selectedLocation.name}</p>
          </div>
          <Badge tone="warning">Equipment Supplier Warehouse</Badge>
        </div>
        <dl className="mt-4 grid gap-3 border-t border-blue-100 pt-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-blue-700">Organization</dt>
            <dd className="mt-1 text-sm text-blue-950">{selectedLocation.organization}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-blue-700">City</dt>
            <dd className="mt-1 text-sm text-blue-950">{selectedLocation.city}</dd>
          </div>
        </dl>
      </div>}

    </div>
  </Card>
}
