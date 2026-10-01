import { Card } from '../ui/Card'

export function WarehouseActivitySection() {
  return <Card className="warehouse-activity-card"><div className="warehouse-card-header"><h2>Activity</h2></div><div className="warehouse-empty-state"><strong>No recent activity</strong><span>Warehouse movements will appear here as items are received, transferred, or sent.</span></div></Card>
}
