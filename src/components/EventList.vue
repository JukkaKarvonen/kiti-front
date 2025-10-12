<template>
  <q-table
    ref="tableRef"
    v-model:pagination="pagination"
    flat
    :title="$t('event.title', 2)"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :loading="loading"
    :filter="filter"
    binary-state-sort
    class="hide-side-borders"
    @request="getEvents"
    @row-click="
      (_ev: any, row: { id: any }) => {
        $router.push({ name: 'event-details', params: { id: row.id } })
      }
    "
  >
    <template #body-cell-date="props">
      <td class="align-top wrap-text" style="width: 250px">
        <span>{{ props.row.date_start }}</span>
        <span v-if="props.row.date_end && props.row.date_end !== props.row.date_start">
          - {{ props.row.date_end }}
        </span>
      </td>
    </template>
    <template #body-cell-name="props">
      <td class="align-top" style="width: 400px">
        <span class="wrap-text">{{ props.row.name }}</span>
        <ul aria-label="List of competitions">
          <li v-for="competition in props.row.competitions" :key="competition.id">
            {{ competition.type }}
          </li>
        </ul>
      </td>
    </template>
    <template #top-right>
      <q-input v-model="filter" borderless dense debounce="300" :placeholder="$t('search')">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import eventsAPI from './api/kiti/events'
import type { components } from './api/kiti/schema.ts'
import type { QTableProps, QTableColumn } from 'quasar'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
type Event = components['schemas']['Event']

const columns: QTableColumn[] = [
  { name: 'date', label: t('date'), field: 'date_start', align: 'left', style: 'width: 150px;' },
  {
    name: 'name',
    label: t('name'),
    field: 'name',
    align: 'left',
    classes: 'wrap-text',
    style: 'width: 500px;',
  },
  {
    name: 'organization',
    label: t('organizer'),
    field: 'organization_info.abbreviation',
    align: 'left',
    format: (val: string, row: { organization_info: { abbreviation: string } }) =>
      row.organization_info?.abbreviation || '',
    classes: 'gt-sm align-top',
    headerClasses: 'gt-sm',
    style: 'width: 150px;',
  },
  {
    name: 'location',
    label: t('location'),
    field: 'location',
    align: 'left',
    classes: 'gt-md wrap-text align-top',
    headerClasses: 'gt-md',
    style: 'width: 300px;',
  },
]
let rows: Event[] = []
const tableRef = ref()
const filter = ref('' as string | number | null)
const loading = ref(false)
const pagination = ref<NonNullable<QTableProps['pagination']>>({
  sortBy: null,
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

const getQueryParams = () => {
  const page = pagination.value.page as number
  const rowsPerPage = pagination.value.rowsPerPage as number
  let search = ''
  if (typeof filter.value === 'undefined' || filter.value === null) {
    search = ''
  } else if (typeof filter.value === 'number') {
    search = filter.value.toString()
  } else {
    search = filter.value
  }
  return {
    limit: rowsPerPage,
    page: page,
    search: search,
  }
}

const getEvents = async (props?: { pagination: QTableProps['pagination'] }) => {
  if (props?.pagination) {
    pagination.value = { ...pagination.value, ...props.pagination }
  }

  loading.value = true
  try {
    const response = await eventsAPI.getEvents(getQueryParams())
    rows = response.results
    pagination.value.rowsNumber = response.count
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>

<style scoped></style>
