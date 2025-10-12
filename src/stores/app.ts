import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Cookies } from 'quasar'

import { getCurrentUser } from 'src/api/kiti/users'

export type UserInfo = {
  is_authenticated: boolean
  is_staff: boolean
  area_manager: unknown[]
  sport_manager: unknown[]
  error?: unknown
}

export const useAppStore = defineStore('app', () => {
  const user = ref<UserInfo>({
    is_authenticated: false,
    is_staff: false,
    area_manager: [],
    sport_manager: [],
  })

  const editMode = ref(Cookies.get('editMode') === 'true')

  watch(editMode, (v) => {
    Cookies.set('editMode', String(v), { path: '/', expires: 365 })
  })

  function setUserInfo(info: UserInfo) {
    user.value = info
  }

  async function loadUserInfo() {
    try {
      const data = await getCurrentUser()
      setUserInfo(data as UserInfo)
    } catch (error: unknown) {
      setUserInfo({
        is_authenticated: false,
        is_staff: false,
        area_manager: [],
        sport_manager: [],
        error: (error as { response?: unknown })?.response,
      })
    }
  }

  return {
    user,
    editMode,
    setUserInfo,
    loadUserInfo,
  }
})
