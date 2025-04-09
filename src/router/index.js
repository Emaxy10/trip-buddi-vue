/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import Page from '@/components/Page.vue'
import AddPlace from '@/pages/AddPlace.vue'
import PlacesPage from '@/pages/PlacesPage.vue'
import EditPlace from '@/pages/EditPlace.vue'
import { components } from 'vuetify/dist/vuetify-labs.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      name:'home',
      component: Page
    },
    {
      path:'/register',
      name:'register',
      component: RegistrationPage
    },
    {
      path:'/login',
      name:'login',
      component: LoginPage
    },
    {
      path:'/place/add',
      name:'add-place',
      component: AddPlace,
      
    },
    {
      path:'/place/edit/:id',
      name:'edit-place',
      component: EditPlace,
      
    },
    {
      path:'/place',
      name:'place',
      component: PlacesPage,
      
    }
  ],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
