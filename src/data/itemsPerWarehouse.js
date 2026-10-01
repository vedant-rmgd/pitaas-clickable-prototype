export const itemsPerWarehouse = [
  { warehouse: 'All Warehouses - APX', itemsInStock: 0 },
  { warehouse: 'All Warehouses - PTC', itemsInStock: 0 },
  { warehouse: 'Finished Goods - APX', itemsInStock: 0 },
  { warehouse: 'Finished Goods - PTC', itemsInStock: 0 },
  { warehouse: 'Goods In Transit - APX', itemsInStock: 0 },
  { warehouse: 'Goods In Transit - PTC', itemsInStock: 0 },
  { warehouse: 'S10-050784-075752-WH - PTC', itemsInStock: 1 },
  { warehouse: 'S10-5d1283-075906-WH - PTC', itemsInStock: 1 },
  { warehouse: 'S12-T2-happy-14973196 - PTC', itemsInStock: 12 },
  { warehouse: 'S12-T2-happy-5c35d79b - PTC', itemsInStock: 9 },
]

export const itemsPerWarehouseSummary = {
  totalItems: itemsPerWarehouse.reduce((total, row) => total + row.itemsInStock, 0),
  warehouseCount: itemsPerWarehouse.length,
  warehousesWithStock: itemsPerWarehouse.filter((row) => row.itemsInStock > 0).length,
}
