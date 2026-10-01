export function Card({ children, className = '', onClick }) {
  const Component = onClick ? 'button' : 'section'
  return <Component type={onClick ? 'button' : undefined} className={`card ${onClick ? 'card--interactive' : ''} ${className}`} onClick={onClick}>{children}</Component>
}
