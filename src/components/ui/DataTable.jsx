export function DataTable({ columns, data = [], rowKey, onRowClick, emptyMessage = 'No records found.' }) {
  return <div className="data-table-wrap"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column.key} className={column.align === 'right' ? 'cell--right' : ''}>{column.label}</th>)}</tr></thead><tbody>
    {data.length === 0 ? <tr><td className="data-table__empty" colSpan={columns.length}>{emptyMessage}</td></tr> : data.map((row, index) => <tr key={rowKey ? row[rowKey] : index} className={onRowClick ? 'data-table__row--clickable' : ''} onClick={() => onRowClick?.(row)}>{columns.map((column) => <td key={column.key} className={column.align === 'right' ? 'cell--right' : ''}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>)}</tr>)}
  </tbody></table></div>
}
