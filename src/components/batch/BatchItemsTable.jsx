import { useMemo, useState } from 'react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { formatDateTime } from '../../utils/formatDate'
import { getLocationName } from '../../utils/locationHelpers'
import { batchStatusTones } from './batchStatus'

const itemTypes = ['Cap', 'Sleeve', 'Pallet']

export function BatchItemsTable({ items }) {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const locations = useMemo(() => [...new Set(items.map((item) => getLocationName(item.currentLocationId, item.currentLocationName)))], [items])
  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = useMemo(() => items.filter((item) => {
    const locationName = getLocationName(item.currentLocationId, item.currentLocationName)
    const matchesQuery = !normalizedQuery || `${item.qrId} ${item.type} ${locationName}`.toLowerCase().includes(normalizedQuery)
    const matchesType = !typeFilter || item.type === typeFilter
    const matchesLocation = !locationFilter || locationName === locationFilter
    return matchesQuery && matchesType && matchesLocation
  }), [items, locationFilter, normalizedQuery, typeFilter])

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Individual Items</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Every physical Cap, Sleeve, and Pallet registered in this batch.</p>
    </div>
    <div className="grid gap-3 border-b border-(--border) bg-(--surface-muted) p-5 sm:grid-cols-3 sm:p-6">
      <label className="flex flex-col gap-1.5 sm:col-span-1">
        <span className="text-xs font-semibold text-(--text)">Search</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by QR ID..."
          className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-(--text)">Item Type</span>
        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none transition hover:border-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100">
          <option value="">All</option>
          {itemTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-(--text)">Location</span>
        <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none transition hover:border-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100">
          <option value="">All Locations</option>
          {locations.map((location) => <option key={location} value={location}>{location}</option>)}
        </select>
      </label>
    </div>
    {items.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
      <p className="text-sm font-semibold text-(--text)">No items registered in this batch yet.</p>
    </div> : filteredItems.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
      <p className="text-sm font-semibold text-(--text)">No items found</p>
      <p className="mt-1 text-sm text-(--text-muted)">Try another QR ID, item type, or location.</p>
    </div> : <div className="max-h-112 overflow-auto">
      <table className="min-w-200 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="sticky top-0 z-10 bg-(--surface-muted) text-xs uppercase tracking-wide text-(--text-muted) shadow-sm">
            <th scope="col" className="px-5 py-3 font-semibold">QR ID</th>
            <th scope="col" className="px-5 py-3 font-semibold">Item Type</th>
            <th scope="col" className="px-5 py-3 font-semibold">Current Location</th>
            <th scope="col" className="px-5 py-3 font-semibold">Status</th>
            <th scope="col" className="px-5 py-3 font-semibold">Last Scan</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => <tr key={item.qrId} className="border-t border-(--border)">
            <td className="px-5 py-4 font-semibold text-(--text)">{item.qrId}</td>
            <td className="px-5 py-4 text-(--text-muted)">{item.type}</td>
            <td className="px-5 py-4 text-(--text-muted)">{getLocationName(item.currentLocationId, item.currentLocationName)}</td>
            <td className="px-5 py-4"><Badge tone={batchStatusTones[item.status] ?? 'neutral'}>{item.status}</Badge></td>
            <td className="px-5 py-4">
              <span className="block font-medium text-(--text)">{item.lastScanType === 'OUT' ? 'Out Scan' : 'In Scan'}</span>
              <span className="mt-1 block text-xs text-(--text-muted)">{formatDateTime(item.lastScanDate)}</span>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>}
  </Card>
}
