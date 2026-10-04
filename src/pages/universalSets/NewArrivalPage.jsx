import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrivalReview } from '../../components/arrival/ArrivalReview'
import { BatchDetailsSection } from '../../components/arrival/BatchDetailsSection'
import { ExpectedItemsSummary } from '../../components/arrival/ExpectedItemsSummary'
import { ReceivedItemsSection } from '../../components/arrival/ReceivedItemsSection'
import { ScanItemsSection } from '../../components/arrival/ScanItemsSection'
import { ItemScanDialog } from '../../components/arrival/ItemScanDialog'
import { UploadDocumentSection } from '../../components/arrival/UploadDocumentSection'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { locations } from '../../data/locations'
import { arrivalItemTypes } from '../../data/arrivalItemTypes'
import { batches } from '../../data/batches'
import { formatQrId } from '../../utils/qrId'
import { getActiveSuppliers } from '../../utils/supplierHelpers'

function getLocalDate() {
  const now = new Date()
  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return localTime.toISOString().slice(0, 10)
}

export function NewArrivalPage() {
  const navigate = useNavigate()
  const activeSuppliers = getActiveSuppliers()
  const [values, setValues] = useState({
    batchName: '',
    supplierId: '',
    receivingLocationId: '',
    date: getLocalDate(),
    notes: '',
    receiveUniversalSets: false,
    receiveIndividualItems: false,
    universalSetCount: 0,
    extraCaps: 0,
    extraSleeves: 0,
    extraPallets: 0,
  })
  const [scannedItems, setScannedItems] = useState({ caps: [], sleeves: [], pallets: [] })
  const [scannerType, setScannerType] = useState(null)
  const [documentFile, setDocumentFile] = useState(null)
  const [savedArrival, setSavedArrival] = useState(null)

  const updateValue = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const toggleReceivedType = (field) => {
    setValues((current) => ({ ...current, [field]: !current[field] }))
  }

  const updateQuantity = (field, rawValue) => {
    const parsedValue = Number(rawValue)
    const value = Number.isFinite(parsedValue) ? Math.max(0, Math.trunc(parsedValue)) : 0
    setValues((current) => ({ ...current, [field]: value }))
  }

  const universalSetCount = values.receiveUniversalSets ? values.universalSetCount : 0
  const extraCaps = values.receiveIndividualItems ? values.extraCaps : 0
  const extraSleeves = values.receiveIndividualItems ? values.extraSleeves : 0
  const extraPallets = values.receiveIndividualItems ? values.extraPallets : 0
  const expectedItems = {
    caps: universalSetCount + extraCaps,
    sleeves: universalSetCount + extraSleeves,
    pallets: universalSetCount + extraPallets,
  }
  expectedItems.total = expectedItems.caps + expectedItems.sleeves + expectedItems.pallets

  const handleScan = (itemType, rawQrId) => {
    const qrId = rawQrId.trim().toUpperCase()
    if (!qrId) return { success: false, error: 'Enter a QR ID before scanning.' }

    const alreadyScanned = Object.values(scannedItems).flat().some((item) => item.qrId === qrId)
    if (alreadyScanned) return { success: false, error: `${qrId} has already been scanned.` }

    const itemConfig = arrivalItemTypes.find((item) => item.itemType === itemType)
    const expectedCount = expectedItems[itemConfig.expectedKey]
    if (scannedItems[itemConfig.key].length >= expectedCount) {
      return { success: false, error: `All expected ${itemConfig.label} have already been scanned.` }
    }

    setScannedItems((current) => ({
      ...current,
      [itemConfig.key]: [...current[itemConfig.key], {
        qrId,
        type: itemType,
        batchName: values.batchName,
        locationId: values.receivingLocationId,
        scanType: 'IN',
      }],
    }))
    return { success: true }
  }

  const handleRemoveScan = (itemType, qrId) => {
    const itemConfig = arrivalItemTypes.find((item) => item.itemType === itemType)
    setScannedItems((current) => ({
      ...current,
      [itemConfig.key]: current[itemConfig.key].filter((item) => item.qrId !== qrId),
    }))
  }

  const activeScanner = arrivalItemTypes.find((item) => item.itemType === scannerType)
  const demoQrIdsByKey = {}
  const reservedDemoQrIds = new Set(Object.values(scannedItems).flat().map((item) => item.qrId))
  let nextDemoQrNumber = 1
  arrivalItemTypes.forEach((item) => {
    const itemScannedIds = scannedItems[item.key].map((scannedItem) => scannedItem.qrId)
    const itemDemoIds = [...itemScannedIds]
    while (itemDemoIds.length < expectedItems[item.expectedKey]) {
      const qrId = formatQrId(nextDemoQrNumber)
      nextDemoQrNumber += 1
      if (reservedDemoQrIds.has(qrId)) continue
      itemDemoIds.push(qrId)
      reservedDemoQrIds.add(qrId)
    }
    demoQrIdsByKey[item.key] = itemDemoIds
  })
  const totalScanned = arrivalItemTypes.reduce((total, item) => total + scannedItems[item.key].length, 0)
  const requiredDetailsComplete = Boolean(values.batchName.trim() && values.supplierId && values.receivingLocationId && values.date)
  const hasReceivedItems = values.receiveUniversalSets || values.receiveIndividualItems
  const scansComplete = expectedItems.total > 0 && arrivalItemTypes.every((item) => scannedItems[item.key].length >= expectedItems[item.expectedKey])
  const remainingItems = Math.max(expectedItems.total - totalScanned, 0)
  const canSave = requiredDetailsComplete && hasReceivedItems && expectedItems.total > 0 && scansComplete

  const handleSave = () => {
    if (!canSave) return

    const batchId = values.batchName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'new-arrival'
    const locationName = locations.find((location) => location.id === values.receivingLocationId)?.name ?? 'Selected warehouse'
    const arrival = {
      id: batchId,
      batchName: values.batchName.trim(),
      supplierId: values.supplierId,
      receivingLocationId: values.receivingLocationId,
      receivingLocationName: locationName,
      date: values.date,
      notes: values.notes,
      universalSetCount: values.receiveUniversalSets ? values.universalSetCount : 0,
      extraCaps: values.receiveIndividualItems ? values.extraCaps : 0,
      extraSleeves: values.receiveIndividualItems ? values.extraSleeves : 0,
      extraPallets: values.receiveIndividualItems ? values.extraPallets : 0,
      expected: expectedItems,
      scannedItems: Object.values(scannedItems).flat(),
      documentName: documentFile?.name ?? null,
    }

    setSavedArrival(arrival)
  }

  const savedBatchPath = savedArrival && batches.some((batch) => batch.id === savedArrival.id)
    ? `/universal-sets/batches/${savedArrival.id}`
    : '/universal-sets/batches'

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Universal Sets / New Arrival"
      title="New Arrival"
      subtitle="Record new Universal Packaging received from a supplier."
    />
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <BatchDetailsSection suppliers={activeSuppliers} locations={locations} values={values} onChange={updateValue} />
      <ReceivedItemsSection values={values} onToggle={toggleReceivedType} onQuantityChange={updateQuantity} />
      <ExpectedItemsSummary values={expectedItems} />
      <ScanItemsSection expectedItems={expectedItems} scannedItems={scannedItems} onOpenScanner={(item) => setScannerType(item.itemType)} />
      <UploadDocumentSection file={documentFile} onFileChange={setDocumentFile} onRemove={() => setDocumentFile(null)} />
      <ArrivalReview
        values={values}
        locations={locations}
        expectedItems={expectedItems}
        scannedItems={scannedItems}
        documentName={documentFile?.name}
        canSave={canSave}
        scansComplete={scansComplete}
        remainingItems={remainingItems}
        onSave={handleSave}
      />
    </div>
    {activeScanner && <ItemScanDialog
      open={Boolean(activeScanner)}
      onClose={() => setScannerType(null)}
      itemType={activeScanner.itemType}
      expectedCount={expectedItems[activeScanner.expectedKey]}
      scannedItems={scannedItems[activeScanner.key]}
      demoQrIds={demoQrIdsByKey[activeScanner.key]}
      onScan={(qrId) => handleScan(activeScanner.itemType, qrId)}
      onRemove={(qrId) => handleRemoveScan(activeScanner.itemType, qrId)}
    />}
    <Dialog
      open={Boolean(savedArrival)}
      onClose={() => setSavedArrival(null)}
      title="Arrival saved successfully"
      description="The first In Scan has been recorded for this arrival."
      footer={<Button onClick={() => navigate(savedBatchPath)}>{savedBatchPath.includes('/batches/') ? 'View Batch Detail' : 'Back to Batches'}</Button>}
    >
      <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-4">
        <p className="text-sm font-semibold text-green-800">{savedArrival?.expected.total} items were registered at {savedArrival?.receivingLocationName}.</p>
        <p className="mt-1 text-xs leading-5 text-green-700">Batch: {savedArrival?.batchName}</p>
      </div>
    </Dialog>
  </PageContainer>
}
