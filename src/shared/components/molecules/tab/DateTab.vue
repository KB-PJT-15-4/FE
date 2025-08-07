<template>
  <div class="flex justify-start overflow-x-scroll w-full gap-3">
    <button
      v-for="date in dateList"
      :key="date"
      :class="[
        'min-w-10 w-10 h-10 rounded-full border border-moa-gray text-gray-700 flex items-center justify-center transition',
        modelValue === date ? 'bg-moa-gray font-bold' : 'bg-white',
      ]"
      @click="selectDate(date)"
    >
      <TypographyCaption>{{ new Date(date).getDate() }}</TypographyCaption>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import TypographyCaption from '../../atoms/typography/TypographyCaption.vue'

const props = defineProps<{
  startDate: string // 'YYYY-MM-DD'
  endDate: string // 'YYYY-MM-DD'
  modelValue: string // selectedDate로 쓰임
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectDate = (date: string) => {
  emit('update:modelValue', date)
}

const dateList = computed(() => {
  const result: string[] = []
  const start = new Date(props.startDate)
  const end = new Date(props.endDate)
  let curr = new Date(start)

  while (curr <= end) {
    result.push(curr.toISOString().split('T')[0])
    curr.setDate(curr.getDate() + 1)
  }

  return result
})
</script>
