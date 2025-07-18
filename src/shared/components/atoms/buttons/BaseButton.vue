<template>
  <button
    :class="computedClass"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <component :is="typographyComponent">
      <slot />
    </component>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'main' | 'sub'
type Size = 'default' | 'small'
type Shape = 'rounded' | 'round'

const props = defineProps<{
  variant?: Variant
  size?: Size
  shape?: Shape
  disabled?: boolean
}>()

const variantClasses = {
  main: 'bg-moa-main text-white',
  sub: 'bg-moa-sub text-otl-gray',
}

const sizeClasses = {
  default: 'w-[300px] h-[50px]',
  small: 'w-[115px] h-[40px]',
}

const shapeClasses = {
  rounded: 'rounded-md',
  round: 'rounded-full',
}

const computedClass = computed(() => {
  const base =
    'box-border border border-gray-200 flex items-center justify-center gap-2  outline-none'
  const variant = variantClasses[props.variant || 'main']
  const size = sizeClasses[props.size || 'default']
  const shape = shapeClasses[props.shape || 'rounded']
  const disabledClass = props.disabled ? 'bg-otl-disabled text-white' : ''

  return `${base} ${variant} ${size} ${shape} ${disabledClass}`
})

const typographyComponent = computed(() => {
  if (props.size === 'small') return 'p2'
  else return 'subtitle1'
})
</script>
