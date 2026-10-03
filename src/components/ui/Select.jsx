export function Select({ label, options, hint, error, id, ...props }) {
  const selectId = id ?? label?.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return <label className="field" htmlFor={selectId}>{label && <span className="field__label">{label}</span>}<select id={selectId} className={`control ${error ? 'control--error' : ''}`} {...props}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{(hint || error) && <span className={`field__message ${error ? 'field__message--error' : ''}`}>{error || hint}</span>}</label>
}
