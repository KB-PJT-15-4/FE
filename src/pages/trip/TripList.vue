<template>
  <div class="w-full flex flex-col">
    <CreateTripButton />
    <MyTripList />
  </div>
</template>
<script setup>
import CreateTripButton from '@/features/trip/MyTrip/ui/CreateTripButton.vue'
import MyTripList from '@/features/trip/MyTrip/ui/MyTripList.vue'
</script>
