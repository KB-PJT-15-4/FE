<template>
  <BaseButton
    variant="sub"
    shape="rounded"
    size="default"
    v-bind="$attrs"
  >
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>
