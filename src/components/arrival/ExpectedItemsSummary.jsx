import { ArrivalSection } from './ArrivalSection'

export function ExpectedItemsSummary({ values }) {
  const expectedItems = [
    { label: 'Caps', value: values.caps },
    { label: 'Sleeves', value: values.sleeves },
    { label: 'Pallets', value: values.pallets },
    { label: 'Total Items', value: values.total, emphasis: true },
  ]

  return <ArrivalSection
    step="3"
    title="Expected Items"
    description="These are the physical items that will need to be scanned."
  >
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {expectedItems.map((item) => <div key={item.label} className={`rounded-lg border p-4 ${item.emphasis ? 'border-blue-200 bg-blue-50' : 'border-[var(--border)] bg-[var(--surface-muted)]'}`}>
        <span className="block text-xs font-medium text-[var(--text-muted)]">{item.label}</span>
        <strong className="mt-2 block text-2xl font-semibold tracking-tight text-[var(--text)]">{item.value}</strong>
      </div>)}
    </div>
  </ArrivalSection>
}
