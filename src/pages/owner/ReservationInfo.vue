<template>
  <div>
    <p>{{ data }}</p>
    <p>{{ reservationInfo }}</p>
    <div v-if="reservationInfo">
      <TypographyHead1>{{ reservationInfo.name }}</TypographyHead1>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getDecodeReservationQR } from '@/features/user/Owner/services/owner.service'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = route.query.result as string
const reservationInfo = ref()

async function getDecodeQRFunction() {
  reservationInfo.value = await getDecodeReservationQR(localStorage.getItem('accessToken')!, data)
}

onMounted(() => {
  getDecodeQRFunction()
})
</script>
