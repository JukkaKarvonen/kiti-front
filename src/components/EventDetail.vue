<template>
  <q-page padding>
    <q-breadcrumbs class="q-mb-md">
      <q-breadcrumbs-el :label="$t('event.title', 2)" to="/events" />
      <q-breadcrumbs-el :label="event?.name || '-'" />
    </q-breadcrumbs>

    <q-inner-loading :showing="loading">
      <q-spinner />
    </q-inner-loading>

    <q-banner v-if="error" class="text-negative q-mb-md">{{ $t('error_loading') }}</q-banner>

    <div v-if="event">
      <div class="row">
        <div class="col-12">
          <h1>{{ event.name }}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 bg-secondary q-mb-md">
          <h2 class="heading-background">{{ $t('event.info') }}</h2>
        </div>
        <div class="col-12">
          <EventInformationBasic :event="event" />
        </div>
      </div>
      <div v-if="managePermission" class="row">
        <div class="col-12">
          <EventInformationManagement :event="event" @update:event="EventUpdate" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 bg-secondary q-mb-md">
          <h2 class="heading-background">{{ $t('competition.title', 2) }}</h2>
        </div>
        <div class="col-12">
          <CompetitionList :competitions="event?.competitions || []" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import eventsAPI from '../api/kiti/events'

import type { components } from '../api/kiti/schema'
import { AxiosError } from 'axios'
import { Notify } from 'quasar'
import { useAppStore } from 'src/stores/app'
const app = useAppStore()

type Event = components['schemas']['Event']

const { t } = useI18n()
const route = useRoute()
const loading = ref(true)
const error = ref<string | null>(null)
const event = ref<Event | undefined>(undefined)
import CompetitionList from './CompetitionList.vue'
import EventInformationBasic from './EventInformationBasic.vue'
import EventInformationManagement from './EventInformationManagement.vue'

onMounted(async () => {
  try {
    const id = Number(route.params.id)
    if (isNaN(id)) {
      throw new Error('Invalid event ID')
    }
    event.value = (await eventsAPI.getEvent(id)).data as unknown as Event
  } catch (err) {
    if (err instanceof AxiosError && err.response && err.response.status == 404) {
      error.value = 'error_404'
    } else {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: t('error_loading'),
        icon: 'report_problem',
      })
      event.value = {} as Event
      console.log('An unknown error occurred')
    }
  } finally {
    loading.value = false
  }
})

const managePermission = computed(() => {
  return app.user?.is_authenticated
})

async function EventUpdate(updated: Event) {
  if (!event.value) return
  const prev = { ...event.value }
  try {
    const res = await eventsAPI.patchEvent(Number(updated.id), updated)
    event.value = res.data as unknown as Event
  } catch (err) {
    if (err instanceof AxiosError && [401, 403].includes(err.response?.status ?? 0)) {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: t('error_update_no_permission'),
        icon: 'report_problem',
      })
    } else {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: t('error_loading'),
        icon: 'report_problem',
      })
      event.value = prev
    }
  }
}
</script>
