<template>
  <div
    :class="[
      'w-[40px] h-[40px] flex justify-center items-center border rounded-sm cursor-pointer',
      selected ? 'bg-moa-main text-white' : 'bg-white text-black',
      disabled ? 'cursor-not-allowed bg-moa-disabled text-moa-sub-text' : '',
    ]"
    @click="handleClick"
  >
    <TypographyP1>{{ label }}</TypographyP1>
  </div>
</template>

<script setup lang="ts">
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'

const emit = defineEmits(['click'])

const props = defineProps<{
  label: number
  seatKey: string
  selected?: boolean
  disabled?: boolean
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.seatKey)
  }
}
</script>
