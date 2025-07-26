<template>
  <div :class="computedClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Color = 'main' | 'pink' | 'yellow'

const props = defineProps<{
  color: Color
}>()

const colorClasses = {
  main: 'border-moa-main bg-moa-main',
  yellow: 'border-yellow-200 bg-yellow-200',
  pink: 'border-pink-300 bg-pink-300',
}
const computedClass = computed(() => {
  const base =
    'box-border border flex items-center justify-center gap-2 outline-none px-2 py-0.5 rounded-[5px] text-white'
  const color = colorClasses[props.color || 'main']

  return `${base} ${color}`
})
</script>
