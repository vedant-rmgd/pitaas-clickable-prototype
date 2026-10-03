import { ScanLine } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { ArrivalSection } from './ArrivalSection'
import { arrivalItemTypes } from '../../data/arrivalItemTypes'

export function ScanItemsSection({ expectedItems, scannedItems, onOpenScanner }) {
  const totalScanned = arrivalItemTypes.reduce((total, item) => total + scannedItems[item.key].length, 0)
  const totalExpected = expectedItems.total

  return <ArrivalSection
    step="4"
    title="In Scan Items"
    description="The first scan will register each QR-coded item and receive it into the selected warehouse."
  >
    <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-5 text-blue-800">
      Make sure QR labels are attached to the physical items before scanning.
    </div>
    <div className="divide-y divide-(--border) overflow-hidden rounded-lg border border-(--border)">
      {arrivalItemTypes.map((item) => {
        const expectedCount = expectedItems[item.expectedKey]
        const scannedCount = scannedItems[item.key].length
        const isComplete = expectedCount > 0 && scannedCount >= expectedCount
        const status = expectedCount === 0 ? 'Not needed' : isComplete ? 'Completed' : scannedCount > 0 ? 'In progress' : 'Not started'
        const buttonLabel = expectedCount === 0 ? 'Not needed' : isComplete ? 'View scans' : scannedCount > 0 ? 'Continue scan' : `Scan ${item.label}`

        return <div key={item.key} className="flex flex-col gap-3 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-(--text)">{item.label}</p>
            <Badge tone={isComplete ? 'success' : scannedCount > 0 ? 'info' : 'neutral'}>{status}</Badge>
          </div>
          <p className="mt-1 text-xs text-(--text-muted)">{scannedCount} / {expectedCount} scanned</p>
        </div>
        <Button variant="secondary" disabled={expectedCount === 0} onClick={() => onOpenScanner(item)}>
          <ScanLine size={16} aria-hidden="true" />
          {buttonLabel}
        </Button>
      </div>
      })}
    </div>
    <div className="mt-4 flex items-center justify-between rounded-lg border border-(--border) bg-(--surface-muted) px-4 py-3">
      <span className="text-sm font-semibold text-(--text)">Total progress</span>
      <span className="text-sm font-semibold text-(--text)">Scanned: {totalScanned} / {totalExpected}</span>
    </div>
  </ArrivalSection>
}
