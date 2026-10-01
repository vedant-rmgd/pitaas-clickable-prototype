import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

export function NewWarehouseModal({ open, onClose }) {
  const [warehouseName, setWarehouseName] = useState('')

  return <Dialog open={open} onClose={onClose} className="warehouse-create-dialog" title="New Warehouse" description="Create a new warehouse for Apex Manufacturing Pvt Ltd." footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="button" disabled={!warehouseName.trim()} onClick={onClose}>Create</Button></>}>
    <form className="warehouse-form" onSubmit={(event) => { event.preventDefault(); onClose() }}>
      <div className="warehouse-form-grid">
        <Input label="Warehouse name" value={warehouseName} onChange={(event) => setWarehouseName(event.target.value)} placeholder="e.g. Apex-BLR Main" required />
        <Input label="Company" value="Apex Manufacturing Pvt Ltd" readOnly hint="Bound to your account; cannot be changed." />
        <Input label="Address" placeholder="Optional" />
        <Select label="Branch (Cost Center)" options={[{ value: 'none', label: '— (no cost center)' }, { value: 'main-ptc', label: 'Main - PTC' }]} hint="Optional. Pick one to scope the audit to a cost center." />
        <Select label="Warehouse group" options={[{ value: 'no', label: 'No — individual warehouse' }, { value: 'yes', label: 'Yes — warehouse group' }]} />
      </div>
    </form>
  </Dialog>
}
