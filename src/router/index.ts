import { createRouter, createWebHistory } from 'vue-router'
import Home from './../pages/Home/Home.vue'
import FlightDetails from './../pages/FlightDetails/FlightDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/flightDetails/:flightId',
      name: 'flightDetails',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FlightDetails
    }
  ]
})

export default router
