import { useMemo, useState } from 'react'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

export function WarehouseItemsSection({ items = [] }) {
  const [query, setQuery] = useState('')
  const [showZeroStock, setShowZeroStock] = useState(false)
  const visibleItems = useMemo(() => items.filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(query.toLowerCase()) && (showZeroStock || item.stock > 0)), [items, query, showZeroStock])

  return <>
    <Card className="warehouse-filter-card"><div className="warehouse-item-filter"><Input label="Search" placeholder="Search by item code or name" value={query} onChange={(event) => setQuery(event.target.value)} /><label className="warehouse-checkbox"><input type="checkbox" checked={showZeroStock} onChange={(event) => setShowZeroStock(event.target.checked)} /><span>Show items with zero stock</span></label></div></Card>
    <Card className="warehouse-items-card"><div className="warehouse-card-header"><h2>Items in this warehouse</h2></div><div className="warehouse-empty-state"><strong>{visibleItems.length === 0 ? 'No items in this warehouse yet' : 'Items in this warehouse'}</strong><span>{visibleItems.length === 0 ? 'Items will appear here when stock is received into this warehouse.' : 'Current warehouse item balances are shown here.'}</span></div></Card>
  </>
}
