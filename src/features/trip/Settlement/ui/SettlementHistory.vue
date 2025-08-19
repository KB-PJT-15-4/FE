<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[360px] px-1 flex flex-col">
      <div
        v-if="settleList.length == 0"
        class="w-full flex justify-center mt-4 mb-3"
      >
        <img
          :src="logo"
          class="h-[180px]"
        >
      </div>

      <TypographySubTitle1
        v-if="settleList.length == 0"
        class="w-full text-center text-moa-sub-text"
      >
        정산 내역이 존재하지 않습니다.
      </TypographySubTitle1>

      <Card
        v-for="(settlement, index) in settleList"
        :key="index"
        class="flex justify-between items-center my-1"
      >
        <div>
          <div class="flex gap-2">
            <TypographyCaption>
              {{ settlement.received ? '받은 요청' : '보낸 요청' }}
            </TypographyCaption>
            <TypographyCaption>
              {{ formatDateTime(settlement.expenseDate) }}
            </TypographyCaption>
          </div>
          <TypographySubTitle1>{{ settlement.expenseName || 'name' }}</TypographySubTitle1>
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
        class="mt-4"
        :total-page="totalPage"
        :active-page="currentPage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from '@/assets/moa_character_1.png'
import { SettlementStatus, type UserSettlement } from '@/entities/trip/trip.entity'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/button/ButtonSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
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
    const result = await getSettleList(tripId, page, 3)
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
