import { boot } from 'quasar/wrappers'
import { useAppStore } from 'src/stores/app'

export default boot(async ({ router }) => {
  const app = useAppStore()
  console.log('Auth boot - loading current user info')
  // Load current user once on initial load (handles coming from external login)
  await app.loadUserInfo().catch(() => {})

  // Optional: protect routes that need auth
  router.beforeEach((to) => {
    if (to.meta?.requiresAuth && !app.user.is_authenticated) {
      return { path: '/login', query: { next: to.fullPath } }
    }
  })
})
