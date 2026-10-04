import { useState } from 'react'
import { ReconciliationSetup } from '../../components/reconciliation/ReconciliationSetup'
import { ReportUpload } from '../../components/reconciliation/ReportUpload'
import { ReconciliationResults } from '../../components/reconciliation/ReconciliationResults'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { locations } from '../../data/locations'

export function ReconciliationPage() {
  const [selectedLocationId, setSelectedLocationId] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [isReconciling, setIsReconciling] = useState(false)
  const [reconciliationStarted, setReconciliationStarted] = useState(false)
  const equipmentSupplierLocations = locations.filter((location) => location.type === 'Equipment Supplier Warehouse' && location.status === 'Active')
  const canReconcile = Boolean(selectedLocationId && selectedMonth && selectedFile && !fileError)

  const updateLocation = (value) => {
    setSelectedLocationId(value)
    setReconciliationStarted(false)
  }

  const updateMonth = (value) => {
    setSelectedMonth(value)
    setReconciliationStarted(false)
  }

  const updateFile = (file, error) => {
    setSelectedFile(file)
    setFileError(error)
    setReconciliationStarted(false)
  }

  const handleReconcile = () => {
    if (!canReconcile) return
    setIsReconciling(true)
    setReconciliationStarted(false)
    window.setTimeout(() => {
      setIsReconciling(false)
      setReconciliationStarted(true)
    }, 700)
  }

  const selectedLocation = equipmentSupplierLocations.find((location) => location.id === selectedLocationId)

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Reports / Reconciliation"
      title="Reconciliation"
      subtitle="Compare PiTaaS stock records with the monthly stock report shared by an Equipment Supplier."
    />
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      {reconciliationStarted && selectedLocation ? <ReconciliationResults
        location={selectedLocation}
        month={selectedMonth}
        fileName={selectedFile.name}
        onChangeSetup={() => setReconciliationStarted(false)}
      /> : <>
      <ReconciliationSetup
        locations={equipmentSupplierLocations}
        selectedLocationId={selectedLocationId}
        selectedMonth={selectedMonth}
        onLocationChange={updateLocation}
        onMonthChange={updateMonth}
      />
      <ReportUpload file={selectedFile} error={fileError} onFileChange={updateFile} />
      <Card className="!p-0 !overflow-hidden">
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="text-sm text-(--text-muted)" aria-live="polite">
            {isReconciling ? 'Comparing PiTaaS records with the ES report...' : reconciliationStarted ? 'Comparison ready. Detailed results will be added in a later task.' : 'Select a location, month, and valid report to continue.'}
          </div>
          <Button disabled={!canReconcile || isReconciling} onClick={handleReconcile}>
            {isReconciling ? 'Reconciling report...' : 'Reconcile'}
          </Button>
        </div>
      </Card>
      </>}
    </div>
  </PageContainer>
}
