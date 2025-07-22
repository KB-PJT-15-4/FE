const URL = {
  PAGE: {
    LOGIN: '/',
    HOME: '/home',
    SIGNUP: '/signup',
    NOTIFICATION: '/notification',
    MAP: '/map',
    TEST: '/test',
    CERTIFICATION: '/certification',
    TRIP: {
      TRIP_LIST: '/trip/trip_list',
      DETAIL: `/trip/:tripId`,
      CREATE: '/trip/create',
      RESERVATION: `/trip/:tripId/reservation`,
    },
  },
}

export default URL
