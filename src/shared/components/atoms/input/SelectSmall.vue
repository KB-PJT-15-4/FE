<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  modelValue?: string
  placeholder?: string
  class?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const computedClass = computed(() => {
  return [
    'bg-white box-border h-[50px] w-[170px] appearance-none rounded-md border text-sm focus:border-moa-main focus:border-2 focus:outline-none',
    props.class,
  ]
})

const onChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="relative w-[158px]">
    <select
      :class="computedClass"
      :value="modelValue"
      v-bind="$attrs"
      class="font-semibold text-[16px] pl-3"
      @change="onChange"
    >
      <option
        v-if="placeholder"
        disabled
        hidden
        value=""
      >
        {{ placeholder }}
      </option>
      <slot />
    </select>
    <div class="pointer-events-none right-1 absolute top-1/2 -translate-y-1/2">
      <i class="bi bi-chevron-down text-gray-500 text-lg" />
    </div>
  </div>
</template>
