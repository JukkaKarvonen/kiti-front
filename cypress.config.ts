import 'dotenv/config'
import { defineConfig } from 'cypress'

const publicPath = process.env.VITE_APP_PUBLIC_PATH || '/'

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:9000${publicPath === '/' ? '' : publicPath}`,
    env: {
      APP_PUBLIC_PATH: publicPath,
      ROUTER_MODE: 'history',
    },
  },
})
