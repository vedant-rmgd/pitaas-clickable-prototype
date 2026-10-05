import { batches } from './batches.js'
import { getLocationType } from '../utils/locationHelpers.js'
import { formatQrId } from '../utils/qrId.js'

function getLocationStatus(locationId) {
  const locationType = getLocationType(locationId)
  if (locationType === 'Equipment Supplier Warehouse') return 'At Equipment Supplier'
  if (locationType === 'Company Site(Pickup)') return 'At Company'
  if (locationType === 'Co-located Warehouse (CLW)') return 'At CLW'
  if (locationType === 'In Transit') return 'In Transit'
  return 'At Warehouse'
}

function createBatchQrItems(batch, startIndex) {
  const typeSequence = [
    ...Array.from({ length: batch.composition.caps }, () => 'Cap'),
    ...Array.from({ length: batch.composition.sleeves }, () => 'Sleeve'),
    ...Array.from({ length: batch.composition.pallets }, () => 'Pallet'),
  ]
  let locationIndex = 0
  let locationItemsRemaining = batch.locationDistribution[0]?.itemCount ?? 0

  return typeSequence.map((type, index) => {
    if (locationItemsRemaining === 0 && locationIndex < batch.locationDistribution.length - 1) {
      locationIndex += 1
      locationItemsRemaining = batch.locationDistribution[locationIndex].itemCount
    }
    const location = batch.locationDistribution[locationIndex]
    locationItemsRemaining -= 1
    const lastScanType = getLocationType(location.locationId) === 'In Transit' ? 'OUT' : 'IN'
    const hour = String(10 + (index % 8)).padStart(2, '0')

    return {
      qrId: formatQrId(startIndex + index + 1),
      batchId: batch.id,
      type,
      currentLocationId: location.locationId,
      status: getLocationStatus(location.locationId),
      lastScanType,
      lastScanDate: `${batch.createdDate}T${hour}:30:00`,
    }
  })
}

export const qrItems = batches.reduce((items, batch) => [...items, ...createBatchQrItems(batch, items.length)], [])
