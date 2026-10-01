import { Card } from '../ui/Card'

export function StockByWarehouse({ stock, stockByWarehouse }) {
  return <Card className="stock-section-card">
    <div className="table-card__header"><div><h2>Stock by Warehouse</h2><p>Current warehouse balances</p></div></div>
    {stockByWarehouse.length > 0 ? <div className="stock-content"><div className="stock-summary"><strong>{stock}</strong><span>units in stock</span></div>{stockByWarehouse.map((warehouse) => <div className="balance-row" key={warehouse.name}><span>{warehouse.name}</span><strong>{warehouse.quantity}</strong></div>)}</div> : <div className="detail-empty-state"><strong>No warehouse stock</strong><span>This item is not currently stocked in any warehouse.</span></div>}
  </Card>
}
