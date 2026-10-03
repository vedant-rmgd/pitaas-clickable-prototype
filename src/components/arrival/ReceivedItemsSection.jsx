import { ArrivalSection } from './ArrivalSection'

function ReceiptOption({ label, description, checked, onChange }) {
  return <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${checked ? 'border-blue-200 bg-blue-50' : 'border-[var(--border)] bg-[var(--surface-muted)] hover:border-amber-300 hover:bg-amber-50'}`}>
    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--primary)]" checked={checked} onChange={onChange} />
    <span>
      <span className="block text-sm font-semibold text-[var(--text)]">{label}</span>
      <span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">{description}</span>
    </span>
  </label>
}

function QuantityInput({ label, value, onChange }) {
  return <label className="flex flex-col gap-1.5" htmlFor={label.toLowerCase().replaceAll(' ', '-')}>
    <span className="text-xs font-semibold text-[var(--text)]">{label}</span>
    <input
      id={label.toLowerCase().replaceAll(' ', '-')}
      type="number"
      min="0"
      step="1"
      inputMode="numeric"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-lg border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--text)] outline-none transition hover:border-slate-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
    />
  </label>
}

export function ReceivedItemsSection({ values, onToggle, onQuantityChange }) {
  return <ArrivalSection
    step="2"
    title="What Was Received?"
    description="Select the packaging types included in this arrival."
  >
    <div className="grid gap-3 md:grid-cols-2">
      <ReceiptOption
        label="Universal Sets"
        description="A complete set containing one Cap, one Sleeve, and one Pallet."
        checked={values.receiveUniversalSets}
        onChange={() => onToggle('receiveUniversalSets')}
      />
      <ReceiptOption
        label="Individual Items"
        description="Additional Caps, Sleeves, or Pallets received outside complete sets."
        checked={values.receiveIndividualItems}
        onChange={() => onToggle('receiveIndividualItems')}
      />
    </div>
    {values.receiveUniversalSets && <div className="mt-5 rounded-lg border border-[var(--border)] bg-white p-4">
      <div className="max-w-xs">
        <QuantityInput label="Universal Sets" value={values.universalSetCount} onChange={(value) => onQuantityChange('universalSetCount', value)} />
        <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">Each set contributes one Cap, one Sleeve, and one Pallet.</p>
      </div>
    </div>}
    {values.receiveIndividualItems && <div className="mt-5 rounded-lg border border-[var(--border)] bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <QuantityInput label="Extra Caps" value={values.extraCaps} onChange={(value) => onQuantityChange('extraCaps', value)} />
        <QuantityInput label="Extra Sleeves" value={values.extraSleeves} onChange={(value) => onQuantityChange('extraSleeves', value)} />
        <QuantityInput label="Extra Pallets" value={values.extraPallets} onChange={(value) => onQuantityChange('extraPallets', value)} />
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--text-muted)]">These items are added separately from any Universal Sets.</p>
    </div>}
  </ArrivalSection>
}
