import { batches } from './batches.js'

function createQrId(batchId, type, sequence) {
  const batchCode = batchId.replace(/-batch$/, '').split('-').map((part) => part.slice(0, 3).toUpperCase()).join('-')
  return `${batchCode}-${type.slice(0, 3).toUpperCase()}-${String(sequence).padStart(3, '0')}`
}

function getLocationStatus(location) {
  if (location.locationType === 'Equipment Supplier Warehouse') return 'At Equipment Supplier'
  if (location.locationType === 'Company Site') return 'At Company'
  if (location.locationType === 'Co-located Warehouse (CLW)') return 'At CLW'
  if (location.locationType === 'In Transit') return 'In Transit'
  return 'At Warehouse'
}

function createBatchQrItems(batch) {
  const typeSequence = [
    ...Array.from({ length: batch.composition.caps }, () => 'Cap'),
    ...Array.from({ length: batch.composition.sleeves }, () => 'Sleeve'),
    ...Array.from({ length: batch.composition.pallets }, () => 'Pallet'),
  ]
  const typeCounts = { Cap: 0, Sleeve: 0, Pallet: 0 }
  let locationIndex = 0
  let locationItemsRemaining = batch.locationDistribution[0]?.itemCount ?? 0

  return typeSequence.map((type, index) => {
    if (locationItemsRemaining === 0 && locationIndex < batch.locationDistribution.length - 1) {
      locationIndex += 1
      locationItemsRemaining = batch.locationDistribution[locationIndex].itemCount
    }
    const location = batch.locationDistribution[locationIndex]
    typeCounts[type] += 1
    locationItemsRemaining -= 1
    const lastScanType = location.locationType === 'In Transit' ? 'OUT' : 'IN'
    const hour = String(10 + (index % 8)).padStart(2, '0')

    return {
      qrId: createQrId(batch.id, type, typeCounts[type]),
      batchId: batch.id,
      type,
      currentLocationId: location.locationId,
      currentLocationName: location.locationName,
      status: getLocationStatus(location),
      lastScanType,
      lastScanDate: `${batch.createdDate}T${hour}:30:00`,
    }
  })
}

export const qrItems = batches.flatMap(createBatchQrItems)
