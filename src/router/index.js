import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Habits from '@/components/Habits'
import Tracking from '@/components/Tracking'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/habits',
      name: 'habits',
      component: Habits
    },
    {
      path: '/tracking',
      name: 'tracking',
      component: Tracking
    }
  ]
})
