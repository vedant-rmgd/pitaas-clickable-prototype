import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { Dialog } from '../ui/Dialog'
import { QrScanner } from '../scan/QrScanner'

export function ItemScanDialog({ open, onClose, itemType, expectedCount, scannedItems, demoQrIds = [], onScan, onRemove }) {
  const [cameraOpen, setCameraOpen] = useState(false)
  const scannedCount = scannedItems.length
  const remainingCount = Math.max(expectedCount - scannedCount, 0)
  const isComplete = scannedCount >= expectedCount
  const availableDemoQrIds = demoQrIds.filter((qrId) => !scannedItems.some((item) => item.qrId === qrId))

  const handleClose = () => {
    setCameraOpen(false)
    onClose()
  }

  return <>
    <Dialog
      open={open}
      onClose={handleClose}
      title={`Scan ${itemType}s`}
      description={`Scan or enter the QR ID attached to each ${itemType}.`}
      className={`w-full max-w-5xl transition-opacity ${cameraOpen ? 'pointer-events-none opacity-0' : ''}`}
      footer={null}
    >
      <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3 rounded-lg border border-(--border) bg-(--surface-muted) p-4 text-center">
        <div>
          <span className="block text-xs font-medium text-(--text-muted)">Expected</span>
          <strong className="mt-1 block text-xl font-semibold text-(--text)">{expectedCount}</strong>
        </div>
        <div>
          <span className="block text-xs font-medium text-(--text-muted)">Scanned</span>
          <strong className="mt-1 block text-xl font-semibold text-(--text)">{scannedCount}</strong>
        </div>
        <div>
          <span className="block text-xs font-medium text-(--text-muted)">Remaining</span>
          <strong className="mt-1 block text-xl font-semibold text-(--text)">{remainingCount}</strong>
        </div>
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-5 text-blue-800">
        Make sure QR labels are attached to the physical items before scanning.
      </div>

      <QrScanner
        disabled={isComplete}
        onScan={onScan}
        demoQrIds={availableDemoQrIds}
        autoFocus={open}
        stackCameraAction
        onCameraStateChange={setCameraOpen}
        helperText="Press Enter after each QR ID to add it to this first In Scan."
      />

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-(--text)">Scanned {itemType}s</h3>
          <Badge tone={isComplete ? 'success' : scannedCount > 0 ? 'info' : 'neutral'}>{isComplete ? 'Completed' : `${scannedCount} / ${expectedCount}`}</Badge>
        </div>
        {scannedItems.length > 0 ? <ol className="max-h-56 divide-y divide-(--border) overflow-y-auto rounded-lg border border-(--border)">
          {scannedItems.map((item, index) => <li key={item.qrId} className="flex items-center justify-between gap-3 bg-white px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-3 text-sm text-(--text)"><span className="w-5 text-xs text-(--text-muted)">{index + 1}.</span><strong className="truncate">{item.qrId}</strong></span>
            <button type="button" className="shrink-0 text-xs font-semibold text-(--danger) hover:text-red-700" onClick={() => onRemove(item.qrId)}>Remove</button>
          </li>)}
        </ol> : <p className="rounded-lg border border-dashed border-(--border-strong) px-3 py-6 text-center text-sm text-(--text-muted)">No QR IDs scanned yet.</p>}
      </div>
      </div>
    </Dialog>
  </>
}
