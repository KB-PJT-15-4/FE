import { map } from '@/entities/map/map.api'
import { trip } from '@/entities/trip/trip.api'
import { user } from '@/entities/user/user.api'
import { record } from '@/entities/record/record.api'

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

type ApiEndpoint = {
  url: string
  method: Method
}

const API_END_POINT = {
  user,
  trip,
  map,
  record,
}

export { API_END_POINT, Method }
export type { ApiEndpoint }
