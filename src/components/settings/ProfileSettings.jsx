import { useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

const initialProfile = {
  name: 'Apex Manager',
  email: 'manager@apex.com',
  role: 'Customer Admin',
  organization: 'Apex Manufacturing Pvt Ltd',
  phone: '+91 98765 43210',
}

export function ProfileSettings() {
  const [profile, setProfile] = useState(initialProfile)
  const [message, setMessage] = useState('')

  const updateProfile = (field) => (event) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }))
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Profile updated successfully.')
  }

  return <Card className="!p-0 !overflow-hidden">
    <div className="border-b border-(--border) px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-(--text)">Profile</h2>
      <p className="mt-1 text-sm text-(--text-muted)">View your account details and update your personal information.</p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <Input label="Name" value={profile.name} onChange={updateProfile('name')} required autoComplete="name" />
        <Input label="Phone Number" value={profile.phone} onChange={updateProfile('phone')} required autoComplete="tel" />
        <Input label="Email" value={profile.email} readOnly className="bg-(--surface-muted) text-(--text-muted)" />
        <Input label="Role" value={profile.role} readOnly className="bg-(--surface-muted) text-(--text-muted)" />
        <Input label="Organization" value={profile.organization} readOnly className="bg-(--surface-muted) text-(--text-muted) sm:col-span-2" />
      </div>
      <div className="flex flex-col gap-3 border-t border-(--border) bg-(--surface-muted) px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
        {message && <p className="text-sm font-medium text-green-700 sm:mr-auto" role="status">{message}</p>}
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  </Card>
}
