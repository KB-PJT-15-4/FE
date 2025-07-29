<template>
  <div
    :key="seatKey"
    class="w-[20px] h-[20px] flex justify-center items-center border p-4 rounded-sm cursor-pointer"
    @click="console.log(seatKey)"
  >
    <TypographyP1>{{ label }}</TypographyP1>
  </div>
</template>
<script setup lang="ts">
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'

defineProps<{
  label: number
  seatKey: string
  selected?: boolean
  disabled?: boolean
}>()
</script>
