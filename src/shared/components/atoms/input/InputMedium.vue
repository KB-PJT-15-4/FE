<script setup lang="ts">
import type { Component } from 'vue'
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  modelValue?: string
  class?: string
  name?: string
  icon?: Component | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const attrs = useAttrs()

const inputClass = computed(() => {
  return [
    'max-w-[230px] w-full h-[50px] rounded-md border-2 border-gray-200 bg-white p-3 text-[16px] font-semibold text-black focus:border-moa-main focus:border-2 focus:outline-none',
    props.icon && 'pl-10',
    props.class,
  ]
})

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="relative w-full">
    <span
      v-if="icon"
      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    >
      <component :is="icon" />
    </span>
    <input
      v-bind="attrs"
      :value="modelValue"
      :class="inputClass"
      @input="onInput"
    >
  </div>
</template>
