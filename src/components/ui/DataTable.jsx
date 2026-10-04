export function DataTable({ columns, data = [], rowKey, onRowClick, emptyMessage = 'No records found.', wrapClassName = '', tableClassName = '', stickyHeader = false }) {
  const handleRowKeyDown = (event, row) => {
    if (!onRowClick || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    onRowClick(row)
  }

  return <div className={`data-table-wrap ${wrapClassName}`}><table className={`data-table ${tableClassName}`}><thead><tr>{columns.map((column) => <th key={column.key} className={`${column.align === 'right' ? 'cell--right' : ''} ${column.className ?? ''} ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>{column.label}</th>)}</tr></thead><tbody>
    {data.length === 0 ? <tr><td className="data-table__empty" colSpan={columns.length}>{emptyMessage}</td></tr> : data.map((row, index) => <tr key={rowKey ? row[rowKey] : index} tabIndex={onRowClick ? 0 : undefined} role={onRowClick ? 'link' : undefined} className={onRowClick ? 'data-table__row--clickable' : ''} onClick={() => onRowClick?.(row)} onKeyDown={(event) => handleRowKeyDown(event, row)}>{columns.map((column) => <td key={column.key} className={`${column.align === 'right' ? 'cell--right' : ''} ${column.className ?? ''}`}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>)}
  </tbody></table></div>
}
