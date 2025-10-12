<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

onMounted(() => {
  const route = useRoute()
  const nextPath = typeof route.query.next === 'string' ? route.query.next : '/'
  const base = import.meta.env.VITE_APP_LOGIN_URL as string
  const url = new URL('logout', base)
  url.searchParams.set('next', nextPath)
  window.location.replace(url.toString())
})
</script>
