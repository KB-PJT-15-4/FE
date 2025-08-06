<template>
  <div>
    <p>{{ data }}</p>
    <p>{{ userInfo }}</p>
    <div v-if="userInfo">
      <TypographyHead1>{{ userInfo.name }}</TypographyHead1>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserIDCard } from '@/entities/user/user.entity'
import { getDecodeIdQR } from '@/features/user/Owner/services/owner.service'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const data = route.query.result as string
const userInfo = ref<UserIDCard>()

async function getDecodeQRFunction() {
  userInfo.value = await getDecodeIdQR(data)
}
onMounted(() => {
  getDecodeQRFunction()
})
</script>
