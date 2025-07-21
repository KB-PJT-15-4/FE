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
  class?: string
  name?: string
  icon?: Component | string
}>()

const attrs = useAttrs()

const inputClass = computed(() => {
  return [
    'w-[355px] h-[50px] flex flex-col rounded-md border-2 border-gray-200 bg-white p-3 text-[16px] font-semibold text-black focus:border-moa-main focus:border-2 focus:outline-none',
    props.icon && 'pl-10',
    props.class,
  ]
})

const inputAttrs = computed(() => ({
  name: props.name,
  ...attrs,
}))
</script>
