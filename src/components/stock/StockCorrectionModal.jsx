import { useState } from 'react'
import { stockCorrectionFormRows } from '../../data/stockCorrections'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

export function StockCorrectionModal({ open, onClose }) {
  const [correctionReason, setCorrectionReason] = useState('')
  const [formError, setFormError] = useState('')
  const [rows, setRows] = useState(() => stockCorrectionFormRows.map((row) => ({ ...row })))

  const updateRow = (index, field, value) => setRows((currentRows) => currentRows.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: value } : row))
  const removeRow = (index) => setRows((currentRows) => currentRows.length > 1 ? currentRows.filter((_, rowIndex) => rowIndex !== index) : currentRows)
  const addRow = () => setRows((currentRows) => [...currentRows, { itemCode: 'PLT-003', warehouse: 'Pune Central', uom: 'Nos', quantity: '', note: '' }])
  const handleSave = (event) => {
    event.preventDefault()
    if (!correctionReason.trim()) {
      setFormError('Correction reason is required.')
      return
    }
    setFormError('')
    onClose()
  }

  return <Dialog open={open} onClose={onClose} className="stock-correction-dialog" title="Record Stock Correction" description="Correct the recorded stock quantity for one or more items. A reason is required for tracking and audit history." footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form="stock-correction-form">Save Correction</Button></>}>
    <form id="stock-correction-form" className="stock-correction-form" onSubmit={handleSave}>
      <div className="stock-correction-form__top"><Select label="Purpose" defaultValue="other" required options={[{ value: 'other', label: 'Other' }, { value: 'cycle-count', label: 'Cycle Count Correction' }, { value: 'damage', label: 'Damage Write-Off' }, { value: 'found', label: 'Found Stock' }]} /><Input label="Branch" placeholder="e.g. CC-001" required /></div>
      <div className="correction-details"><div className="correction-details__heading"><h3>Items</h3><p>Add each item and the adjustment details.</p></div>{rows.map((row, index) => <div className="correction-row" key={index}>
        <div className="correction-row__header"><div><h4>Item {index + 1}</h4><p>Correction details</p></div><button type="button" className="remove-row" onClick={() => removeRow(index)} disabled={rows.length === 1}>Remove</button></div>
        <div className="correction-row__fields"><Input id={`item-code-${index}`} label={`Item code (item ${index + 1})`} value={row.itemCode} onChange={(event) => updateRow(index, 'itemCode', event.target.value)} required placeholder="e.g. ITEM-001" /><Input id={`warehouse-${index}`} label={`Warehouse (item ${index + 1})`} value={row.warehouse} onChange={(event) => updateRow(index, 'warehouse', event.target.value)} required placeholder="e.g. Main Warehouse" /><Input id={`quantity-${index}`} label={`New stock quantity (item ${index + 1})`} type="number" value={row.quantity} onChange={(event) => updateRow(index, 'quantity', event.target.value)} required /><Input id={`uom-${index}`} label={`UOM (item ${index + 1})`} value={row.uom} onChange={(event) => updateRow(index, 'uom', event.target.value)} required placeholder="e.g. Nos" /></div>
        <Input id={`item-note-${index}`} label={`Item note (item ${index + 1}, optional)`} value={row.note} onChange={(event) => updateRow(index, 'note', event.target.value)} placeholder="Optional note for this item" />
      </div>)}</div>
      <Button variant="secondary" className="add-item-button" type="button" onClick={addRow}>Add another item</Button>
      <label className="field correction-reason-field" htmlFor="correction-reason"><span className="field__label">Correction reason</span><textarea id="correction-reason" className={`textarea-control ${formError ? 'control--error' : ''}`} value={correctionReason} onChange={(event) => { setCorrectionReason(event.target.value); setFormError('') }} required /></label>
      {formError && <span className="field__message field__message--error">{formError}</span>}
    </form>
  </Dialog>
}
