<template>
  <div class="flex justify-between w-full max-w-[355px]">
    <button
      v-for="n in personnelList"
      :key="n"
      :class="[
        'w-10 h-10 rounded-full border border-moa-gray text-gray-700 flex items-center justify-center transition',
        modelValue === n ? 'bg-moa-gray font-bold' : 'bg-white',
      ]"
      @click="selectN(n)"
    >
      <TypographyCaption>{{ n }}</TypographyCaption>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TypographyCaption from '../../atoms/typography/TypographyCaption.vue'

const props = defineProps<{
  personnel: number
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const selectN = (n: number) => {
  emit('update:modelValue', n)
}

const personnelList = computed(() => {
  const result: number[] = []
  const start = 1
  const end = props.personnel
  let curr = start

  while (curr <= end) {
    result.push(curr)
    curr += 1
  }

  return result
})
</script>
