<template>
  <nav class="fixed bottom-0 left-0 w-full bg-white border-t z-50">
    <div class="flex justify-around items-center h-[60px] max-w-[390px] w-full mx-auto">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="[
          'flex flex-col items-center justify-center',
          modelValue === tab.value && 'text-moa-main',
        ]"
        @click="selectTab(tab.value)"
      >
        <i
          :class="[
            'bi text-2xl transition',
            tab.icon,
            modelValue === tab.value ? 'text-moa-primary' : 'text-black',
          ]"
        />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import URL from '@/shared/constants/URL'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const tabs = [
  { icon: 'bi-airplane', value: 'trip', location: URL.PAGE.TRIP.TRIP_LIST },
  { icon: 'bi-house', value: 'home', location: URL.PAGE.HOME },
  { icon: 'bi-pin-map', value: 'record', location: URL.PAGE.MAP },
]

const selectTab = (tab: string) => {
  const selected = tabs.find((t) => t.value === tab)
  if (!selected) return

  emit('update:modelValue', tab)
  router.push(selected.location)
}
</script>
