<template>
  <div class="px-1 mt-3">
    <TypographyHead3>나의 정산내역</TypographyHead3>
    <Card
      v-for="(settlement, index) in settleList"
      :key="index"
      class="flex justify-between items-center my-3"
    >
      <div>
        <div class="flex gap-2">
          <TypographyCaption>
            {{ settlement.received ? '받은 요청' : '보낸 요청' }}
          </TypographyCaption>
          <TypographyCaption>{{ formatDateTime(settlement.expenseDate) }}</TypographyCaption>
        </div>

        <TypographyHead3>{{ formatNumber(settlement.shareAmount) }}원</TypographyHead3>
      </div>
      <ButtonSmallMain
        v-if="settlement.status === SettlementStatus.WAITING"
        @click="
          router.push({
            name: 'settle',
            params: { tripId: tripId, settleId: settlement.expenseId },
          })
        "
      >
        정산하기
      </ButtonSmallMain>
      <ButtonSmallSub
        v-else
        @click="
          router.push({
            name: 'settle_status',
            params: { tripId: tripId, settleId: settlement.expenseId },
          })
        "
      >
        {{ settlement.status }}
      </ButtonSmallSub>
    </Card>
    <Pagination
      :total-page="totalPage"
      :active-page="currentPage"
    />
  </div>
</template>
<script setup lang="ts">
import { SettlementStatus, type UserSettlement } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/button/ButtonSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import Pagination from '@/shared/components/molecules/tab/Pagination.vue'
import { formatDateTime, formatNumber } from '@/shared/utils/format'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSettleList } from '../services/settlement.service'

const router = useRouter()
const route = useRoute()
const tripId = route.params.tripId as string
const settleList = ref<UserSettlement[]>([])
const totalPage = ref<number>(0)
const currentPage = computed(() => Number(route.query.page ?? 1))

async function getSettleListFunction(page: number) {
  try {
    const result = await getSettleList(localStorage.getItem('accessToken')!, tripId, page, 3)
    settleList.value = result.content
    totalPage.value = result.totalPages
  } catch (e) {
    console.error(e)
    alert('정산 내역을 불러오는데 실패하였습니다.')
  }
}

watch(currentPage, async (newPage) => {
  getSettleListFunction(newPage - 1)
})

onMounted(() => {
  getSettleListFunction(0)
})
</script>
