<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-center"
  >
    <Card class="bg-white h-[550px]">
      <div class="w-full flex justify-end">
        <button @click="emit('close')">
          <i class="bi bi-x text-[30px]" />
        </button>
      </div>
      <TypographyHead1 class="text-center">
        예약권
      </TypographyHead1>
      <div class="w-full flex justify-center">
        <img
          :src="'data:image/png;base64,' + qrString"
          class="h-[182px] mb-4"
        >
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import { onMounted, ref } from 'vue'
import { getReservationQR } from '../services/myReservationList.service'

const props = defineProps<{
  itemId: number
}>()
const emit = defineEmits(['close'])
const qrString = ref<string>('')
async function getReservationQRFunction() {
  try {
    qrString.value = await getReservationQR(localStorage.getItem('accessToken')!, props.itemId)
  } catch (e) {
    console.error(e)
    alert('예약 QR을 불러오는데 실패하였습니다.')
  }
}

onMounted(() => {
  getReservationQRFunction()
})
</script>
