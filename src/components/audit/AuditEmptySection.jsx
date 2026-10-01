import { Card } from '../ui/Card'

export function AuditEmptySection({ title, helper }) {
  return <Card className="audit-section-card"><div className="audit-section-header"><h2>{title}</h2></div><div className="audit-empty-state"><strong>{title}</strong><span>{helper}</span></div></Card>
}
