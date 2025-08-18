declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, unknown>, // props
    Record<string, unknown>, // rawBindings
    unknown // data
  >
  export default component
}

declare global {
  interface Window {
    kakao?: {
      maps: unknown
    }
  }
}
