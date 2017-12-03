import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Habits from '@/components/Habits'
import Habit from '@/components/Habit'
import CreateHabit from '@/components/CreateHabit'
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
      path: '/habit/new',
      name: 'CreateHabits',
      component: CreateHabit
    },
    {
      path: '/habits/:id',
      props: true,
      name: 'habit',
      component: Habit
    },
    {
      path: '/tracking',
      name: 'tracking',
      component: Tracking
    }
  ]
})
