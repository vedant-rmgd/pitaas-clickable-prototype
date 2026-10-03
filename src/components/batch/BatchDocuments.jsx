import { useState } from 'react'
import { FileText } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Dialog } from '../ui/Dialog'
import { formatDate } from '../../utils/formatDate'

export function BatchDocuments({ documents }) {
  const [previewDocument, setPreviewDocument] = useState(null)

  return <>
    <Card className="!p-0 !overflow-hidden">
      <div className="border-b border-(--border) px-5 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-(--text)">Documents</h2>
        <p className="mt-1 text-sm text-(--text-muted)">Invoices and receipts attached to this batch.</p>
      </div>
      {documents.length === 0 ? <div className="px-5 py-12 text-center sm:px-6">
        <p className="text-sm font-semibold text-(--text)">No documents attached yet</p>
      </div> : <div className="divide-y divide-(--border)">
        {documents.map((document) => <div key={document.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--primary-soft) text-(--primary)"><FileText size={18} aria-hidden="true" /></span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-(--text)" title={document.name}>{document.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-(--text-muted)">
                <Badge tone="neutral">{document.type}</Badge>
                <span>Uploaded {formatDate(document.uploadedDate)}</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" className="self-start sm:self-auto" onClick={() => setPreviewDocument(document)}>View</Button>
        </div>)}
      </div>}
    </Card>
    <Dialog
      open={Boolean(previewDocument)}
      onClose={() => setPreviewDocument(null)}
      title="Invoice Preview"
      description={previewDocument?.name}
      footer={null}
    >
      <div className="flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed border-(--border-strong) bg-(--surface-muted) px-5 py-8 text-center">
        <FileText size={28} className="text-(--text-muted)" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold text-(--text)">{previewDocument?.name}</p>
        <p className="mt-1 text-sm text-(--text-muted)">Document preview is simulated in this prototype.</p>
      </div>
    </Dialog>
  </>
}
