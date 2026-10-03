export function formatQrId(sequence) {
  return String(sequence).padStart(3, '0')
}
