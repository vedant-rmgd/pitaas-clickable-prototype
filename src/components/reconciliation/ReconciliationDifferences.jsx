import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

function formatDifference(value) {
  return value > 0 ? `+${value}` : String(value)
}

export function ReconciliationDifferences({ rows, locationName, monthLabel, pitaasTotal, esTotal, netDifference }) {
  const differenceRows = rows.filter((row) => row.difference !== 0)

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Reconciliation Details</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Quantity differences for {locationName} during {monthLabel}.</p>
    </div>
    <div className="grid gap-3 border-b border-(--border) bg-(--surface-muted) p-5 sm:grid-cols-2 lg:grid-cols-5 sm:p-6">
      <div><p className="text-xs text-(--text-muted)">Equipment Supplier</p><p className="mt-1 text-sm font-semibold text-(--text)">{locationName}</p></div>
      <div><p className="text-xs text-(--text-muted)">Month</p><p className="mt-1 text-sm font-semibold text-(--text)">{monthLabel}</p></div>
      <div><p className="text-xs text-(--text-muted)">Matched</p><p className="mt-1 text-sm font-semibold text-(--text)">{rows.filter((row) => row.difference === 0).length} item types</p></div>
      <div><p className="text-xs text-(--text-muted)">Differences</p><p className="mt-1 text-sm font-semibold text-(--text)">{differenceRows.length} item types</p></div>
      <div><p className="text-xs text-(--text-muted)">Net Difference</p><p className="mt-1 text-sm font-semibold text-(--text)">{formatDifference(netDifference)}</p></div>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-180 w-full text-left text-sm">
        <thead>
          <tr className="bg-white text-xs uppercase tracking-wide text-(--text-muted)">
            <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Item Type</th>
            <th scope="col" className="px-5 py-3 text-right font-semibold sm:px-6">PiTaaS</th>
            <th scope="col" className="px-5 py-3 text-right font-semibold sm:px-6">ES Report</th>
            <th scope="col" className="px-5 py-3 text-right font-semibold sm:px-6">Difference</th>
            <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => <tr key={row.key} className="border-t border-(--border)">
            <td className="px-5 py-4 font-semibold text-(--text) sm:px-6">{row.label}</td>
            <td className="px-5 py-4 text-right text-(--text) sm:px-6">{row.pitaasValue}</td>
            <td className="px-5 py-4 text-right text-(--text) sm:px-6">{row.esValue}</td>
            <td className="px-5 py-4 text-right font-semibold text-(--text) sm:px-6">{formatDifference(row.difference)}</td>
            <td className="px-5 py-4 sm:px-6"><Badge tone={row.difference === 0 ? 'success' : 'warning'}>{row.difference === 0 ? 'Matched' : 'Difference'}</Badge></td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {differenceRows.length > 0 && <div className="border-t border-(--border) bg-amber-50 px-5 py-4 sm:px-6">
      <h3 className="text-sm font-semibold text-amber-950">What the differences mean</h3>
      <div className="mt-3 flex flex-col gap-2">
        {differenceRows.map((row) => <p key={row.key} className="text-sm leading-5 text-amber-900"><span className="font-semibold">{row.label}:</span> ES reported {Math.abs(row.difference)} {row.difference < 0 ? 'fewer' : 'more'} {row.label} than PiTaaS.</p>)}
      </div>
    </div>}
    <div className="flex flex-col gap-2 border-t border-(--border) px-5 py-3 text-xs text-(--text-muted) sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span>PiTaaS Total: {pitaasTotal}</span>
      <span>ES Total: {esTotal}</span>
    </div>
  </Card>
}
