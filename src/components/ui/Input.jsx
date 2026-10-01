export function Input({ label, hint, error, id, ...props }) {
  const inputId = id ?? label?.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return <label className="field" htmlFor={inputId}>{label && <span className="field__label">{label}</span>}<input id={inputId} className={`control ${error ? 'control--error' : ''}`} {...props} />{(hint || error) && <span className={`field__message ${error ? 'field__message--error' : ''}`}>{error || hint}</span>}</label>
}
