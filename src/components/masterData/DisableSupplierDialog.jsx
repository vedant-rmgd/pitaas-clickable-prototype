import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function DisableSupplierDialog({ open, supplier, onClose, onConfirm }) {
  return <Dialog open={open} onClose={onClose} className="disable-supplier-dialog" title="Disable supplier?" footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm}>Disable supplier</Button></>}>
    <div className="disable-supplier-content">
      <p>Disable {supplier?.name} ({supplier?.id})? It will no longer be available for new purchasing documents.</p>
      <div className="disable-supplier-warning">Disabling a supplier does not remove its existing transaction history.</div>
    </div>
  </Dialog>
}
