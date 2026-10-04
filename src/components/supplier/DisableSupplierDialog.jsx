import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function DisableSupplierDialog({ open, supplier, onClose, onConfirm }) {
  return <Dialog
    open={open}
    onClose={onClose}
    className="disable-supplier-dialog"
    title="Disable Supplier?"
    footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="danger" onClick={onConfirm}>Disable Supplier</Button></>}
  >
    <div className="flex flex-col gap-4 text-sm leading-6 text-(--text-muted)">
      <p><strong className="font-semibold text-(--text)">{supplier?.name}</strong> will no longer be available for new operational selections.</p>
      <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">The supplier will remain visible for historical records and can be enabled again later.</p>
    </div>
  </Dialog>
}
