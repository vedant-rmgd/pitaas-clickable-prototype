import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'

export function EditAssetModal({ asset, open, onClose }) {
  const [form, setForm] = useState(() => ({ name: asset.name, location: asset.location === '—' ? '' : asset.location, custodian: asset.custodian === '—' ? '' : asset.custodian, branchCode: '', qrCode: asset.qrCode ?? '', notes: '' }))
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const handleSave = (event) => { event.preventDefault(); onClose() }

  return <Dialog open={open} onClose={onClose} className="asset-edit-dialog" title={`Edit asset: ${asset.name}`} description="Update the asset's operational details. Immutable asset identity fields are managed by the system." footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form="edit-asset-form">Save changes</Button></>}>
    <form id="edit-asset-form" className="asset-form" onSubmit={handleSave}><div className="asset-form-grid">
      <Input label="Asset name" value={form.name} onChange={(event) => update('name', event.target.value)} />
      <Input label="Location" value={form.location} onChange={(event) => update('location', event.target.value)} />
      <Input label="Custodian" value={form.custodian} onChange={(event) => update('custodian', event.target.value)} />
      <Input label="Branch code" value={form.branchCode} onChange={(event) => update('branchCode', event.target.value)} />
      <Input label="QR code" value={form.qrCode} onChange={(event) => update('qrCode', event.target.value)} />
      <label className="field asset-notes-field" htmlFor="asset-notes"><span className="field__label">Notes</span><textarea id="asset-notes" className="textarea-control" value={form.notes} onChange={(event) => update('notes', event.target.value)} /></label>
    </div></form>
  </Dialog>
}
