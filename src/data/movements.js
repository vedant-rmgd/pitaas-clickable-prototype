import { qrItems } from './qrItems.js'
import { getLocationIdByName } from '../utils/locationHelpers.js'

function getPendingQrIds(batchId) {
  return qrItems.filter((item) => item.batchId === batchId && item.currentLocationId === 'in-transit').map((item) => item.qrId)
}

function getQrIdsAtLocation(batchId, locationId) {
  return qrItems.filter((item) => item.batchId === batchId && item.currentLocationId === locationId).map((item) => item.qrId)
}

const octoberEsQrIds = getQrIdsAtLocation('october-supplier-batch', 'es-pune')
const octoberPendingQrIds = getPendingQrIds('october-supplier-batch')
const octoberMovedQrIds = [...octoberEsQrIds, ...octoberPendingQrIds]

const legacyMovements = [
  { id: 'movement-october-001', batchId: 'october-supplier-batch', date: '2026-10-01T10:30:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Solapur Warehouse', itemCount: 33, status: 'Completed' },
  { id: 'movement-october-002', batchId: 'october-supplier-batch', date: '2026-10-02T11:45:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', fromLocationId: 'solapur-warehouse', toLocation: 'Pune Equipment Supplier Warehouse', toLocationId: 'es-pune', itemCount: 15, itemQrIds: octoberMovedQrIds, status: 'Completed' },
  { id: 'movement-october-003', batchId: 'october-supplier-batch', date: '2026-10-03T09:20:00', scanType: 'IN', fromLocation: 'Solapur Warehouse', fromLocationId: 'solapur-warehouse', toLocation: 'Pune Equipment Supplier Warehouse', toLocationId: 'es-pune', itemCount: 14, itemQrIds: octoberEsQrIds, status: 'Completed' },
  { id: 'movement-october-004', batchId: 'october-supplier-batch', date: '2026-10-05T12:30:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', fromLocationId: 'solapur-warehouse', toLocation: 'Pune Equipment Supplier Warehouse', toLocationId: 'es-pune', itemCount: 1, itemQrIds: octoberPendingQrIds, status: 'In Transit' },
  { id: 'movement-september-001', batchId: 'september-distribution-batch', date: '2026-09-18T09:15:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Indapur Warehouse', itemCount: 60, status: 'Completed' },
  { id: 'movement-september-002', batchId: 'september-distribution-batch', date: '2026-09-20T13:00:00', scanType: 'OUT', fromLocation: 'Indapur Warehouse', toLocation: 'Bangalore Company Site', itemCount: 20, status: 'Completed' },
  { id: 'movement-september-003', batchId: 'september-distribution-batch', date: '2026-09-21T10:45:00', scanType: 'OUT', fromLocation: 'Indapur Warehouse', toLocation: 'Solapur Warehouse', itemCount: 12, status: 'Completed' },
  { id: 'movement-september-004', batchId: 'september-distribution-batch', date: '2026-09-22T16:20:00', scanType: 'OUT', fromLocation: 'Indapur Warehouse', fromLocationId: 'indapur-warehouse', toLocation: 'Bangalore Company Site', toLocationId: 'company-bangalore', itemCount: 10, itemQrIds: getPendingQrIds('september-distribution-batch'), status: 'In Transit' },
  { id: 'movement-august-001', batchId: 'august-return-batch', date: '2026-08-25T11:00:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Pandharpur Warehouse', itemCount: 30, status: 'Completed' },
  { id: 'movement-august-002', batchId: 'august-return-batch', date: '2026-08-27T15:10:00', scanType: 'OUT', fromLocation: 'Pandharpur Warehouse', toLocation: 'Pune Co-located Warehouse', itemCount: 10, status: 'Completed' },
  { id: 'movement-august-003', batchId: 'august-return-batch', date: '2026-08-28T09:40:00', scanType: 'OUT', fromLocation: 'Pandharpur Warehouse', fromLocationId: 'pandharpur-warehouse', toLocation: 'Pune Co-located Warehouse', toLocationId: 'clw-pune', itemCount: 8, itemQrIds: getPendingQrIds('august-return-batch'), status: 'In Transit' },
  { id: 'movement-july-001', batchId: 'july-inbound-batch', date: '2026-07-12T10:00:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Solapur Warehouse', itemCount: 45, status: 'Completed' },
  { id: 'movement-july-002', batchId: 'july-inbound-batch', date: '2026-07-15T12:15:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', toLocation: 'Bangalore Company Site', itemCount: 10, status: 'Completed' },
  { id: 'movement-july-003', batchId: 'july-inbound-batch', date: '2026-07-16T14:30:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', fromLocationId: 'solapur-warehouse', toLocation: 'Bangalore Company Site', toLocationId: 'company-bangalore', itemCount: 5, itemQrIds: getPendingQrIds('july-inbound-batch'), status: 'In Transit' },
  { id: 'movement-june-001', batchId: 'june-dispatch-batch', date: '2026-06-24T09:30:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Indapur Warehouse', itemCount: 72, status: 'Completed' },
  { id: 'movement-june-002', batchId: 'june-dispatch-batch', date: '2026-06-26T11:20:00', scanType: 'OUT', fromLocation: 'Indapur Warehouse', toLocation: 'Pune Equipment Supplier Warehouse', itemCount: 18, status: 'Completed' },
  { id: 'movement-june-003', batchId: 'june-dispatch-batch', date: '2026-06-27T13:45:00', scanType: 'OUT', fromLocation: 'Indapur Warehouse', toLocation: 'Bangalore Company Site', itemCount: 14, status: 'Completed' },
  { id: 'movement-june-004', batchId: 'june-dispatch-batch', date: '2026-06-28T16:00:00', scanType: 'OUT', fromLocation: 'Indapur Warehouse', fromLocationId: 'indapur-warehouse', toLocation: 'Pune Equipment Supplier Warehouse', toLocationId: 'es-pune', itemCount: 20, itemQrIds: getPendingQrIds('june-dispatch-batch'), status: 'In Transit' },
  { id: 'movement-may-001', batchId: 'may-supplier-batch', date: '2026-05-09T10:30:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Pandharpur Warehouse', itemCount: 24, status: 'Completed' },
  { id: 'movement-may-002', batchId: 'may-supplier-batch', date: '2026-05-10T14:00:00', scanType: 'OUT', fromLocation: 'Pandharpur Warehouse', toLocation: 'Pune Equipment Supplier Warehouse', itemCount: 10, status: 'Completed' },
  { id: 'movement-may-003', batchId: 'may-supplier-batch', date: '2026-05-11T09:15:00', scanType: 'OUT', fromLocation: 'Pandharpur Warehouse', fromLocationId: 'pandharpur-warehouse', toLocation: 'Pune Equipment Supplier Warehouse', toLocationId: 'es-pune', itemCount: 6, itemQrIds: getPendingQrIds('may-supplier-batch'), status: 'In Transit' },
  { id: 'movement-april-001', batchId: 'april-return-batch', date: '2026-04-17T08:45:00', scanType: 'IN', fromLocation: 'Supplier', toLocation: 'Solapur Warehouse', itemCount: 36, status: 'Completed' },
  { id: 'movement-april-002', batchId: 'april-return-batch', date: '2026-04-19T12:00:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', toLocation: 'Pune Co-located Warehouse', itemCount: 12, status: 'Completed' },
  { id: 'movement-april-003', batchId: 'april-return-batch', date: '2026-04-20T15:30:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', toLocation: 'Bangalore Company Site', itemCount: 6, status: 'Completed' },
  { id: 'movement-april-004', batchId: 'april-return-batch', date: '2026-04-21T10:10:00', scanType: 'OUT', fromLocation: 'Solapur Warehouse', fromLocationId: 'solapur-warehouse', toLocation: 'Bangalore Company Site', toLocationId: 'company-bangalore', itemCount: 6, itemQrIds: getPendingQrIds('april-return-batch'), status: 'In Transit' },
]

export const movements = legacyMovements.map((movement) => ({
  ...movement,
  fromLocationId: movement.fromLocationId ?? getLocationIdByName(movement.fromLocation),
  toLocationId: movement.toLocationId ?? getLocationIdByName(movement.toLocation),
}))
