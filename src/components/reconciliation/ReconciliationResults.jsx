import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ReconciliationSummary } from './ReconciliationSummary'
import { StockComparison } from './StockComparison'
import { getPitaasStock, getReconciliationRecord } from '../../data/reconciliation'
import { buildComparisonRows, buildReconciliationSummary, downloadReconciliationReport, getComparisonTotals } from '../../utils/reconciliationReport'

const monthFormatter = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' })

function formatMonth(value) {
  return monthFormatter.format(new Date(`${value}-01T00:00:00`))
}

export function ReconciliationResults({ location, month, fileName, onChangeSetup }) {
  const [downloadMessage, setDownloadMessage] = useState('')
  const report = getReconciliationRecord(location.id, month)
  const pitaasRecords = getPitaasStock(location.id)

  if (!report) return <Card className="border-dashed text-center">
    <p className="text-sm font-semibold text-(--text)">No demo reconciliation data is available for this selection.</p>
    <p className="mt-1 text-sm text-(--text-muted)">Choose another Equipment Supplier location or month to view the prototype comparison.</p>
    <Button variant="secondary" className="mt-4" onClick={onChangeSetup}>Change Setup</Button>
  </Card>

  const rows = buildComparisonRows(pitaasRecords, report.reported)
  const { pitaasTotal, esTotal, matchedCount, differenceCount } = getComparisonTotals(rows)
  const monthLabel = formatMonth(month)
  const summaryText = buildReconciliationSummary(rows, monthLabel)

  const handleDownload = () => {
    downloadReconciliationReport({ locationName: location.name, month, monthLabel, fileName, rows, summaryText })
    setDownloadMessage('Reconciliation report downloaded.')
  }

  return <div className="flex flex-col gap-5">
    <Card className="!p-0 !overflow-hidden">
      <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="success">Reconciliation completed</Badge>
            <Badge tone={differenceCount === 0 ? 'success' : 'warning'}>{differenceCount === 0 ? 'All records match' : 'Differences found'}</Badge>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-(--text)">{differenceCount === 0 ? 'All records match' : 'Differences found'}</h2>
          <p className="mt-1 text-sm text-(--text-muted)">{matchedCount} item types matched · {differenceCount} {differenceCount === 1 ? 'difference' : 'differences'} found</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleDownload}>Download Report</Button>
          <Button variant="secondary" onClick={onChangeSetup}>Change Setup</Button>
        </div>
      </div>
      <dl className="grid gap-4 border-t border-(--border) bg-(--surface-muted) px-5 py-4 sm:grid-cols-3 sm:px-6">
        <div><dt className="text-xs font-medium text-(--text-muted)">Equipment Supplier</dt><dd className="mt-1 text-sm font-semibold text-(--text)">{location.name}</dd></div>
        <div><dt className="text-xs font-medium text-(--text-muted)">Month</dt><dd className="mt-1 text-sm font-semibold text-(--text)">{monthLabel}</dd></div>
        <div><dt className="text-xs font-medium text-(--text-muted)">Uploaded Report</dt><dd className="mt-1 truncate text-sm font-semibold text-(--text)" title={fileName}>{fileName}</dd></div>
      </dl>
    </Card>
    {downloadMessage && <p className="text-right text-xs font-medium text-green-700" role="status">{downloadMessage}</p>}
    <StockComparison rows={rows} pitaasTotal={pitaasTotal} esTotal={esTotal} />
    <ReconciliationSummary rows={rows} monthLabel={monthLabel} summaryText={summaryText} />
  </div>
}
