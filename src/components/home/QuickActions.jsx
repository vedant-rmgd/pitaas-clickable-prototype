import { ArrowUpRight, Boxes, FileSearch, Plus, ScanLine } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../ui/Card'

const actions = [
  {
    label: 'New Arrival',
    description: 'Receive new Universal Packaging.',
    path: '/universal-sets/new-arrival',
    icon: Plus,
  },
  {
    label: 'Scan Items',
    description: 'Record In Scan or Out Scan movements.',
    path: '/scan',
    icon: ScanLine,
  },
  {
    label: 'Batches',
    description: 'View and track existing batches.',
    path: '/universal-sets/batches',
    icon: Boxes,
  },
  {
    label: 'Reconcile',
    description: 'Compare ES stock reports with PiTaaS.',
    path: '/reports/reconciliation',
    icon: FileSearch,
  },
]

export function QuickActions() {
  const navigate = useNavigate()

  return <section className="space-y-3" aria-labelledby="quick-actions-heading">
    <div>
      <h2 id="quick-actions-heading" className="text-base font-semibold text-(--text)">Quick Actions</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Start a common Universal Packaging task.</p>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map(({ label, description, path, icon: Icon }) => <Card
        key={label}
        className="group flex min-h-32 flex-col justify-between !p-4"
        onClick={() => navigate(path)}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-(--interactive-text)">
            <Icon size={18} strokeWidth={2} aria-hidden="true" />
          </span>
          <ArrowUpRight size={17} className="text-(--text-muted) transition group-hover:text-(--interactive-text)" aria-hidden="true" />
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-(--text)">{label}</h3>
          <p className="mt-1 text-xs leading-5 text-(--text-muted)">{description}</p>
        </div>
      </Card>)}
    </div>
  </section>
}
