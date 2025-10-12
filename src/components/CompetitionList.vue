<template>
  <q-table
    ref="tableRef"
    flat
    :rows="props.competitions"
    :columns="columns"
    :hide-bottom="props.competitions.length <= 50"
    :rows-per-page-options="[50]"
    row-key="id"
    binary-state-sort
    class="hide-side-borders"
  >
    <template #body-cell-date="data">
      <td class="align-top wrap-text" style="width: 250px">
        <span>{{ data.row.date_start }}</span>
        <span v-if="data.row.date_end && data.row.date_end !== data.row.date_start">
          - {{ data.row.date_end }}
        </span>
      </td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { components } from '../api/kiti/schema'

const { t } = useI18n()
import type { QTableColumn } from 'quasar'

const columns: QTableColumn[] = [
  { name: 'date', label: t('date'), field: 'date_start', align: 'left', style: 'width: 150px;' },
  { name: 'type', label: t('competition.type'), field: 'type', align: 'left' },
  { name: 'level', label: t('competition.level'), field: 'level', align: 'left' },
]

const props = defineProps<{
  competitions: components['schemas']['CompetitionInfo'][]
}>()
</script>
