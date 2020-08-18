import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Contacts from '../components/Contacts.vue'

Vue.use(Router)

const routes = [{
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/user/:id',
    name: 'home',
    component: Home,
    children: [{
        path: '/user/:id/contacts',
        name: 'contacts',
        component: Contacts
      },
      {
        path: '/user/:id/profile',
        name: 'profile',
        component: Profile
      },

    ]
  },
]

export default new Router({
  routes: routes
})
