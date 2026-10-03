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
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Batch Composition</h2>
      <p className="mt-1 text-sm text-(--text-muted)">The physical items received in this batch.</p>
    </div>
    <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-5">
      {metrics.map(([label, value]) => <div key={label} className="rounded-lg border border-(--border) bg-(--surface-muted) p-4">
        <p className="text-xs font-medium text-(--text-muted)">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-(--text)">{value}</p>
      </div>)}
    </div>
  </Card>
}
