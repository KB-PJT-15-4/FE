// apiClient.ts
import { map } from '@/entities/map/map.api'
import { trip } from '@/entities/trip/trip.api'
import { user } from '@/entities/user/user.api'

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

export const API_END_POINT = { user, trip, map }
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
function buildUrl(baseURL: string, url: string, params?: RequestOptions['params']) {
  const full = url.startsWith('http') ? url : `${baseURL}${url}`
  if (!params) return full
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    sp.append(k, String(v))
  }
  const q = sp.toString()
  return q ? `${full}${full.includes('?') ? '&' : '?'}${q}` : full
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
  baseURL = '',
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

    const finalUrl = buildUrl(baseURL, url, params)

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

    // 파싱은 unknown으로 안전하게
    const text = await res.text()
    let parsed: unknown = null
    if (text) {
      try {
        parsed = JSON.parse(text)
      } catch {
        parsed = text // 서버가 순수 문자열을 반환할 수도 있음
      }
    }

    if (!res.ok) {
      if (res.status === 401) onUnauthorized?.()
      // 에러 메시지 도출: 객체면 message, 문자열이면 그대로
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

  // 편의 메서드
  return {
    request,
    get: <T, E = unknown>(url: string, options?: JsonRequestOptions) =>
      request<T, E>(url, { ...options, method: 'GET' }),

    post: <T, E = unknown>(url: string, data?: unknown, options?: JsonRequestOptions) =>
      request<T, E>(url, { ...options, method: 'POST', data }),

    put: <T, E = unknown>(url: string, data?: unknown, options?: JsonRequestOptions) =>
      request<T, E>(url, { ...options, method: 'PUT', data }),

    patch: <T, E = unknown>(url: string, data?: unknown, options?: JsonRequestOptions) =>
      request<T, E>(url, { ...options, method: 'PATCH', data }),

    delete: <T, E = unknown>(url: string, options?: JsonRequestOptions) =>
      request<T, E>(url, { ...options, method: 'DELETE' }),

    raw: (url: string, options?: Omit<RequestOptions, 'raw'>) =>
      request(url, { ...options, raw: true }),
  }
}

export type FetchClient = ReturnType<typeof createFetchClient>
