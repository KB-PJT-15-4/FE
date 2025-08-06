<template>
  <div>
    <p>{{ result }}</p>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const result = route.query.result as string
</script>
