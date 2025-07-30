<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const colorClasses = {
  main: 'border-moa-main bg-moa-main text-white',
  yellow: 'border-yellow-200 bg-yellow-200 text-white',
  pink: 'border-pink-300 bg-pink-300 text-white',
  ghost: 'border-moa-main bg-white text-moa-main',
}

const props = defineProps<{
  color: keyof typeof colorClasses
}>()

const computedClass = computed(() => {
  const base =
    'box-border border flex items-center justify-center gap-2 outline-none px-2 py-0.5 rounded-[5px]'
  const color = colorClasses[props.color || 'main']

  return `${base} ${color}`
})
</script>
