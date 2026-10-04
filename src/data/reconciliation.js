import { qrItems } from './qrItems.js'

export const reconciliationItemTypes = [
  { key: 'caps', label: 'Caps', singular: 'Cap', type: 'Cap' },
  { key: 'sleeves', label: 'Sleeves', singular: 'Sleeve', type: 'Sleeve' },
  { key: 'pallets', label: 'Pallets', singular: 'Pallet', type: 'Pallet' },
]

export const reconciliationRecords = [
  {
    locationId: 'abc-equipment-supplier-mumbai',
    month: '2026-09',
    reported: { caps: 5, sleeves: 25, pallets: 12 },
  },
  {
    locationId: 'abc-equipment-supplier-mumbai',
    month: '2026-10',
    reported: { caps: 5, sleeves: 24, pallets: 12 },
  },
  {
    locationId: 'xyz-equipment-supplier-pune',
    month: '2026-09',
    reported: { caps: 0, sleeves: 0, pallets: 0 },
  },
]

export function getPitaasStock(locationId) {
  return reconciliationItemTypes.reduce((stock, itemType) => ({
    ...stock,
    [itemType.key]: qrItems.filter((item) => item.currentLocationId === locationId && item.type === itemType.type).length,
  }), {})
}

export function getReconciliationRecord(locationId, month) {
  return reconciliationRecords.find((record) => record.locationId === locationId && record.month === month)
}
