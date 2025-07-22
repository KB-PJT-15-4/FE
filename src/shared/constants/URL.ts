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
      CREATE: '/trip/create',
      RESERVATION: (tripId: string) => `/trip/${tripId}/reservation`,
    },
  },
}

export default URL
