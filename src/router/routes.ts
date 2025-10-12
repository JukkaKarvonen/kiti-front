import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'events', component: () => import('pages/EventList.vue') },
      {
        path: 'events/:id',
        name: 'event-details',
        component: () => import('pages/EventDetail.vue'),
      },
      {
        path: '/login',
        component: () => import('pages/LoginRedirect.vue'),
      },
      {
        path: '/logout',
        component: () => import('pages/LogoutRedirect.vue'),
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
]

export default routes
