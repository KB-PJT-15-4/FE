<script setup lang="ts">
import type { Component } from 'vue'
import { computed, useAttrs } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  class?: string
  name?: string
  icon?: Component | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const attrs = useAttrs()

const isDateType = computed(() => attrs.type === 'date')

const inputClass = computed(() => {
  return [
    'w-full max-w-[355px] flex flex-col rounded-md border-[1px] p-3 text-[14px] font-medium focus:border-moa-main focus:border-2 focus:outline-none',
    props.icon && 'pl-10',
    props.class,

    isDateType.value
      ? 'bg-white text-black appearance-none h-[50px]'
      : 'bg-white text-black border-gray-200 h-[50px]',
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
      :name="name"
      v-bind="attrs"
      :value="modelValue"
      :class="inputClass"
      @input="onInput"
    >
  </div>
</template>
