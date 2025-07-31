import Certification from '@/pages/auth/Certification.vue'
import Login from '@/pages/auth/Login.vue'
import SignUp from '@/pages/auth/SignUp.vue'
import Home from '@/pages/home/Home.vue'
import Notification from '@/pages/home/Notification.vue'
import RecordCreate from '@/pages/record/RecordCreate.vue'
import RecordDetail from '@/pages/record/RecordDetail.vue'
import Map from '@/pages/record/RecordMap.vue'
import RecordReport from '@/pages/record/RecordReport.vue'
import Reservation from '@/pages/reservation/Reservation.vue'
import ReservationStatus from '@/pages/reservation/ReservationStatus.vue'
import SelectSeat from '@/pages/reservation/SelectSeat.vue'
import Test from '@/pages/Test.vue'
import CreateTrip from '@/pages/trip/CreateTrip.vue'
import PaySettle from '@/pages/trip/PaySettle.vue'
import PaySettleStatus from '@/pages/trip/PaySettleStatus.vue'
import TripDetail from '@/pages/trip/TripDetail.vue'
import TripList from '@/pages/trip/TripList.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { layout: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: { layout: false },
    },
    {
      path: '/certification',
      name: 'certification',
      component: Certification,
      meta: { layout: false },
    },
    {
      path: '/main/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/main/notification',
      name: 'notification',
      component: Notification,
    },

    {
      path: '/trip/trip_list',
      name: 'trip_list',
      component: TripList,
    },
    {
      path: '/trip/:tripId',
      name: 'trip_detail',
      component: TripDetail,
    },
    {
      path: '/trip/:tripId/reservation',
      name: 'reservation',
      component: Reservation,
    },
    {
      path: '/trip/:tripId/reservation/pay/status',
      name: 'pay_status',
      component: ReservationStatus,
    },
    {
      path: '/trip/:tripId/reservation/select_seat',
      name: 'select_seat',
      component: SelectSeat,
    },
    {
      path: '/trip/create',
      name: 'create_trip',
      component: CreateTrip,
    },
    {
      path: '/trip/:tripId/settle/:settleId',
      name: 'settle',
      component: PaySettle,
    },
    {
      path: '/trip/:tripId/settle/:settleId/status',
      name: 'settle_status',
      component: PaySettleStatus,
    },
    {
      path: '/record/map',
      name: 'map',
      component: Map,
    },
    {
      path: '/record/:tripId/detail',
      name: 'record_detail',
      component: RecordDetail,
    },
    {
      path: '/record/:tripId/create',
      name: 'record_create',
      component: RecordCreate,
    },
    {
      path: '/record/:tripId/detail/:recordId',
      name: 'record_report',
      component: RecordReport,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
  ],
})

export default router
