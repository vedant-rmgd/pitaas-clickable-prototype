import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

function initialValues(supplier) {
  return {
    name: supplier?.name ?? '',
    type: supplier?.type ?? 'Company',
    group: supplier?.group && supplier.group !== '—' ? supplier.group : '',
    country: supplier?.country && supplier.country !== '—' ? supplier.country : '',
    defaultCurrency: supplier?.defaultCurrency ?? '',
    taxId: supplier?.taxId && supplier.taxId !== '—' ? supplier.taxId : '',
    email: supplier?.email ?? '',
    mobile: supplier?.mobile ?? '',
    primaryAddress: supplier?.primaryAddress ?? '',
    notes: supplier?.notes ?? '',
  }
}

export function SupplierFormDialog({ open, mode, supplier, onClose, onSave }) {
  const isEdit = mode === 'edit'
  const formId = isEdit ? 'edit-supplier-form' : 'new-supplier-form'
  const [values, setValues] = useState(() => initialValues(supplier))
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (!values.name.trim()) return
    onSave({ ...values, name: values.name.trim() })
  }

  return <Dialog open={open} onClose={onClose} className="supplier-form-dialog" title={isEdit ? `Edit supplier: ${supplier?.id}` : 'New supplier'} description={isEdit ? 'Update supplier details used across purchasing and receiving.' : 'Add a supplier and its purchasing contact details.'} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form={formId} disabled={!values.name.trim()}>{isEdit ? 'Save changes' : 'Create'}</Button></>}>
    <form id={formId} className="supplier-form" onSubmit={submit}>
      <Input label="Supplier name" value={values.name} onChange={update('name')} required readOnly={isEdit} />
      <Select label="Supplier type" value={values.type} onChange={update('type')} options={[{ value: 'Company', label: 'Company' }, { value: 'Individual', label: 'Individual' }]} />
      <div className="supplier-form-grid">
        <Input label="Group" value={values.group} onChange={update('group')} />
        <Input label="Country" value={values.country} onChange={update('country')} />
        <Input label="Default currency" value={values.defaultCurrency} onChange={update('defaultCurrency')} />
        <Input label="Tax ID (GSTIN)" value={values.taxId} onChange={update('taxId')} />
        <Input label="Email" type="email" value={values.email} onChange={update('email')} />
        <Input label="Mobile" value={values.mobile} onChange={update('mobile')} />
      </div>
      <label className="field supplier-full-field" htmlFor="primary-address"><span className="field__label">Primary address</span><textarea id="primary-address" className="textarea-control" value={values.primaryAddress} onChange={update('primaryAddress')} /></label>
      <label className="field supplier-full-field" htmlFor="supplier-notes"><span className="field__label">Notes</span><textarea id="supplier-notes" className="textarea-control" value={values.notes} onChange={update('notes')} /></label>
    </form>
  </Dialog>
}
