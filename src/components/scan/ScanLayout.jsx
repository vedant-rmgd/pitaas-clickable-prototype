import { Badge } from '../ui/Badge'
import { InScanForm } from './InScanForm'
import { OutScanForm } from './OutScanForm'

const modeDetails = {
  in: {
    label: 'In Scan',
    helper: 'Use In Scan when items arrive at a location.',
  },
  out: {
    label: 'Out Scan',
    helper: 'Use Out Scan when items leave a location for another destination.',
  },
}

export function ScanLayout({ scanType, onDone }) {
  const mode = modeDetails[scanType]

  return <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
    <div className="flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-5">
      <Badge tone="info">{mode.label}</Badge>
      <p className="text-sm leading-5 text-blue-800">{mode.helper}</p>
    </div>
    {scanType === 'out' ? <OutScanForm onDone={onDone} /> : <InScanForm onDone={onDone} />}
  </div>
}
