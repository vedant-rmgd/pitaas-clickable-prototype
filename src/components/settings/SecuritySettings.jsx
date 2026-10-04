import { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

const emptyPasswordValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export function SecuritySettings() {
  const [values, setValues] = useState(emptyPasswordValues)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const updateValue = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!values.currentPassword) nextErrors.currentPassword = 'Current password is required.'
    if (!values.newPassword) nextErrors.newPassword = 'New password is required.'
    else if (values.newPassword.length < 8) nextErrors.newPassword = 'Password must be at least 8 characters.'
    if (!values.confirmPassword) nextErrors.confirmPassword = 'Confirm password is required.'
    else if (values.newPassword !== values.confirmPassword) nextErrors.confirmPassword = 'New passwords do not match.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setMessage('')
      return
    }

    setErrors({})
    setValues(emptyPasswordValues)
    setMessage('Password changed successfully.')
  }

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Security</h2>
      <p className="mt-1 text-sm text-(--text-muted)">Change your password to keep your account secure.</p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <Input
          label="Current Password"
          type="password"
          value={values.currentPassword}
          onChange={updateValue('currentPassword')}
          error={errors.currentPassword}
          autoComplete="current-password"
        />
        <div className="hidden sm:block" aria-hidden="true" />
        <Input
          label="New Password"
          type="password"
          value={values.newPassword}
          onChange={updateValue('newPassword')}
          error={errors.newPassword}
          hint="Use at least 8 characters."
          autoComplete="new-password"
        />
        <Input
          label="Confirm New Password"
          type="password"
          value={values.confirmPassword}
          onChange={updateValue('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />
      </div>
      <div className="flex flex-col gap-3 border-t border-(--border) bg-(--surface-muted) px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
        {message && <p className="text-sm font-medium text-green-700 sm:mr-auto" role="status">{message}</p>}
        <Button type="submit">Change Password</Button>
      </div>
    </form>
  </Card>
}
