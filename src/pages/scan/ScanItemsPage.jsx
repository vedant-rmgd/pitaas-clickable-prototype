import { useState } from 'react'
import { ScanLayout } from '../../components/scan/ScanLayout'
import { ScanTypeSelector } from '../../components/scan/ScanTypeSelector'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'

export function ScanItemsPage() {
  const [scanType, setScanType] = useState('in')

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Scan Items"
      title="Scan Items"
      subtitle="Record item movements by scanning QR-coded Caps, Sleeves, and Pallets."
    />
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <ScanTypeSelector value={scanType} onChange={setScanType} />
      <ScanLayout scanType={scanType} onDone={() => setScanType('in')} />
    </div>
  </PageContainer>
}
