import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { formatDate } from '../../utils/formatDate'
import { batchStatusTones } from './batchStatus'

function SummaryField({ label, children }) {
  return <div>
    <dt className="text-xs font-medium text-[var(--text-muted)]">{label}</dt>
    <dd className="mt-1 break-words text-sm font-semibold text-[var(--text)]">{children}</dd>
  </div>
}

export function BatchSummary({ batch }) {
  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-[var(--text)]">Batch Summary</h2>
      <p className="mt-1 text-sm text-[var(--text-muted)]">Key details for this received batch.</p>
    </div>
    <dl className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
      <SummaryField label="Batch Name">{batch.batchName}</SummaryField>
      <SummaryField label="Supplier">{batch.supplier}</SummaryField>
      <SummaryField label="Received">{formatDate(batch.createdDate)}</SummaryField>
      <SummaryField label="Receiving Warehouse">{batch.receivingLocation}</SummaryField>
      <SummaryField label="Status"><Badge tone={batchStatusTones[batch.status] ?? 'neutral'}>{batch.status}</Badge></SummaryField>
      {batch.notes && <SummaryField label="Notes">{batch.notes}</SummaryField>}
    </dl>
  </Card>
}
