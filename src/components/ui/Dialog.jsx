import { X } from 'lucide-react'

export function Dialog({ open, onClose, title, description, children, footer, className = '' }) {
  if (!open) return null
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={`dialog ${className}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="dialog__header"><div><h2 id="dialog-title">{title}</h2>{description && <p>{description}</p>}</div><button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button></div>
      <div className="dialog__body">{children}</div>
      {footer !== null && <div className="dialog__footer">{footer ?? <><button type="button" className="button button--secondary" onClick={onClose}>Cancel</button><button type="button" className="button button--primary" disabled>Continue</button></>}</div>}
    </section>
  </div>
}
