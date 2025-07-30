<template>
  <BaseButton
    :variant="variant"
    shape="semi"
    size="square"
    v-bind="$attrs"
  >
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
defineProps<{
  variant: 'main' | 'sub' | 'ghost'
}>()
</script>
