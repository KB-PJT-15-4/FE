<template>
  <div class="relative">
    <span
      v-if="icon"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
      <component :is="icon" />
    </span>
    <input
      v-bind="inputAttrs"
      :class="inputClass"
    >
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  className?: string
  name?: string
  icon?: Component | string
}>()

// 외부에서 전달된 기타 속성들 (placeholder, type 등)
const attrs = useAttrs()

const inputClass = computed(() => {
  return [
    'focus:ring-otl-main w-[300px] h-[50px] rounded-md border border-gray-200 bg-white p-3 text-[16px] font-semibold text-black placeholder:text-otl-gray focus:border-otl-main focus:border-2 focus:outline-none',
    props.icon && 'pl-10',
    props.className,
  ]
})

const inputAttrs = computed(() => ({
  name: props.name,
  ...attrs,
}))
</script>
