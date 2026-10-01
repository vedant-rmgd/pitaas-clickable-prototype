import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function DeleteAssetModal({ asset, open, onClose }) {
  return <Dialog open={open} onClose={onClose} title="Delete asset?" footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onClose}>Delete asset</Button></>}>
    <div className="delete-asset-copy"><p>This will permanently delete <strong>{asset.name}</strong>. This action cannot be undone.</p><p>Assets with non-zero book value cannot be hard-deleted; you must dispose them first.</p></div>
  </Dialog>
}
