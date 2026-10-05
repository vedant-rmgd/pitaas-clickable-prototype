import { Badge } from '../ui/Badge'

const typeTones = {
  'Customer Warehouse': 'info',
  'Equipment Supplier Warehouse': 'warning',
  'Company Site(Pickup)': 'neutral',
  'Co-located Warehouse (CLW)': 'success',
}

export function LocationTypeBadge({ type }) {
  return <Badge tone={typeTones[type] ?? 'neutral'}>{type}</Badge>
}
