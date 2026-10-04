import { Card } from '../ui/Card'
import { buildReconciliationSummary } from '../../utils/reconciliationReport'

export function ReconciliationSummary({ rows, monthLabel, summaryText }) {
  const summary = summaryText ?? buildReconciliationSummary(rows, monthLabel)

  return <Card className="border-blue-100 bg-blue-50">
    <h2 className="text-base font-semibold text-blue-950">Reconciliation Summary</h2>
    <p className="mt-2 text-sm leading-6 text-blue-900">{summary}</p>
  </Card>
}
