<template>
  <q-btn
    v-for="option in languageOptions"
    :key="option.value"
    v-close-popup
    clickable
    :class="customClass"
    @click="changelanguage(option.value)"
  >
    {{ option.value }}
  </q-btn>
</template>

<script setup lang="ts">
defineProps<{ customClass?: string }>()
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'fi', label: 'Suomi' },
]

function changelanguage(newLanguage: string) {
  locale.value = newLanguage
  localStorage.setItem('language', newLanguage)
}
</script>
