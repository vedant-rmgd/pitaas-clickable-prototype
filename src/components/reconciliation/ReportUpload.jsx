import { useRef, useState } from 'react'
import { FileSpreadsheet, Upload, X } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const allowedExtensions = ['xlsx', 'xls', 'csv']

function formatFileSize(bytes) {
  if (!bytes) return 'Size unavailable'
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ReportUpload({ file, error, onFileChange }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = (nextFile) => {
    if (!nextFile) return
    const extension = nextFile.name.split('.').pop()?.toLowerCase()
    if (!allowedExtensions.includes(extension)) {
      onFileChange(null, 'Please upload an Excel or CSV file.')
      return
    }
    onFileChange(nextFile, '')
  }

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    handleFile(event.dataTransfer.files?.[0])
  }

  const removeFile = () => {
    if (inputRef.current) inputRef.current.value = ''
    onFileChange(null, '')
  }

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Upload ES Stock Report</h2>
      <p className="mt-1 text-sm leading-5 text-(--text-muted)">Upload the monthly stock file shared by the Equipment Supplier.</p>
    </div>
    <div className="p-5 sm:p-6">
      {!file ? <div
        className={`rounded-xl border border-dashed px-5 py-8 text-center transition-colors sm:px-6 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-(--border-strong) bg-(--surface-muted)'}`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Upload size={22} className="mx-auto text-(--primary)" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-(--text)">Drag and drop or choose a file</p>
        <p className="mt-1 text-xs text-(--text-muted)">Supported: XLSX, XLS, CSV</p>
        <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" className="sr-only" onChange={handleInputChange} />
        <Button variant="secondary" className="mt-4" onClick={() => inputRef.current?.click()}>
          Choose File
        </Button>
      </div> : <div className="flex flex-col gap-4 rounded-xl border border-green-200 bg-green-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm"><FileSpreadsheet size={18} aria-hidden="true" /></span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-green-800">Selected File</p>
            <p className="truncate text-sm font-semibold text-green-950">{file.name}</p>
            <p className="mt-0.5 text-xs text-green-800">{formatFileSize(file.size)}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone="success">Ready</Badge>
          <Button variant="secondary" className="!px-2.5" aria-label="Remove selected file" onClick={removeFile}>
            <X size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>}
      {error && <p className="mt-3 text-xs font-medium text-(--danger)" role="alert">{error}</p>}
    </div>
  </Card>
}
