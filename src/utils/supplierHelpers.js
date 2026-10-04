import { suppliers } from '../data/suppliers.js'

export function getSupplierById(supplierId) {
  return suppliers.find((supplier) => supplier.id === supplierId)
}

export function getSupplierName(supplierId, fallback = 'Unknown supplier') {
  return getSupplierById(supplierId)?.name ?? fallback
}

export function getActiveSuppliers() {
  return suppliers.filter((supplier) => supplier.status === 'Active')
}
