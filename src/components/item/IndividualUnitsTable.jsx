import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { DataTable } from '../ui/DataTable'

export function IndividualUnitsTable({ unitRows }) {
  const columns = [
    { key: 'serial', label: 'TRACKING ID' },
    { key: 'qr', label: 'QR CODE', render: (value, row) => <div className="qr-cell"><img src={row.qrSrc} alt={`${value} QR code`} /><span>{value}</span></div> },
    { key: 'warehouse', label: 'WAREHOUSE' },
    { key: 'status', label: 'STATUS', render: (value) => <Badge tone="success">{value}</Badge> },
  ]

  return <Card className="table-card individual-units-card">
    <div className="table-card__header"><div><h2>Individual Units</h2><p>Individual physical units registered for tracking. Each unit has a unique Tracking ID and QR code.</p></div></div>
    <div className="units-table-scroll"><DataTable columns={columns} data={unitRows} rowKey="serial" /></div>
  </Card>
}
