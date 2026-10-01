export function PageHeader({ breadcrumb, title, subtitle, actions }) {
  return <header className="page-header">
    {breadcrumb && <div className="page-header__breadcrumb">{breadcrumb}</div>}
    <div className="page-header__row">
      <div className="page-header__copy"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
      {actions && <div className="page-header__actions">{actions}</div>}
    </div>
  </header>
}
