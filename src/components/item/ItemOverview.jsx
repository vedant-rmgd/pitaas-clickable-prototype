import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function ItemOverview({ item }) {
  return <Card className="item-overview-card">
    <div className="section-heading"><div><h2>Item Overview</h2><p>Catalog record overview</p></div></div>
    <dl className="metadata-list metadata-list--primary">
      <div><dt>Item Code</dt><dd>{item.code}</dd></div>
      <div><dt>Item Group</dt><dd>{item.group}</dd></div>
      <div><dt>Stock Unit</dt><dd>{item.unit}</dd></div>
      <div><dt>Status</dt><dd><Badge tone={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Badge></dd></div>
    </dl>
    <div className="additional-details">
      <h3>Additional details</h3>
      <dl className="metadata-list metadata-list--additional">
        <div><dt>PITaaS ID</dt><dd>{item.pitassId}</dd></div>
        <div><dt>Default Container</dt><dd>{item.defaultContainer}</dd></div>
        <div><dt>QR Code</dt><dd>{item.qrCode}</dd></div>
        <div><dt>Branch Code</dt><dd>{item.branchCode}</dd></div>
        <div><dt>Stock Item</dt><dd>{item.stockItem}</dd></div>
        <div><dt>Requires Unit Scan</dt><dd>{item.requiresUnitScan}</dd></div>
        <div><dt>Fixed Asset</dt><dd>{item.fixedAsset}</dd></div>
      </dl>
    </div>
  </Card>
}
