import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { DataTable } from '../ui/DataTable'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { formatDateTime } from '../../utils/formatDate'
import { batchStatusTones } from '../batch/batchStatus'

const itemTypes = ['Cap', 'Sleeve', 'Pallet']

export function LocationItemsTable({ items, batches }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedBatchId, setSelectedBatchId] = useState('')
  const batchNames = new Map(batches.map((batch) => [batch.id, batch.batchName]))
  const availableBatches = [...new Set(items.map((item) => item.batchId))].map((batchId) => ({ id: batchId, name: batchNames.get(batchId) ?? batchId }))
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredItems = items.filter((item) => {
    const batchName = batchNames.get(item.batchId) ?? item.batchId
    const matchesSearch = !normalizedSearch || `${item.qrId} ${item.type} ${batchName}`.toLowerCase().includes(normalizedSearch)
    const matchesType = !selectedType || item.type === selectedType
    const matchesBatch = !selectedBatchId || item.batchId === selectedBatchId
    return matchesSearch && matchesType && matchesBatch
  })
  const filtersActive = Boolean(searchTerm || selectedType || selectedBatchId)
  const columns = [
    { key: 'qrId', label: 'QR ID', render: (value) => <span className="font-semibold text-(--text)">{value}</span> },
    { key: 'type', label: 'Type' },
    { key: 'batchId', label: 'Batch', render: (value) => batchNames.get(value) ?? value },
    {
      key: 'lastScanDate',
      label: 'Last Scan',
      render: (value, row) => <div><span className="block font-medium text-(--text)">{row.lastScanType === 'OUT' ? 'Out Scan' : 'In Scan'}</span><span className="mt-1 block text-xs text-(--text-muted)">{formatDateTime(value)}</span></div>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge tone={batchStatusTones[value] ?? 'neutral'}>{value}</Badge>,
    },
  ]

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-(--text)">Individual Items</h2>
          <p className="mt-1 text-sm text-(--text-muted)">Exact QR-coded items currently present at this warehouse.</p>
        </div>
        <span className="text-xs font-semibold text-(--text-muted)">{filtersActive ? `${filteredItems.length} of ${items.length} items` : `${items.length} items`}</span>
      </div>
    </div>
    <div className="grid gap-3 border-b border-(--border) bg-(--surface-muted) p-5 sm:grid-cols-3 sm:p-6">
      <Input label="Search" placeholder="Search by QR ID..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      <Select label="Type" value={selectedType} onChange={(event) => setSelectedType(event.target.value)} options={[{ value: '', label: 'All Types' }, ...itemTypes.map((type) => ({ value: type, label: type }))]} />
      <Select label="Batch" value={selectedBatchId} onChange={(event) => setSelectedBatchId(event.target.value)} options={[{ value: '', label: 'All Batches' }, ...availableBatches.map((batch) => ({ value: batch.id, label: batch.name }))]} />
      {filtersActive && <button type="button" className="justify-self-start text-sm font-semibold text-(--primary) hover:text-blue-800 sm:col-span-3" onClick={() => {
        setSearchTerm('')
        setSelectedType('')
        setSelectedBatchId('')
      }}>Clear Filters</button>}
    </div>
    <DataTable
      columns={columns}
      data={filteredItems}
      rowKey="qrId"
      wrapClassName="max-h-112 overflow-y-auto"
      stickyHeader
      emptyMessage={<div><p className="font-semibold text-(--text)">No matching items found.</p><p className="mt-1 text-sm text-(--text-muted)">Try changing your search or filters.</p></div>}
    />
  </Card>
}
