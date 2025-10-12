import { type APIResponse } from '../types'
import type { paths, components } from './schema.ts'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

type Event = components['schemas']['Event']
type EventList = components['schemas']['PaginatedEventList']
type EventRetrieve = paths['/api/events/']['get']
type EventCreate = paths['/api/events/']['post']['requestBody']['content']['application/json']
type EventUpdate = paths['/api/events/{id}/']['put']['requestBody']['content']['application/json']

async function getEvents(query: EventRetrieve['parameters']['query'] = {}) {
  const result = await api.get<EventList>('events/', { params: query }).catch((error) => {
    const $q = useQuasar()
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Loading failed',
      icon: 'report_problem',
    })
    console.error('Failed to fetch events:', error)
    return { data: { count: 0, page: 1, limit: 1, next: null, previous: null, results: [] } }
  })
  return result.data
}

async function getEvent(id: number) {
  return await api.get<APIResponse<Event>>(`events/${id}/`)
}

async function createEvent(event: EventCreate) {
  return await api.post<APIResponse<Event>>('events/', event)
}

async function updateEvent(id: number, event: EventUpdate) {
  return await api.put<APIResponse<Event>>(`events/${id}/`, event)
}

async function deleteEvent(id: number) {
  return await api.delete<APIResponse<Event>>(`events/${id}/`)
}

export default {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
}
