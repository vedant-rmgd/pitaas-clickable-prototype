import { Card } from '../ui/Card'

export function BarcodesSection() {
  return <Card className="barcode-section-card">
    <div className="table-card__header"><div><h2>Barcodes</h2><p>Registered barcodes for this item.</p></div></div>
    <div className="detail-empty-state"><strong>No barcodes registered</strong></div>
  </Card>
}
