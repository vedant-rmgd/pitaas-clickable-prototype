import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { reconciliationItemTypes } from '../../data/reconciliation'

function formatDifference(value) {
  return value > 0 ? `+${value}` : String(value)
}

function RecordCard({ title, description, values, total }) {
  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h3 className="text-base font-semibold text-(--text)">{title}</h3>
      <p className="mt-1 text-sm text-(--text-muted)">{description}</p>
    </div>
    <dl className="divide-y divide-(--border)">
      {reconciliationItemTypes.map((itemType) => <div key={itemType.key} className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <dt className="text-sm text-(--text-muted)">{itemType.label}</dt>
        <dd className="text-sm font-semibold text-(--text)">{values[itemType.key]}</dd>
      </div>)}
      <div className="flex items-center justify-between gap-4 bg-(--surface-muted) px-5 py-3.5 sm:px-6">
        <dt className="text-sm font-semibold text-(--text)">Total</dt>
        <dd className="text-sm font-semibold text-(--text)">{total}</dd>
      </div>
    </dl>
  </Card>
}

export function StockComparison({ rows, pitaasTotal, esTotal }) {
  const pitaasRecords = Object.fromEntries(rows.map((row) => [row.key, row.pitaasValue]))
  const esRecords = Object.fromEntries(rows.map((row) => [row.key, row.esValue]))

  return <div className="flex flex-col gap-5">
    <div className="grid gap-5 lg:grid-cols-2">
      <RecordCard title="PiTaaS Records" description="Stock currently recorded at the selected Equipment Supplier location." values={pitaasRecords} total={pitaasTotal} />
      <RecordCard title="ES Report" description="Stock reported by the Equipment Supplier in the selected file." values={esRecords} total={esTotal} />
    </div>

    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-(--text)">Match and Difference Summary</h2>
        <p className="mt-1 text-sm text-(--text-muted)">Compare each reported quantity with the corresponding PiTaaS record.</p>
      </div>
      <div className="divide-y divide-(--border)">
        {rows.map((row) => <div key={row.key} className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(92px,0.7fr))] sm:items-center sm:px-6">
          <div>
            <p className="text-sm font-semibold text-(--text)">{row.label}</p>
            <p className="mt-1 text-xs text-(--text-muted)">{row.difference === 0 ? 'The quantities match.' : row.difference < 0 ? `ES report shows ${Math.abs(row.difference)} fewer than PiTaaS.` : `ES report shows ${row.difference} more than PiTaaS.`}</p>
          </div>
          <div><p className="text-xs text-(--text-muted)">PiTaaS</p><p className="mt-1 text-sm font-semibold text-(--text)">{row.pitaasValue}</p></div>
          <div><p className="text-xs text-(--text-muted)">ES Report</p><p className="mt-1 text-sm font-semibold text-(--text)">{row.esValue}</p></div>
          <div className="flex items-center justify-between gap-3 sm:block"><div><p className="text-xs text-(--text-muted)">Difference</p><p className="mt-1 text-sm font-semibold text-(--text)">{formatDifference(row.difference)}</p></div><Badge tone={row.difference === 0 ? 'success' : 'warning'}>{row.difference === 0 ? 'Matched' : 'Difference'}</Badge></div>
        </div>)}
      </div>
    </Card>
  </div>
}
