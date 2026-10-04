import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'

function getInitialValues(supplier) {
  return {
    name: supplier?.name ?? '',
    country: supplier?.country ?? '',
    email: supplier?.email ?? '',
    mobile: supplier?.mobile ?? '',
    primaryAddress: supplier?.primaryAddress ?? '',
    notes: supplier?.notes ?? '',
  }
}

function validate(values) {
  if (!values.name.trim()) return 'Supplier name is required.'
  if (!values.country.trim()) return 'Location is required.'
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) return 'Enter a valid email address.'
  return ''
}

export function SupplierFormDialog({ open, mode, supplier, onClose, onSave }) {
  const isEdit = mode === 'edit'
  const formId = isEdit ? 'edit-supplier-form' : 'new-supplier-form'
  const [values, setValues] = useState(() => getInitialValues(supplier))
  const [error, setError] = useState('')
  const update = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    if (error) setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const validationError = validate(values)
    if (validationError) {
      setError(validationError)
      return
    }
    onSave({ ...values, name: values.name.trim(), country: values.country.trim() })
  }

  return <Dialog
    open={open}
    onClose={onClose}
    className="supplier-form-dialog"
    title={isEdit ? 'Edit Supplier' : 'New Supplier'}
    description={isEdit ? 'Update the supplier details used for Universal Packaging.' : 'Add a supplier that provides Universal Packaging.'}
    footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form={formId}>{isEdit ? 'Save Changes' : 'Create Supplier'}</Button></>}
  >
    <form id={formId} className="flex flex-col gap-5" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Supplier Name" value={values.name} onChange={update('name')} required />
        <Input label="Location" value={values.country} onChange={update('country')} required />
        <Input label="Email" type="email" value={values.email} onChange={update('email')} />
        <Input label="Mobile" value={values.mobile} onChange={update('mobile')} />
      </div>
      <label className="field" htmlFor="supplier-address">
        <span className="field__label">Address</span>
        <textarea id="supplier-address" className="control !h-24 resize-y py-2" value={values.primaryAddress} onChange={update('primaryAddress')} />
      </label>
      <label className="field" htmlFor="supplier-notes">
        <span className="field__label">Notes</span>
        <textarea id="supplier-notes" className="control !h-24 resize-y py-2" value={values.notes} onChange={update('notes')} />
      </label>
      {error && <p className="text-xs font-medium text-(--danger)" role="alert">{error}</p>}
    </form>
  </Dialog>
}
