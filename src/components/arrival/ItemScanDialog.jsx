import { useEffect, useRef, useState } from 'react'
import { Camera, ScanLine } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'

export function ItemScanDialog({ open, onClose, itemType, expectedCount, scannedItems, onScan, onRemove }) {
  const [qrId, setQrId] = useState('')
  const [error, setError] = useState('')
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const inputRef = useRef(null)
  const demoScanNumber = useRef(0)
  const scannedCount = scannedItems.length
  const remainingCount = Math.max(expectedCount - scannedCount, 0)
  const isComplete = scannedCount >= expectedCount

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
  }, [open, itemType])

  const addQrId = (value) => {
    const result = onScan(value)
    if (!result.success) return result

    setQrId('')
    setError('')
    requestAnimationFrame(() => inputRef.current?.focus())
    return result
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = addQrId(qrId)
    if (!result.success) {
      setError(result.error)
    }
  }

  const handleSimulateScan = () => {
    if (isComplete) return

    demoScanNumber.current += 1
    const demoQrId = `DEMO-${itemType.toUpperCase()}-${String(demoScanNumber.current).padStart(3, '0')}`
    const result = addQrId(demoQrId)
    setCameraError(result.success ? '' : result.error)
  }

  return <>
    <Dialog
      open={open}
      onClose={onClose}
      title={`Scan ${itemType}s`}
      description={`Scan or enter the QR ID attached to each ${itemType}.`}
      className="w-full max-w-xl"
      footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
    >
      <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4 text-center">
        <div>
          <span className="block text-xs font-medium text-[var(--text-muted)]">Expected</span>
          <strong className="mt-1 block text-xl font-semibold text-[var(--text)]">{expectedCount}</strong>
        </div>
        <div>
          <span className="block text-xs font-medium text-[var(--text-muted)]">Scanned</span>
          <strong className="mt-1 block text-xl font-semibold text-[var(--text)]">{scannedCount}</strong>
        </div>
        <div>
          <span className="block text-xs font-medium text-[var(--text-muted)]">Remaining</span>
          <strong className="mt-1 block text-xl font-semibold text-[var(--text)]">{remainingCount}</strong>
        </div>
      </div>

      <Button className="w-full justify-center" disabled={isComplete} onClick={() => {
        setCameraError('')
        setCameraOpen(true)
      }}>
        <Camera size={17} aria-hidden="true" />
        Scan with Camera
      </Button>

      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]" aria-hidden="true">
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span>or</span>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-5 text-blue-800">
        Make sure QR labels are attached to the physical items before scanning.
      </div>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1.5" htmlFor={`qr-id-${itemType.toLowerCase()}`}>
          <span className="text-xs font-semibold text-[var(--text)]">QR ID</span>
          <input
            ref={inputRef}
            id={`qr-id-${itemType.toLowerCase()}`}
            value={qrId}
            onChange={(event) => {
              setQrId(event.target.value)
              if (error) setError('')
            }}
            placeholder="Scan or enter QR ID"
            autoComplete="off"
            disabled={isComplete}
            className="h-11 w-full rounded-lg border border-[var(--border-strong)] bg-white px-3 text-base text-[var(--text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
          />
        </label>
        {error && <p className="text-xs font-medium text-[var(--danger)]" role="alert">{error}</p>}
        <p className="text-xs text-[var(--text-muted)]">Press Enter after each QR ID to add it to this first In Scan.</p>
      </form>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-[var(--text)]">Scanned {itemType}s</h3>
          <Badge tone={isComplete ? 'success' : scannedCount > 0 ? 'info' : 'neutral'}>{isComplete ? 'Completed' : `${scannedCount} / ${expectedCount}`}</Badge>
        </div>
        {scannedItems.length > 0 ? <ol className="max-h-56 divide-y divide-[var(--border)] overflow-y-auto rounded-lg border border-[var(--border)]">
          {scannedItems.map((item, index) => <li key={item.qrId} className="flex items-center justify-between gap-3 bg-white px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-3 text-sm text-[var(--text)]"><span className="w-5 text-xs text-[var(--text-muted)]">{index + 1}.</span><strong className="truncate">{item.qrId}</strong></span>
            <button type="button" className="shrink-0 text-xs font-semibold text-[var(--danger)] hover:text-red-700" onClick={() => onRemove(item.qrId)}>Remove</button>
          </li>)}
        </ol> : <p className="rounded-lg border border-dashed border-[var(--border-strong)] px-3 py-6 text-center text-sm text-[var(--text-muted)]">No QR IDs scanned yet.</p>}
      </div>
      </div>
    </Dialog>

    <Dialog
      open={cameraOpen}
      onClose={() => setCameraOpen(false)}
      title={`Scan ${itemType}s with Camera`}
      description="Use the simulated camera preview to test the first In Scan flow."
      className="w-full max-w-lg"
      footer={<Button variant="secondary" onClick={() => setCameraOpen(false)}>Done</Button>}
    >
      <div className="space-y-4">
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-900 px-6 py-10 text-center">
          <div className="absolute inset-8 rounded-xl border-2 border-dashed border-white/70" aria-hidden="true" />
          <div className="relative z-10 text-white">
            <Camera size={32} className="mx-auto text-blue-200" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold">Camera preview</p>
            <p className="mt-1 text-xs text-slate-300">Point the camera at the QR code.</p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm">
          <span className="text-[var(--text-muted)]">{itemType} progress</span>
          <strong className="text-[var(--text)]">{scannedCount} / {expectedCount}</strong>
        </div>
        {cameraError && <p className="text-xs font-medium text-[var(--danger)]" role="alert">{cameraError}</p>}
        <Button className="w-full justify-center" disabled={isComplete} onClick={handleSimulateScan}>
          <ScanLine size={17} aria-hidden="true" />
          Simulate QR Scan
        </Button>
        <p className="text-center text-xs leading-5 text-[var(--text-muted)]">This prototype simulates a camera result and does not access your device camera.</p>
      </div>
    </Dialog>
  </>
}
