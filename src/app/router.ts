import Certification from '@/pages/Certification.vue'
import CreateTrip from '@/pages/CreateTrip.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import SignUp from '@/pages/SignUp.vue'
import Test from '@/pages/Test.vue'
import TripDetail from '@/pages/TripDetail.vue'
import TripList from '@/pages/TripList.vue'
import URL from '@/shared/constants/URL'
import { createRouter, createWebHistory } from 'vue-router'
import Map from '@/pages/Map.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: URL.PAGE.HOME,
      name: 'home',
      component: Home,
    },
    {
      path: URL.PAGE.LOGIN,
      name: 'login',
      component: Login,
      meta: { layout: false },
    },
    {
      path: URL.PAGE.SIGNUP,
      name: 'signup',
      component: SignUp,
      meta: { layout: false },
    },
    {
      path: URL.PAGE.TEST,
      name: 'test',
      component: Test,
    },
    {
      path: URL.PAGE.CERTIFICATION,
      name: 'certification',
      component: Certification,
      meta: { layout: false },
    },
    {
      path: URL.PAGE.TRIP.TRIP_LIST,
      name: 'trip_list',
      component: TripList,
    },
    {
      path: URL.PAGE.TRIP.DETAIL,
      name: 'trip_detail',
      component: TripDetail,
    },
    {
      path: URL.PAGE.TRIP.CREATE,
      name: 'create_trip',
      component: CreateTrip,
    },
    {
      path: URL.PAGE.MAP,
      name: 'map',
      component: Map,
    }
  ],
})

export default router
