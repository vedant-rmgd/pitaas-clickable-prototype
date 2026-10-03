export const scanTypeLabels = {
  Cap: 'Caps',
  Sleeve: 'Sleeves',
  Pallet: 'Pallets',
}

export function getTypeCounts(items) {
  return items.reduce((counts, item) => ({ ...counts, [item.type]: (counts[item.type] ?? 0) + 1 }), {})
}
