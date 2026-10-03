import { Badge } from '../ui/Badge'
import { DataTable } from '../ui/DataTable'
import { LocationTypeBadge } from './LocationTypeBadge'

export function LocationsTable({ locations, onEdit }) {
  const columns = [
    {
      key: 'name',
      label: 'Location Name',
      render: (value) => <span className="font-semibold text-(--text)">{value}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => <LocationTypeBadge type={value} />,
    },
    { key: 'organization', label: 'Organization' },
    { key: 'city', label: 'City' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge tone={value === 'Active' ? 'success' : 'neutral'}>{value}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, location) => <button type="button" className="text-sm font-semibold text-(--primary) hover:text-blue-800" onClick={() => onEdit(location)}>Edit</button>,
    },
  ]

  return <DataTable
    columns={columns}
    data={locations}
    rowKey="id"
    emptyMessage={<div><p className="font-semibold text-(--text)">No locations found</p><p className="mt-1 text-sm text-(--text-muted)">Try another location name, organization, city, or type.</p></div>}
  />
}
