<template>
  <div class="flex justify-between gap-2">
    <button
      v-for="option in options"
      :key="option"
      :class="[
        'w-[70px] h-[35px] px-10 py-4 rounded-full flex items-center justify-center transition text-moa-main-text font-semibold',
        modelValue === option && 'bg-moa-gray',
      ]"
      @click="selectOption(option)"
    >
      <TypographyP1 class="whitespace-nowrap">
        {{ option }}
      </TypographyP1>
    </button>
  </div>
</template>
<script setup lang="ts">
import TypographyP1 from '../../atoms/typography/TypographyP1.vue'

defineProps<{
  options: string[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectOption = (option: string) => {
  emit('update:modelValue', option)
}
</script>
