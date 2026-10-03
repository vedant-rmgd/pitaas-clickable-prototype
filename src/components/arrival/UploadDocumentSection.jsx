import { FileUp } from 'lucide-react'
import { ArrivalSection } from './ArrivalSection'

export function UploadDocumentSection({ file, onFileChange, onRemove }) {
  return <ArrivalSection
    step="5"
    title="Invoice / Receipt"
    description="Attach the supplier invoice or receipt to this arrival."
  >
    <div className="flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-(--border-strong) bg-(--surface-muted) px-5 py-7 text-center">
      <FileUp size={22} className="text-(--text-muted)" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold text-(--text)">{file ? 'Invoice or receipt selected' : 'Upload an invoice or receipt'}</p>
      <p className="mt-1 text-xs text-(--text-muted)">Upload the invoice or receipt for this arrival. PDF, PNG, JPG, and JPEG files are supported.</p>
      {file && <p className="mt-3 max-w-full truncate text-sm font-semibold text-(--text)" title={file.name}>{file.name}</p>}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <input
          id="arrival-document"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
          className="sr-only"
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
        <label htmlFor="arrival-document" className="button button--secondary cursor-pointer">
          {file ? 'Change file' : 'Choose a file'}
        </label>
        {file && <button type="button" className="button button--secondary" onClick={onRemove}>Remove</button>}
      </div>
    </div>
  </ArrivalSection>
}
