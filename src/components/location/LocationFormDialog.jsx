import { useState } from 'react'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

const emptyValues = {
  name: '',
  type: '',
  organization: '',
  city: '',
  address: '',
  status: 'Active',
}

function getInitialValues(location) {
  return location ? {
    name: location.name ?? '',
    type: location.type ?? '',
    organization: location.organization ?? '',
    city: location.city ?? '',
    address: location.address ?? '',
    status: location.status ?? 'Active',
  } : emptyValues
}

export function LocationFormDialog({ open, mode, location, locationTypes, onClose, onSave }) {
  const isEdit = mode === 'edit'
  const formId = isEdit ? 'edit-location-form' : 'new-location-form'
  const [values, setValues] = useState(() => getInitialValues(location))
  const [errors, setErrors] = useState({})

  const update = (field) => (event) => {
    const value = event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Location name is required.'
    if (!values.type) nextErrors.type = 'Select a location type.'
    if (!values.organization.trim()) nextErrors.organization = 'Organization is required.'
    if (!values.city.trim()) nextErrors.city = 'City is required.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSave({
      ...values,
      name: values.name.trim(),
      organization: values.organization.trim(),
      city: values.city.trim(),
      address: values.address.trim(),
    })
  }

  return <Dialog
    open={open}
    onClose={onClose}
    className="!w-full !max-w-2xl"
    title={isEdit ? 'Edit Location' : 'New Location'}
    description={isEdit ? 'Update the details for this physical location.' : 'Add a physical location where Universal Packaging items can be received, stored, or moved.'}
    footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button type="submit" form={formId}>{isEdit ? 'Save Changes' : 'Create Location'}</Button></>}
  >
    <form id={formId} className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
      <Input label="Location Name" value={values.name} onChange={update('name')} error={errors.name} required />
      <Select
        label="Location Type"
        value={values.type}
        onChange={update('type')}
        error={errors.type}
        options={[{ value: '', label: 'Select location type' }, ...locationTypes.map((type) => ({ value: type, label: type }))]}
      />
      <Input label="Organization" value={values.organization} onChange={update('organization')} error={errors.organization} required />
      <Input label="City" value={values.city} onChange={update('city')} error={errors.city} required />
      <label className="field sm:col-span-2" htmlFor="location-address">
        <span className="field__label">Address</span>
        <textarea id="location-address" className="textarea-control" value={values.address} onChange={update('address')} placeholder="Pune, Maharashtra" />
      </label>
      <Select
        label="Status"
        value={values.status}
        onChange={update('status')}
        options={[{ value: 'Active', label: 'Active' }, { value: 'Disabled', label: 'Disabled' }]}
      />
    </form>
  </Dialog>
}
