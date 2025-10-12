<template>
  <div class="text-center flex flex-center">
    <div>
      <h1 class="text-h1">404</h1>

      <p class="text-h2">{{ $t('error_404') }}</p>

      <q-btn class="q-mt-xl" :label="$t('back')" no-caps @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>
