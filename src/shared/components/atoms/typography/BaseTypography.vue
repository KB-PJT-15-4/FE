<template>
  <p :class="[typoClass, className]">
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type TypoType = 'Head1' | 'Head2' | 'Head3' | 'SubTitle1' | 'SubTitle2' | 'P1' | 'P2' | 'Caption'

const props = defineProps<{
  type: TypoType
  className?: string
}>()

const typoTypeMap: Record<TypoType, string> = {
  Head1: 'text-[24px] font-bold',
  Head2: 'text-[20px] font-bold',
  Head3: 'text-[18px] font-bold',
  SubTitle1: 'text-[16px] font-semibold',
  SubTitle2: 'text-[15px] font-semibold',
  P1: 'text-[16px] text-medium',
  P2: 'text-[14px] text-medium',
  Caption: 'text-[12px] text-medium',
}

const typoClass = computed(() => typoTypeMap[props.type])
</script>
