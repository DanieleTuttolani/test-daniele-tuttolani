import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import FolderPage from '@/views/FolderPage.vue';
import FilterResult from '@/views/FilterResult.vue';



const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox'
  },
  {
    path: '/folder/:id',
    component: FolderPage,
    name:'Home'
  },
 {
  path:'/filter/:filterData',
  props: true,
  name: 'filterResults',
  component: FilterResult
 }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
