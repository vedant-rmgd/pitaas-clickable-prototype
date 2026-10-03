import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { ArrivalSection } from './ArrivalSection'

export function BatchDetailsSection({ suppliers, locations, values, onChange }) {
  const customerWarehouses = locations.filter((location) => location.type === 'Customer Warehouse')

  return <ArrivalSection
    step="1"
    title="Batch Details"
    description="Set the context for this packaging arrival."
  >
    <div className="grid gap-4 md:grid-cols-2">
      <Input
        label="Batch Name"
        placeholder="October Supplier Batch"
        required
        value={values.batchName}
        onChange={(event) => onChange('batchName', event.target.value)}
      />
      <Select
        label="Supplier"
        required
        value={values.supplierId}
        onChange={(event) => onChange('supplierId', event.target.value)}
        options={[
          { value: '', label: 'Select supplier' },
          ...suppliers.map((supplier) => ({ value: supplier.id, label: supplier.name })),
        ]}
      />
      <Select
        label="Receiving Warehouse"
        required
        value={values.receivingLocationId}
        onChange={(event) => onChange('receivingLocationId', event.target.value)}
        options={[
          { value: '', label: 'Select receiving warehouse' },
          ...customerWarehouses.map((location) => ({ value: location.id, label: location.name })),
        ]}
      />
      <Input
        label="Date"
        type="date"
        required
        value={values.date}
        onChange={(event) => onChange('date', event.target.value)}
      />
      <label className="flex flex-col gap-1.5 md:col-span-2" htmlFor="arrival-notes">
        <span className="text-xs font-semibold text-[var(--text)]">Notes</span>
        <textarea
          id="arrival-notes"
          className="min-h-20 w-full resize-y rounded-lg border border-[var(--border-strong)] bg-white px-3 py-2.5 text-sm text-[var(--text)] outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100"
          placeholder="Add optional notes about this arrival"
          value={values.notes}
          onChange={(event) => onChange('notes', event.target.value)}
        />
      </label>
    </div>
  </ArrivalSection>
}
