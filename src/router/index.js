import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import SubNavbar from '@/components/navbar/SubNavbar.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile/Profile.vue'
import AddProject from '@/views/AddProject.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/',
    name: 'Sub',
    component: SubNavbar,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: '/profile/:id',
        name: 'profile',
        component: Profile
      },
      {
        path: '/add-project',
        name: 'Add Project',
        component: AddProject
      }
    ]
  }
]

// add meta tag to route to secure that path
// meta: { requiresAuth: true }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Enable whenever the authentication flow works
  // const loggedIn = localStorage.getItem("user");

  // if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
  //   next("/");
  // }
  next()
})

export default router
