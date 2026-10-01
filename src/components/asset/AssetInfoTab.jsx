import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

function AssetSection({ title, subtitle, children, className = '' }) {
  return <Card className={`asset-section-card ${className}`}><div className="asset-card__header"><h2>{title}</h2><p>{subtitle}</p></div><div className="asset-card__body">{children}</div></Card>
}

function AssetFields({ fields, className = '' }) {
  return <dl className={`asset-fields ${className}`}>{fields.map(({ label, value, badge }) => <div key={label}><dt>{label}</dt><dd>{badge ? <Badge tone="info">{value}</Badge> : value}</dd></div>)}</dl>
}

export function AssetInfoTab({ asset }) {
  return <div className="asset-section-stack">
    <AssetSection title="Basic information" subtitle="Core identity and ownership details for this asset.">
      <AssetFields fields={[{ label: 'Asset name', value: asset.name }, { label: 'Status', value: asset.status }, { label: 'Category', value: asset.category }, { label: 'Company', value: asset.company }, { label: 'PITaaS ID', value: asset.pitaasId }, { label: 'Current status', value: asset.currentStatus, badge: true }]} />
    </AssetSection>
    <AssetSection title="Purchase" subtitle="Commercial details and lifecycle dates.">
      <AssetFields fields={[{ label: 'Purchase amount', value: asset.purchaseAmount }, { label: 'Purchase date', value: asset.purchaseDate }, { label: 'Available for use', value: asset.availableForUse }, { label: 'Next depreciation', value: asset.nextDepreciation }, { label: 'Total asset cost', value: asset.totalAssetCost }]} />
    </AssetSection>
    <AssetSection title="Operational details" subtitle="Operational identifiers used across the platform.">
      <AssetFields fields={[{ label: 'QR code', value: asset.qrCode }, { label: 'Branch code', value: asset.branchCode }, { label: 'Last audited', value: asset.lastAudited }, { label: 'Lifecycle', value: asset.lifecycle }, { label: 'Audit status', value: asset.auditStatus }, { label: 'Verification', value: asset.verification }]} />
    </AssetSection>
    <AssetSection title="Depreciation" subtitle="Scheduled depreciation and current book value." className="asset-depreciation-card">
      <div className="asset-depreciation-metrics"><div><span>Scheduled entries</span><strong>{asset.scheduledEntries}</strong></div><div><span>Total depreciation</span><strong>{asset.totalDepreciation}</strong></div><div><span>Book value</span><strong>{asset.bookValue}</strong></div></div>
      <div className="asset-empty-state"><strong>No upcoming entries</strong><span>Depreciation schedule is complete (no upcoming entries).</span></div>
    </AssetSection>
  </div>
}
