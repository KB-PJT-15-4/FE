const URL = {
  PAGE: {
    AUTH: {
      LOGIN: '/',
      SIGNUP: '/signup',
      CERTIFICATION: '/certification',
    },
    MAIN: {
      HOME: '/main/home',
      NOTIFICATION: '/main/notification',
    },
    RECORD: {
      MAP: '/record/map',
      DETAIL: '/record/:tripId/detail',
      CREATE: '/record/:tripId/create/',
      MODIFY: '/record/:tripId/modify/:postId',
    },
    TRIP: {
      TRIP_LIST: '/trip/trip_list',
      DETAIL: `/trip/:tripId`,
      CREATE: '/trip/create',
      // RESERVATION: `/trip/:tripId/reservation/:itemId`,
      RESERVATION: `/trip/:tripId/reservation`,
    },
    TEST: '/test',
  },
}

export default URL
