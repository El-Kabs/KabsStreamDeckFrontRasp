import Vue from 'vue'
import VueRouter from 'vue-router'
import Deck from '@/components/Deck.vue'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'vue-material-design-icons/styles.css';
  

Vue.use(Vuesax)

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Deck',
    component: Deck
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
