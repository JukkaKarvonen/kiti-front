<template>
  <div class="row">
    <div class="col-12 q-mb-md">
      <div class="info-title">{{ $t('notes') }}</div>
      <div class="info-content">{{ props.event.notes || $t('no_notes') }}</div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('safety_plan') }}</div>
      <q-icon v-if="props.event.safety_plan" name="check" color="positive" size="2rem" />
      <q-icon v-else name="warning_amber" color="negative" size="2rem" />
    </div>
    <div v-if="app.editMode" class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('approved') }}</div>
      <q-toggle v-model="approveModel" checked-icon="check" color="green" unchecked-icon="clear" />
      <q-checkbox v-model="approveIncludeCompetitions" :label="$t('include_competitions')" />
    </div>
    <div v-if="app.editMode" class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('published') }}</div>
      <q-toggle
        v-model="publishModel"
        checked-icon="visibility"
        color="green"
        unchecked-icon="clear"
      />
      <q-checkbox v-model="publishIncludeCompetitions" :label="$t('include_competitions')" />
    </div>
    <div v-if="app.editMode" class="col-xs-6 col-md-3 q-mb-md">
      <div class="info-title">{{ $t('locked') }}</div>
      <q-toggle v-model="lockModel" checked-icon="lock" color="black" unchecked-icon="lock_open" />
      <q-checkbox v-model="lockIncludeCompetitions" :label="$t('include_competitions')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { components } from '../api/kiti/schema'
import { useAppStore } from 'src/stores/app'
const app = useAppStore()
type Event = components['schemas']['Event']
const approveIncludeCompetitions = ref(false)
const publishIncludeCompetitions = ref(false)
const lockIncludeCompetitions = ref(false)

const props = defineProps<{
  event: Event
}>()
const emit = defineEmits<{ (e: 'update:event', value: Event): void }>()
const approveModel = computed<boolean>({
  get: () => !!props.event.approved,
  set: (val) =>
    emit('update:event', {
      ...props.event,
      approved: val,
      include_competitions: approveIncludeCompetitions.value,
    }),
})

const publishModel = computed<boolean>({
  get: () => !!props.event.public,
  set: (val) =>
    emit('update:event', {
      ...props.event,
      public: val,
      include_competitions: publishIncludeCompetitions.value,
    }),
})
const lockModel = computed<boolean>({
  get: () => !!props.event.locked,
  set: (val) =>
    emit('update:event', {
      ...props.event,
      locked: val,
      include_competitions: lockIncludeCompetitions.value,
    }),
})
</script>
