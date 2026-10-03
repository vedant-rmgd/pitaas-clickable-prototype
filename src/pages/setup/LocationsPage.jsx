import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { locations, locationTypes } from '../../data/locations'
import { LocationsTable } from '../../components/location/LocationsTable'
import { LocationFormDialog } from '../../components/location/LocationFormDialog'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { PageContainer } from '../../components/ui/PageContainer'
import { PageHeader } from '../../components/ui/PageHeader'
import { Select } from '../../components/ui/Select'

export function LocationsPage() {
  const [locationList, setLocationList] = useState(locations)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [formState, setFormState] = useState({ open: false, mode: 'create', location: null })

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return locationList.filter((location) => {
      const matchesQuery = !normalizedQuery || `${location.name} ${location.organization} ${location.city}`.toLowerCase().includes(normalizedQuery)
      const matchesType = !typeFilter || location.type === typeFilter
      return matchesQuery && matchesType
    })
  }, [locationList, query, typeFilter])

  const openCreate = () => setFormState({ open: true, mode: 'create', location: null })
  const openEdit = (location) => setFormState({ open: true, mode: 'edit', location })
  const closeForm = () => setFormState({ open: false, mode: 'create', location: null })

  const saveLocation = (values) => {
    if (formState.mode === 'edit') {
      setLocationList((current) => current.map((location) => location.id === formState.location.id ? { ...location, ...values } : location))
    } else {
      const baseId = values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'new-location'
      let nextId = baseId
      let suffix = 2
      while (locationList.some((location) => location.id === nextId)) {
        nextId = `${baseId}-${suffix}`
        suffix += 1
      }
      setLocationList((current) => [...current, { id: nextId, ...values }])
    }
    closeForm()
  }

  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Setup / Locations"
      title="Locations"
      subtitle="Manage the physical locations where Universal Packaging items can be stored, received, or moved."
      actions={<Button onClick={openCreate}><Plus size={16} aria-hidden="true" />New Location</Button>}
    />

    <Card className="mb-5 grid gap-3 p-4 md:grid-cols-[minmax(0,1.5fr)_minmax(220px,1fr)]">
      <Input
        label="Search"
        placeholder="Search locations by name, organization, or city..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Select
        label="Location Type"
        value={typeFilter}
        onChange={(event) => setTypeFilter(event.target.value)}
        options={[{ value: '', label: 'All Locations' }, ...locationTypes.map((type) => ({ value: type, label: type }))]}
      />
    </Card>

    <Card className="table-card">
      <LocationsTable locations={filteredLocations} onEdit={openEdit} />
    </Card>
    <LocationFormDialog
      key={`${formState.open}-${formState.mode}-${formState.location?.id ?? 'new'}`}
      open={formState.open}
      mode={formState.mode}
      location={formState.location}
      locationTypes={locationTypes}
      onClose={closeForm}
      onSave={saveLocation}
    />
  </PageContainer>
}
