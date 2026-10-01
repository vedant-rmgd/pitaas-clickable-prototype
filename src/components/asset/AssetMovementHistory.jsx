import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { DataTable } from '../ui/DataTable'

const purposes = ['All', 'Transfer', 'Issue', 'Receipt', 'Transfer and Issue']

export function AssetMovementHistory({ movements }) {
  const [purpose, setPurpose] = useState('All')
  const filteredMovements = purpose === 'All' ? movements : movements.filter((movement) => movement.purpose === purpose)
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'purpose', label: 'Purpose', render: (value) => <Badge tone="success">{value}</Badge> },
    { key: 'fromTo', label: 'From → To' },
    { key: 'employee', label: 'Employee' },
    { key: 'reference', label: 'Reference' },
  ]

  return <Card className="asset-movement-card"><div className="asset-card__header"><h2>Movement history</h2><p>Review transfers, issues, and receipts for this asset.</p></div><div className="asset-movement-body">
    <div className="asset-purpose-filters"><span>Purpose</span>{purposes.map((filter) => <button type="button" key={filter} className={`asset-purpose-filter ${purpose === filter ? 'asset-purpose-filter--active' : ''}`} onClick={() => setPurpose(filter)}>{filter}</button>)}</div>
    <DataTable columns={columns} data={filteredMovements} rowKey="date" emptyMessage="No movement history for this asset." />
    <div className="asset-pagination"><span>Page 1 · 1 of {filteredMovements.length} rows · limit 20</span><div><button type="button" disabled>← Prev</button><button type="button" disabled>Next →</button></div></div>
  </div></Card>
}
