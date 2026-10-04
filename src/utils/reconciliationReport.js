import { reconciliationItemTypes } from '../data/reconciliation'

function joinLabels(labels) {
  if (labels.length <= 1) return labels[0] ?? ''
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`
  return `${labels.slice(0, -1).join(', ')}, and ${labels.at(-1)}`
}

export function buildComparisonRows(pitaasRecords, esRecords) {
  return reconciliationItemTypes.map((itemType) => ({
    ...itemType,
    pitaasValue: pitaasRecords[itemType.key],
    esValue: esRecords[itemType.key],
    difference: esRecords[itemType.key] - pitaasRecords[itemType.key],
  }))
}

export function getComparisonTotals(rows) {
  const pitaasTotal = rows.reduce((total, row) => total + row.pitaasValue, 0)
  const esTotal = rows.reduce((total, row) => total + row.esValue, 0)
  return {
    pitaasTotal,
    esTotal,
    netDifference: esTotal - pitaasTotal,
    matchedCount: rows.filter((row) => row.difference === 0).length,
    differenceCount: rows.filter((row) => row.difference !== 0).length,
  }
}

export function buildReconciliationSummary(rows, monthLabel) {
  const matchedRows = rows.filter((row) => row.difference === 0)
  const differenceRows = rows.filter((row) => row.difference !== 0)
  if (differenceRows.length === 0) return `The Equipment Supplier report matches PiTaaS records for all Universal Packaging items for ${monthLabel}.`

  const matchedText = matchedRows.length > 0 ? `The Equipment Supplier report matches PiTaaS records for ${joinLabels(matchedRows.map((row) => row.label))}. ` : ''
  const differencesText = differenceRows.map((row) => {
    const amount = Math.abs(row.difference)
    const direction = row.difference < 0 ? 'fewer' : 'more'
    return `The ES report shows ${amount} ${direction} ${row.label} than PiTaaS records.`
  }).join(' ')
  return `${matchedText}${differencesText}`
}

function escapeCsv(value) {
  const text = String(value ?? '')
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function sanitizeFilename(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function createReconciliationCsv({ locationName, monthLabel, fileName, rows, summaryText }) {
  const totals = getComparisonTotals(rows)
  const lines = [
    ['Reconciliation Summary'],
    ['Equipment Supplier Location', locationName],
    ['Month', monthLabel],
    ['Uploaded File', fileName],
    ['Generated / Demo Result', 'Prototype comparison using demo ES report data'],
    [],
    ['Item Type', 'PiTaaS', 'ES Report', 'Difference', 'Result'],
    ...rows.map((row) => [row.singular, row.pitaasValue, row.esValue, row.difference, row.difference === 0 ? 'Matched' : 'Difference']),
    [],
    ['Matched Item Types', totals.matchedCount],
    ['Difference Item Types', totals.differenceCount],
    ['PiTaaS Total', totals.pitaasTotal],
    ['ES Total', totals.esTotal],
    ['Net Difference', totals.netDifference],
    [],
    ['Summary', summaryText],
  ]
  return lines.map((line) => line.map(escapeCsv).join(',')).join('\r\n')
}

export function downloadReconciliationReport({ locationName, month, monthLabel, fileName, rows, summaryText }) {
  const csv = createReconciliationCsv({ locationName, monthLabel, fileName, rows, summaryText })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `reconciliation-${sanitizeFilename(locationName)}-${month}.csv`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
