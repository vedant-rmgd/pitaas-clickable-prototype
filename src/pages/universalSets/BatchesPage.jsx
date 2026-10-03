import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BatchesTable } from '../../components/batch/BatchesTable'
import { Card } from '../../components/ui/Card'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { batches } from '../../data/batches'

export function BatchesPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const filteredBatches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return batches

    return batches.filter((batch) => `${batch.batchName} ${batch.supplier}`.toLowerCase().includes(normalizedQuery))
  }, [query])

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Universal Sets / Batches"
      title="Batches"
      subtitle="Track received Universal Packaging batches and their current status."
    />

    <div className="mb-5 max-w-md">
      <label htmlFor="batch-search" className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-(--text)">Search</span>
        <input
          id="batch-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search batches by name..."
          className="h-10 w-full rounded-lg border border-(--border-strong) bg-white px-3 text-sm text-(--text) outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-(--primary) focus:ring-4 focus:ring-blue-100"
        />
      </label>
    </div>

    <Card className="!overflow-hidden !p-0">
      <div className="flex items-center justify-between gap-4 border-b border-(--border) px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-(--text)">All batches</h2>
          <p className="mt-1 text-xs text-(--text-muted)">{filteredBatches.length} {filteredBatches.length === 1 ? 'batch' : 'batches'}</p>
        </div>
      </div>
      <BatchesTable batches={filteredBatches} onRowClick={(batch) => navigate(`/universal-sets/batches/${batch.id}`)} />
    </Card>
  </PageContainer>
}
