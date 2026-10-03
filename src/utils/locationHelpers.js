import { locations } from '../data/locations.js'

const operationalLocations = {
  'in-transit': {
    id: 'in-transit',
    name: 'In Transit',
    type: 'In Transit',
    status: 'Operational',
  },
}

export function getLocationById(locationId) {
  return locations.find((location) => location.id === locationId) ?? operationalLocations[locationId]
}

export function getLocationName(locationId, fallback = 'Unknown location') {
  return getLocationById(locationId)?.name ?? fallback
}

export function getLocationType(locationId, fallback = 'Unknown type') {
  return getLocationById(locationId)?.type ?? fallback
}

export function getLocationIdByName(name) {
  return locations.find((location) => location.name === name)?.id
}

export function resolveLocation(locationId, fallbackName = 'Unknown location') {
  const location = getLocationById(locationId)
  return location ?? { id: locationId, name: fallbackName, type: 'Unknown type' }
}
