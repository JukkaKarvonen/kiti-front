import { defineBoot } from '#q-app/wrappers'
import axios, { type InternalAxiosRequestConfig, type AxiosError } from 'axios'
import { Lang } from 'quasar'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: true,
})

api.defaults.xsrfCookieName = 'csrftoken'
api.defaults.xsrfHeaderName = 'X-CSRFToken'
api.defaults.withXSRFToken = true

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      config.headers['Accept-Language'] = Lang.getLocale()
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default defineBoot(({ app }) => {
  app.provide('api', api)
})

export { api }
