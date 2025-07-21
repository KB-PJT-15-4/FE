<template>
  <div class="flex justify-between w-full max-w-[250px]">
    <button
      v-for="option in options"
      :key="option"
      :class="[
        'w-[120px] h-[40px] rounded-full flex items-center justify-center transition',
        modelValue === option
          ? 'bg-moa-main text-white font-bold'
          : 'bg-moa-gray text-moa-main-text font-semibold',
      ]"
      @click="selectOption(option)"
    >
      <TypographyP1>{{ option }}</TypographyP1>
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
