import { Folder, Package } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { formatDateTime } from '../../utils/formatDate'

export function WarehouseDetails({ warehouse }) {
  const typeIcon = warehouse.type === 'Warehouse Group' ? <Folder size={16} /> : <Package size={16} />
  return <Card className="warehouse-details-card"><div className="warehouse-card-header"><h2>Warehouse details</h2></div><dl className="warehouse-fields">
    <div><dt>Code</dt><dd>{warehouse.code}</dd></div><div><dt>Warehouse name</dt><dd>{warehouse.name}</dd></div>
    <div><dt>Company</dt><dd>{warehouse.company}</dd></div><div><dt>Branch</dt><dd>{warehouse.branch}</dd></div>
    <div><dt>Type</dt><dd><span className="warehouse-type"><span>{typeIcon}</span>{warehouse.type}</span></dd></div><div><dt>Status</dt><dd><Badge tone="success">{warehouse.status}</Badge></dd></div>
    <div><dt>Created by</dt><dd>{warehouse.createdBy}</dd></div><div><dt>Last modified</dt><dd>{formatDateTime(warehouse.modified)}</dd></div>
  </dl></Card>
}
