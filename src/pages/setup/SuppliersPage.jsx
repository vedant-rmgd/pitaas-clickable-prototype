import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { DisableSupplierDialog } from '../../components/supplier/DisableSupplierDialog'
import { SupplierFormDialog } from '../../components/supplier/SupplierFormDialog'
import { SuppliersTable } from '../../components/supplier/SuppliersTable'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { suppliers as initialSuppliers } from '../../data/suppliers'

function createSupplierId(name, existingSuppliers) {
  const baseId = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'supplier'
  let nextId = baseId
  let suffix = 2
  while (existingSuppliers.some((supplier) => supplier.id === nextId)) {
    nextId = `${baseId}-${suffix}`
    suffix += 1
  }
  return nextId
}

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [query, setQuery] = useState('')
  const [formState, setFormState] = useState({ open: false, mode: 'create', supplier: null })
  const [disableTarget, setDisableTarget] = useState(null)
  const [message, setMessage] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredSuppliers = useMemo(() => suppliers.filter((supplier) => `${supplier.name} ${supplier.country} ${supplier.email}`.toLowerCase().includes(normalizedQuery)), [suppliers, normalizedQuery])

  const closeForm = () => setFormState({ open: false, mode: 'create', supplier: null })
  const saveSupplier = (values) => {
    const isEdit = formState.mode === 'edit'
    if (formState.mode === 'edit') {
      setSuppliers((current) => current.map((supplier) => supplier.id === formState.supplier.id ? { ...supplier, ...values } : supplier))
    } else {
      setSuppliers((current) => [...current, { id: createSupplierId(values.name, current), ...values, status: 'Active' }])
    }
    closeForm()
    setMessage(isEdit ? 'Supplier updated.' : 'Supplier created.')
  }
  const updateStatus = (supplier, status) => setSuppliers((current) => current.map((item) => item.id === supplier.id ? { ...item, status } : item))

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Setup / Suppliers"
      title="Suppliers"
      subtitle="Manage the suppliers that provide Universal Packaging."
      actions={<Button onClick={() => { setMessage(''); setFormState({ open: true, mode: 'create', supplier: null }) }}><Plus size={16} aria-hidden="true" />New Supplier</Button>}
    />
    <Card className="filter-bar supplier-filter-bar">
      <Input label="Search" placeholder="Search suppliers by name, location, or email..." value={query} onChange={(event) => setQuery(event.target.value)} />
    </Card>
    {message && <p className="mb-5 text-sm font-medium text-green-700" role="status">{message}</p>}
    <Card className="!overflow-hidden !p-0">
      <div className="flex items-center justify-between gap-4 border-b border-(--border) px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-(--text)">All suppliers</h2>
          <p className="mt-1 text-xs text-(--text-muted)">{filteredSuppliers.length} {filteredSuppliers.length === 1 ? 'supplier' : 'suppliers'}</p>
        </div>
      </div>
      <SuppliersTable
        suppliers={filteredSuppliers}
        onEdit={(supplier) => { setMessage(''); setFormState({ open: true, mode: 'edit', supplier }) }}
        onDisable={setDisableTarget}
        onEnable={(supplier) => updateStatus(supplier, 'Active')}
        emptyMessage={suppliers.length === 0 ? 'No suppliers found.' : 'No matching suppliers found. Try changing your search.'}
      />
    </Card>
    <SupplierFormDialog key={`${formState.open}-${formState.mode}-${formState.supplier?.id ?? 'new'}`} open={formState.open} mode={formState.mode} supplier={formState.supplier} onClose={closeForm} onSave={saveSupplier} />
    <DisableSupplierDialog open={Boolean(disableTarget)} supplier={disableTarget} onClose={() => setDisableTarget(null)} onConfirm={() => { if (disableTarget) updateStatus(disableTarget, 'Disabled'); setDisableTarget(null) }} />
  </PageContainer>
}
