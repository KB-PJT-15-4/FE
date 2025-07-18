<template>
  <BaseButton
    variant="main"
    shape="round"
    size="default"
    v-bind="$attrs"
  >
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>
