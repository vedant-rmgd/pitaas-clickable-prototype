import { useNavigate, useParams } from 'react-router-dom'
import { BatchComposition } from '../../components/batch/BatchComposition'
import { BatchItemsTable } from '../../components/batch/BatchItemsTable'
import { BatchDocuments } from '../../components/batch/BatchDocuments'
import { BatchSummary } from '../../components/batch/BatchSummary'
import { LocationDistribution } from '../../components/batch/LocationDistribution'
import { MovementHistory } from '../../components/batch/MovementHistory'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { batches } from '../../data/batches'
import { documents } from '../../data/documents'
import { movements } from '../../data/movements'
import { qrItems } from '../../data/qrItems'
import { formatDate } from '../../utils/formatDate'
import { batchStatusTones } from '../../components/batch/batchStatus'

export function BatchDetailPage() {
  const { batchId } = useParams()
  const navigate = useNavigate()
  const batch = batches.find((item) => item.id === batchId)
  const batchItems = qrItems.filter((item) => item.batchId === batchId)
  const batchMovements = movements.filter((item) => item.batchId === batchId)
  const batchDocuments = documents.filter((item) => item.batchId === batchId)

  if (!batch) return <PageContainer>
    <PageHeader
      breadcrumb="Home / Universal Sets / Batches"
      title="Batch not found"
      subtitle="The requested batch could not be found."
      actions={<Button variant="secondary" onClick={() => navigate('/universal-sets/batches')}>Back to Batches</Button>}
    />
    <Card>
      <p className="text-sm text-[var(--text-muted)]">Check the batch link and try again.</p>
    </Card>
  </PageContainer>

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Universal Sets / Batches"
      title={batch.batchName}
      subtitle={`${batch.supplier} • Received ${formatDate(batch.createdDate)}`}
      actions={<div className="flex flex-wrap items-center gap-3">
        <Badge tone={batchStatusTones[batch.status] ?? 'neutral'}>{batch.status}</Badge>
        <Button variant="secondary" onClick={() => navigate('/universal-sets/batches')}>Back to Batches</Button>
      </div>}
    />
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <BatchSummary batch={batch} />
      <BatchComposition composition={batch.composition} />
      <LocationDistribution locations={batch.locationDistribution} />
      <BatchItemsTable items={batchItems} />
      <MovementHistory movements={batchMovements} />
      <BatchDocuments documents={batchDocuments} />
    </div>
  </PageContainer>
}
