import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertiesView from '../views/PropertiesView.vue'
import PropertyDetailView from '../views/PropertyDetailView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/properties',
      name: 'properties',
      component: PropertiesView
    },
    {
      path: '/property-details/:id?',
      name: 'property-details',
      component: PropertyDetailView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ],
})

export default router
