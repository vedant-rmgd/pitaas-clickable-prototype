import { Card } from '../ui/Card'

export function BatchComposition({ composition }) {
  const metrics = [
    ['Universal Sets', composition.universalSets],
    ['Caps', composition.caps],
    ['Sleeves', composition.sleeves],
    ['Pallets', composition.pallets],
    ['Total Items', composition.totalItems],
  ]

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-[var(--text)]">Batch Composition</h2>
      <p className="mt-1 text-sm text-[var(--text-muted)]">The physical items received in this batch.</p>
    </div>
    <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-5">
      {metrics.map(([label, value]) => <div key={label} className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <p className="text-xs font-medium text-[var(--text-muted)]">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">{value}</p>
      </div>)}
    </div>
  </Card>
}
