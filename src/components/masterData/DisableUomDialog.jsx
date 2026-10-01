import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function DisableUomDialog({ open, uom, onClose, onConfirm }) {
  return <Dialog open={open} onClose={onClose} className="disable-uom-dialog" title="Disable unit?" footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm}>Disable unit</Button></>}>
    <div className="disable-uom-content">
      <p>Disable {uom?.unitName} ({uom?.id})? It will no longer be available for new inventory quantities.</p>
      <div className="disable-uom-warning">Disabling a UoM does not remove its existing transaction history.</div>
    </div>
  </Dialog>
}
