import Certification from '@/pages/auth/Certification.vue'
import Login from '@/pages/auth/Login.vue'
import SignUp from '@/pages/auth/SignUp.vue'
import Home from '@/pages/home/Home.vue'
import Notification from '@/pages/home/Notification.vue'
import RecordCreate from '@/pages/record/RecordCreate.vue'
import RecordDetail from '@/pages/record/RecordDetail.vue'
import Map from '@/pages/record/RecordMap.vue'
import Test from '@/pages/Test.vue'
import CreateTrip from '@/pages/trip/CreateTrip.vue'
import PaySettle from '@/pages/trip/PaySettle.vue'
import PaySettleStatus from '@/pages/trip/PaySettleStatus.vue'
import Reservation from '@/pages/trip/Reservation.vue'
import TripDetail from '@/pages/trip/TripDetail.vue'
import TripList from '@/pages/trip/TripList.vue'
import URL from '@/shared/constants/URL'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: URL.PAGE.AUTH.LOGIN,
      name: 'login',
      component: Login,
      meta: { layout: false },
    },
    {
      path: URL.PAGE.AUTH.SIGNUP,
      name: 'signup',
      component: SignUp,
      meta: { layout: false },
    },
    {
      path: URL.PAGE.AUTH.CERTIFICATION,
      name: 'certification',
      component: Certification,
      meta: { layout: false },
    },
    {
      path: URL.PAGE.MAIN.HOME,
      name: 'home',
      component: Home,
    },
    {
      path: URL.PAGE.MAIN.NOTIFICATION,
      name: 'notification',
      component: Notification,
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
      path: URL.PAGE.TRIP.RESERVATION,
      name: 'reservation',
      component: Reservation,
    },
    {
      path: URL.PAGE.TRIP.CREATE,
      name: 'create_trip',
      component: CreateTrip,
    },
    {
      path: URL.PAGE.TRIP.SETTLE,
      name: 'settle',
      component: PaySettle,
    },
    {
      path: URL.PAGE.TRIP.SETTLE_STATUS,
      name: 'settle_status',
      component: PaySettleStatus,
    },
    {
      path: URL.PAGE.RECORD.MAP,
      name: 'map',
      component: Map,
    },
    {
      path: URL.PAGE.RECORD.DETAIL,
      name: 'record_detail',
      component: RecordDetail,
    },
    {
      path: URL.PAGE.RECORD.CREATE,
      name: 'record_create',
      component: RecordCreate,
    },
    {
      path: URL.PAGE.TEST,
      name: 'test',
      component: Test,
    },
  ],
})

export default router
