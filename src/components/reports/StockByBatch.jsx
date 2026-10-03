import { DataTable } from '../ui/DataTable'
import { Card } from '../ui/Card'
import { formatDate } from '../../utils/formatDate'

export function StockByBatch({ rows, onBatchClick }) {
  const columns = [
    { key: 'batchName', label: 'Batch', render: (value) => <span className="font-semibold text-(--text)">{value}</span> },
    { key: 'receivedDate', label: 'Received', render: (value) => formatDate(value) },
    { key: 'caps', label: 'Caps', align: 'right' },
    { key: 'sleeves', label: 'Sleeves', align: 'right' },
    { key: 'pallets', label: 'Pallets', align: 'right' },
    { key: 'total', label: 'Total Items', align: 'right' },
  ]

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Stock by Batch</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Physical items currently at this warehouse, grouped by batch.</p>
    </div>
    <DataTable columns={columns} data={rows} rowKey="batchId" onRowClick={(row) => onBatchClick(row.batchId)} wrapClassName="max-h-80 overflow-y-auto" stickyHeader />
  </Card>
}
