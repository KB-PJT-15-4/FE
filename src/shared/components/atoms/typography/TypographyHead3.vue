<template>
  <BaseTypography
    type="Head3"
    :class="className"
  >
    <slot />
  </BaseTypography>
</template>

<script setup lang="ts">
import BaseTypography from './BaseTypography.vue'

defineProps<{
  className?: string
}>()
</script>
