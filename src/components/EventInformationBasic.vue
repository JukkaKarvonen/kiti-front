<template>
  <div class="row">
    <div v-if="props.event.description" class="col-12 q-mb-md">
      <div class="info-title">{{ $t('description') }}</div>
      <div class="info-content">{{ props.event.description }}</div>
    </div>
  </div>
  <div class="row">
    <div v-if="props.event.web_page" class="col-xs-12 col-md-6 q-mb-md">
      <div class="info-title">{{ $t('web_page') }}</div>
      <div class="info-content">{{ props.event.web_page }}</div>
    </div>
    <div v-if="props.event.invitation" class="col-xs-12 col-md-6 q-mb-md">
      <div class="info-title">{{ $t('invitation') }}</div>
      <div class="info-content">{{ props.event.invitation }}</div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('date') }}</div>
      <div v-if="props.event.date_start === props.event.date_end" class="info-content">
        {{ props.event.date_start }}
      </div>
      <div v-else class="info-content">
        {{ props.event.date_start }} - {{ props.event.date_end }}
      </div>
    </div>
    <div class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('organizer') }}</div>
      <div class="info-content">{{ props.event.organization_info.name }}</div>
    </div>
    <div class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('location') }}</div>
      <div class="info-content">{{ props.event.location }}</div>
    </div>
    <div v-if="props.event.categories" class="col-xs-12 q-mb-md">
      <div class="info-title">{{ $t('categories') }}</div>
      <div class="info-content">{{ props.event.categories }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from '../api/kiti/schema'
type Event = components['schemas']['Event']

const props = defineProps<{
  event: Event
}>()
</script>
