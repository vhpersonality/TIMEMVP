import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/today'
  },
  {
    path: '/today',
    name: 'today',
    component: () => import('@/views/TodayView.vue')
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: () => import('@/views/InboxView.vue')
  },
  {
    path: '/list/:id',
    name: 'list',
    component: () => import('@/views/ListView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/today'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router