import { Component } from 'vue'

export default [
  {
    path: '/',
    name: 'home',
    component: (): Promise<Component> => import('./index.vue'),
    meta: {
      title: 'home',
      pv: {
        page_type: 'home',
        page_name: 'home'
      }
    }
  }
]
