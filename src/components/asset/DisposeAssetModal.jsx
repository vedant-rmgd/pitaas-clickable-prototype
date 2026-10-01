import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

export function DisposeAssetModal({ asset, open, onClose }) {
  const [reason, setReason] = useState('')
  const handleSubmit = (event) => { event.preventDefault(); if (reason.trim().length >= 10) onClose() }

  return <Dialog open={open} onClose={onClose} className="asset-dispose-dialog" title={`Dispose asset ${asset.name}?`} description="Choose the next approval step and provide a clear reason for the asset disposal." footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form="dispose-asset-form" variant="danger" disabled={reason.trim().length < 10}>Initiate disposal</Button></>}>
    <form id="dispose-asset-form" className="asset-form" onSubmit={handleSubmit}>
      <Select label="Action" options={[{ value: 'initiate', label: 'Initiate (request approval)' }, { value: 'approve', label: 'Approve' }, { value: 'reject', label: 'Reject' }]} />
      <p className="asset-form-help">Initiate requests approval. Approve marks the asset disposed. Reject cancels a pending initiation.</p>
      <label className="field" htmlFor="disposal-reason"><span className="field__label">Reason <em>*</em></span><textarea id="disposal-reason" className="textarea-control" placeholder="e.g. sold: end-of-life laptop sold to vendor" value={reason} onChange={(event) => setReason(event.target.value)} required /></label>
      <p className="asset-form-help">At least 10 characters. Prefix with `sold:` to mark the asset Sold; otherwise Scrapped.</p>
      <Input label="Disposal date" type="date" defaultValue="2026-09-30" hint="Defaults to today. ISO date (YYYY-MM-DD)." />
    </form>
  </Dialog>
}
