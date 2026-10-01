import { Package } from 'lucide-react'
import { Dialog } from '../ui/Dialog'

export function SetItemQrModal({ open, onClose }) {
  return <Dialog open={open} onClose={onClose} title="Set Item QR Code" description="Set one QR value for this catalog item. This demo does not save changes."><div className="dialog-placeholder"><Package size={22} /><span>Item-level QR assignment is kept separate from individual unit QR codes.</span></div></Dialog>
}
