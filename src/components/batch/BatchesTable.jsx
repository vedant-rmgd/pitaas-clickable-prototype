import { Badge } from '../ui/Badge'
import { formatDate } from '../../utils/formatDate'
import { batchStatusTones } from './batchStatus'
import { getSupplierName } from '../../utils/supplierHelpers'

function handleRowKeyDown(event, onRowClick, batch) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  onRowClick(batch)
}

export function BatchesTable({ batches, onRowClick, emptyMessage }) {
  return <div className="overflow-x-auto">
    <table className="min-w-190 w-full border-collapse text-left text-sm">
      <thead>
        <tr className="bg-(--surface-muted) text-xs uppercase tracking-wide text-(--text-muted)">
          <th scope="col" className="px-5 py-3 font-semibold">Batch Name</th>
          <th scope="col" className="px-5 py-3 font-semibold">Supplier</th>
          <th scope="col" className="px-5 py-3 font-semibold">Created Date</th>
          <th scope="col" className="px-5 py-3 text-right font-semibold">Total Items</th>
          <th scope="col" className="px-5 py-3 font-semibold">Status</th>
          <th scope="col" className="px-5 py-3 text-right font-semibold">Locations</th>
        </tr>
      </thead>
      <tbody>
        {batches.length === 0 ? <tr>
          <td colSpan="6" className="px-5 py-12 text-center">
            <p className="text-sm font-semibold text-(--text)">{emptyMessage?.title ?? 'No batches found'}</p>
            <p className="mt-1 text-sm text-(--text-muted)">{emptyMessage?.description ?? 'Try a different batch name or supplier.'}</p>
          </td>
        </tr> : batches.map((batch) => <tr
          key={batch.id}
          tabIndex="0"
          role="link"
          className="cursor-pointer border-t border-(--border) text-(--text) transition-colors hover:bg-amber-50 focus-visible:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-200"
          onClick={() => onRowClick(batch)}
          onKeyDown={(event) => handleRowKeyDown(event, onRowClick, batch)}
        >
          <td className="px-5 py-4 font-semibold">{batch.batchName}</td>
          <td className="px-5 py-4 text-(--text-muted)">{getSupplierName(batch.supplierId)}</td>
          <td className="whitespace-nowrap px-5 py-4 text-(--text-muted)">{formatDate(batch.createdDate)}</td>
          <td className="px-5 py-4 text-right font-semibold">{batch.totalItems}</td>
          <td className="px-5 py-4"><Badge tone={batchStatusTones[batch.status] ?? 'neutral'}>{batch.status}</Badge></td>
          <td className="px-5 py-4 text-right text-(--text-muted)">{batch.locationCount} {batch.locationCount === 1 ? 'location' : 'locations'}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
}
