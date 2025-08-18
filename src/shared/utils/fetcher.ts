// apiClient.ts
import { map } from '@/entities/map/map.api'
import { record } from '@/entities/record/record.api'
import { trip } from '@/entities/trip/trip.api'
import { user } from '@/entities/user/user.api'

export interface Paged<T> {
  content: T[]
  totalPages: number
  totalElements: number
}

export interface ApiData<T> {
  code: string
  data: T
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type ApiEndpoint = {
  url: string
  method: Method
}

export const API_END_POINT = {
  user,
  trip,
  map,
  record,
}
export type JsonRequestOptions = Omit<RequestOptions, 'raw'>

// ========== Types ==========
export interface ClientOptions {
  baseURL?: string
  getAccessToken?: () => string | null
  onUnauthorized?: () => void
  timeoutMs?: number
  defaultCredentials?: RequestCredentials
  enableLog?: boolean
}

export interface RequestOptions extends Omit<RequestInit, 'method' | 'body' | 'headers'> {
  method?: HttpMethod
  params?: Record<string, string | number | boolean | undefined | null>
  data?: unknown // JSON 자동 직렬화 (body 대신)
  headers?: HeadersInit // 추가 헤더
  raw?: boolean // true면 Response 그대로 반환
  noAuth?: boolean // true면 Authorization 미주입
}

export interface HttpError<E> extends Error {
  status: number
  data?: E
}

// ========== Utils ==========
function buildUrl(url: string, params?: RequestOptions['params']) {
  if (!params) return url

  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    sp.append(k, String(v))
  }

  const q = sp.toString()
  return q ? `${url}${url.includes('?') ? '&' : '?'}${q}` : url
}

function mergeHeaders(base: HeadersInit, extra?: HeadersInit): Headers {
  const h = new Headers(base)
  if (extra) {
    new Headers(extra).forEach((v, k) => h.set(k, v))
  }
  return h
}

// ========== Client Factory ==========
export function createFetchClient({
  getAccessToken = () =>
    typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null,
  onUnauthorized,
  timeoutMs = 15_000,
  defaultCredentials = 'include',
  enableLog = import.meta.env.DEV,
}: ClientOptions) {
  // ---- 오버로드 시그니처 (raw 여부에 따라 반환 타입 구분) ----
  async function request<T, E = unknown>(
    url: string,
    opts?: RequestOptions & { raw?: false }
  ): Promise<T>
  async function request<E = unknown>(
    url: string,
    opts: RequestOptions & { raw: true }
  ): Promise<Response>

  // ---- 구현 ----
  async function request<T, E = unknown>(
    url: string,
    opts: RequestOptions = {} as RequestOptions
  ): Promise<T | Response> {
    const {
      method = 'GET',
      params,
      data,
      headers,
      noAuth,
      raw,
      credentials = defaultCredentials,
      ...rest
    } = opts

    const finalUrl = buildUrl(url, params)

    // 기본 헤더
    const isForm = typeof FormData !== 'undefined' && data instanceof FormData
    const defaultHeaders: HeadersInit = isForm
      ? { Accept: 'application/json' }
      : { Accept: 'application/json', 'Content-Type': 'application/json' }

    let composed = mergeHeaders(defaultHeaders)

    if (!noAuth) {
      const token = getAccessToken()
      if (token) composed.set('Authorization', `Bearer ${token}`)
    }
    composed = mergeHeaders(composed, headers)

    const init: RequestInit = {
      method,
      headers: composed,
      credentials,
      body: data === undefined ? undefined : isForm ? (data as FormData) : JSON.stringify(data),
      ...rest,
    }

    if (enableLog) console.debug('[fetch] >>', method, finalUrl, init)

    const res = await Promise.race([
      fetch(finalUrl, init),
      new Promise<Response>((_, rej) =>
        setTimeout(() => rej(new Error('Request timeout')), timeoutMs)
      ),
    ])

    if (raw) return res // 타입: Response

    const text = await res.text()
    let parsed: unknown = null
    if (text) {
      try {
        parsed = JSON.parse(text)
      } catch {
        parsed = text
      }
    }

    if (!res.ok) {
      if (res.status === 401) onUnauthorized?.()

      const msg =
        typeof parsed === 'object' &&
        parsed !== null &&
        'message' in (parsed as Record<string, unknown>)
          ? String((parsed as Record<string, unknown>).message)
          : `HTTP ${res.status}`
      const err = new Error(msg) as HttpError<E>
      err.status = res.status
      err.data = parsed as E
      if (enableLog) console.error('[fetch] << ERR', res.status, parsed)
      throw err
    }

    if (enableLog) console.debug('[fetch] <<', res.status, parsed)
    return parsed as T
  }

  return { request }
}

export type FetchClient = ReturnType<typeof createFetchClient>
