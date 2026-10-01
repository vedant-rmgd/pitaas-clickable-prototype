import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'

function initialValues(uom) {
  return {
    name: uom?.unitName ?? '',
    symbol: uom?.symbol && uom.symbol !== '—' ? uom.symbol : '',
    commonCode: uom?.commonCode && uom.commonCode !== '—' ? uom.commonCode : '',
    category: uom?.category && uom.category !== '—' ? uom.category : '',
    wholeNumber: uom?.wholeNumber ?? false,
  }
}

export function UomFormDialog({ open, mode, uom, onClose, onSave }) {
  const isEdit = mode === 'edit'
  const formId = isEdit ? 'edit-unit-form' : 'new-unit-form'
  const [values, setValues] = useState(() => initialValues(uom))
  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (!values.name.trim()) return
    onSave({ ...values, name: values.name.trim(), symbol: values.symbol.trim() || '—', commonCode: values.commonCode.trim() || '—', category: values.category.trim() || '—' })
  }

  return <Dialog open={open} onClose={onClose} className="uom-form-dialog" title={isEdit ? `Edit Unit: ${uom?.id}` : 'New Unit'} description={isEdit ? 'Update the unit details used for inventory quantities.' : 'Add a reusable unit for inventory quantities.'} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form={formId} disabled={!values.name.trim()}>{isEdit ? 'Save changes' : 'Create'}</Button></>}>
    <form id={formId} className="uom-form" onSubmit={submit}>
      <Input label="Unit name" value={values.name} onChange={update('name')} required readOnly={isEdit} />
      <Input label="Symbol" value={values.symbol === '—' ? '' : values.symbol} onChange={update('symbol')} />
      <Input label="Common code" value={values.commonCode === '—' ? '' : values.commonCode} onChange={update('commonCode')} />
      <Input label="Category" value={values.category === '—' ? '' : values.category} onChange={update('category')} />
      <label className="uom-checkbox"><input type="checkbox" checked={values.wholeNumber} onChange={(event) => setValues((current) => ({ ...current, wholeNumber: event.target.checked }))} /><span>Whole numbers only</span></label>
    </form>
  </Dialog>
}
