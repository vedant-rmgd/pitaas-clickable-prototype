const scanTypes = [
  { value: 'in', label: 'In Scan' },
  { value: 'out', label: 'Out Scan' },
]

export function ScanTypeSelector({ value, onChange }) {
  return <div className="inline-grid w-full max-w-md grid-cols-2 rounded-lg border border-(--border) bg-(--surface-muted) p-1" role="tablist" aria-label="Scan type">
    {scanTypes.map((scanType) => {
      const selected = value === scanType.value
      return <button
        key={scanType.value}
        type="button"
        role="tab"
        aria-selected={selected}
        className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${selected ? 'bg-white text-(--text) shadow-sm' : 'text-(--text-muted) hover:bg-amber-50 hover:text-(--interactive-text)'}`}
        onClick={() => onChange(scanType.value)}
      >
        {scanType.label}
      </button>
    })}
  </div>
}
