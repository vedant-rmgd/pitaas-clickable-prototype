import { Package } from 'lucide-react'
import { Dialog } from '../ui/Dialog'

export function GenerateUnitQrModal({ open, onClose }) {
  return <Dialog open={open} onClose={onClose} title="Generate 10 Unit QR Codes" description="Generate QR codes for individually tracked units. This demo does not save changes."><div className="dialog-placeholder"><Package size={22} /><span>Unit generation remains a static prototype action with a count of 10.</span></div></Dialog>
}
