import { useRef, useState } from 'react'
import { Camera, Plus, ScanLine } from 'lucide-react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { formatQrId } from '../../utils/qrId'

export function QrScanner({ disabled = false, onScan, demoQrIds = [], helperText = 'Scan each physical item using its existing QR ID.', autoFocus = false }) {
  const [qrId, setQrId] = useState('')
  const [error, setError] = useState('')
  const [cameraOpen, setCameraOpen] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const inputRef = useRef(null)
  const demoScanNumber = useRef(0)

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
    if (!result.success) setError(result.error)
  }

  const handleSimulateScan = () => {
    if (disabled) return
    demoScanNumber.current += 1
    const demoQrId = demoQrIds[0] ?? formatQrId(demoScanNumber.current)
    const result = addQrId(demoQrId)
    setCameraError(result.success ? '' : result.error)
  }

  return <>
    <div className="rounded-lg border border-(--border) bg-(--surface-muted) p-4 sm:p-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Button variant="success" disabled={disabled} className="justify-center sm:shrink-0" onClick={() => {
        setCameraError('')
        setCameraOpen(true)
      }}>
        <Camera size={17} aria-hidden="true" />
        Scan with Camera
      </Button>
      <div className="flex items-center gap-3 text-xs text-(--text-muted)" aria-hidden="true">
        <span className="h-px flex-1 bg-(--border) sm:hidden" />
        <span>or</span>
        <span className="h-px flex-1 bg-(--border) sm:hidden" />
      </div>
      <form className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-end" onSubmit={handleSubmit}>
        <label className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="sr-only">QR ID</span>
        <input
          ref={inputRef}
          type="text"
          value={qrId}
          disabled={disabled}
          onChange={(event) => {
            setQrId(event.target.value)
            if (error) setError('')
          }}
          placeholder="Enter QR ID manually"
          autoComplete="off"
          autoFocus={autoFocus}
          className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none placeholder:text-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
        />
        </label>
        <Button type="submit" variant="primary" disabled={disabled} className="justify-center sm:shrink-0">
        <Plus size={16} aria-hidden="true" />
        Add QR ID
        </Button>
      </form>
    </div>
    {error && <p className="mt-2 text-xs font-medium text-(--danger)" role="alert">{error}</p>}
    <p className="mt-3 text-xs leading-5 text-(--text-muted)">{helperText}</p>
    </div>

    <Dialog
      open={cameraOpen}
      onClose={() => setCameraOpen(false)}
      title="Scan with Camera"
      description="Use the simulated camera preview to add an item to this scan."
      footer={null}
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
        {cameraError && <p className="text-xs font-medium text-(--danger)" role="alert">{cameraError}</p>}
        <Button className="w-full justify-center" onClick={handleSimulateScan}>
          <ScanLine size={17} aria-hidden="true" />
          Simulate QR Scan
        </Button>
        <p className="text-center text-xs leading-5 text-(--text-muted)">This prototype simulates a camera result and does not access your device camera.</p>
      </div>
    </Dialog>
  </>
}
