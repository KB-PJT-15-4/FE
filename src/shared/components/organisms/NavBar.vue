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
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const tabs = [
  { icon: 'bi-airplane', value: 'trip' },
  { icon: 'bi-house', value: 'home' },
  { icon: 'bi-pin-map', value: 'record' },
]

const selectTab = (tab: string) => {
  emit('update:modelValue', tab)
}
</script>
