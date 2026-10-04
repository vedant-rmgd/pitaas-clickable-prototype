import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { ArrivalSection } from './ArrivalSection'
import { arrivalItemTypes } from '../../data/arrivalItemTypes'
import { getSupplierName } from '../../utils/supplierHelpers'

function ReviewGroup({ title, rows }) {
  return <div>
    <h3 className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">{title}</h3>
    <dl className="mt-3 grid gap-x-5 gap-y-3 sm:grid-cols-2">
      {rows.map(([label, value]) => <div key={label}>
        <dt className="text-xs font-medium text-(--text-muted)">{label}</dt>
        <dd className="mt-1 break-words text-sm font-semibold text-(--text)">{value}</dd>
      </div>)}
    </dl>
  </div>
}

export function ArrivalReview({ values, locations, expectedItems, scannedItems, documentName, canSave, scansComplete, remainingItems, onSave }) {
  const supplierName = getSupplierName(values.supplierId, 'Not selected')
  const locationName = locations.find((location) => location.id === values.receivingLocationId)?.name ?? 'Not selected'
  const totalScanned = arrivalItemTypes.reduce((total, item) => total + scannedItems[item.key].length, 0)

  return <ArrivalSection
    step="6"
    title="Review Arrival"
    description="Review the arrival details before saving it."
  >
    <div className="space-y-5 rounded-lg border border-(--border) bg-(--surface-muted) p-4 sm:p-5">
      <ReviewGroup title="Batch details" rows={[
        ['Batch Name', values.batchName.trim() || 'Not entered'],
        ['Supplier', supplierName],
        ['Receiving Warehouse', locationName],
        ['Date', values.date || 'Not selected'],
      ]} />
      <div className="border-t border-(--border) pt-5">
        <ReviewGroup title="Received" rows={[
          ['Universal Sets', values.receiveUniversalSets ? values.universalSetCount : 0],
          ['Extra Caps', values.receiveIndividualItems ? values.extraCaps : 0],
          ['Extra Sleeves', values.receiveIndividualItems ? values.extraSleeves : 0],
          ['Extra Pallets', values.receiveIndividualItems ? values.extraPallets : 0],
        ]} />
      </div>
      <div className="border-t border-(--border) pt-5">
        <ReviewGroup title="Expected items" rows={[
          ['Caps', expectedItems.caps],
          ['Sleeves', expectedItems.sleeves],
          ['Pallets', expectedItems.pallets],
          ['Total', expectedItems.total],
        ]} />
      </div>
      <div className="border-t border-(--border) pt-5">
        <ReviewGroup title="Scanned items" rows={[
          ['Caps', `${scannedItems.caps.length} / ${expectedItems.caps}`],
          ['Sleeves', `${scannedItems.sleeves.length} / ${expectedItems.sleeves}`],
          ['Pallets', `${scannedItems.pallets.length} / ${expectedItems.pallets}`],
          ['Total', `${totalScanned} / ${expectedItems.total}`],
        ]} />
      </div>
      <div className="border-t border-(--border) pt-5">
        <ReviewGroup title="Document" rows={[['Invoice / Receipt', documentName || 'No document uploaded']]} />
      </div>
    </div>
    <div className="mt-5 flex flex-col gap-3 border-t border-(--border) pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs leading-5 text-(--text-muted)">
        <Badge tone={scansComplete ? 'success' : 'warning'}>{scansComplete ? 'Ready to save' : 'Incomplete'}</Badge>
        <span>{scansComplete ? 'All expected items have been scanned.' : remainingItems > 0 ? `${remainingItems} expected item${remainingItems === 1 ? '' : 's'} have not been scanned yet.` : 'Complete the required arrival details to enable saving.'}</span>
      </div>
      <Button disabled={!canSave} onClick={onSave}>Save Arrival</Button>
    </div>
  </ArrivalSection>
}
