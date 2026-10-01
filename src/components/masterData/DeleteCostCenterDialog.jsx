import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function DeleteCostCenterDialog({ open, costCenter, onClose, onConfirm }) {
  return <Dialog open={open} onClose={onClose} className="disable-cost-center-dialog" title="Delete cost center?" footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm}>Delete cost center</Button></>}>
    <div className="disable-cost-center-content">
      <p>Delete {costCenter?.name} ({costCenter?.id})? It will no longer be available for new transactions.</p>
      <div className="disable-cost-center-warning">Deleting a cost center does not remove its existing history.</div>
    </div>
  </Dialog>
}
