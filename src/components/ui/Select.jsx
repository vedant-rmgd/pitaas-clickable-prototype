export function Select({ label, options, hint, id, ...props }) {
  const selectId = id ?? label?.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return <label className="field" htmlFor={selectId}>{label && <span className="field__label">{label}</span>}<select id={selectId} className="control" {...props}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{hint && <span className="field__message">{hint}</span>}</label>
}
