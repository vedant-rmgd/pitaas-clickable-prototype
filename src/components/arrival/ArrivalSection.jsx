import { Card } from '../ui/Card'

export function ArrivalSection({ step, title, description, children }) {
  return <Card className="overflow-hidden rounded-xl border border-(--border) bg-white p-0 shadow-sm">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--primary-soft) text-xs font-semibold text-(--primary)">{step}</span>
        <div>
          <h2 className="text-base font-semibold text-(--text)">{title}</h2>
          {description && <p className="mt-1 text-sm leading-5 text-(--text-muted)">{description}</p>}
        </div>
      </div>
    </div>
    <div className="p-5 sm:p-6">{children}</div>
  </Card>
}
