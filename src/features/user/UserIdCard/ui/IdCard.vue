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
      <div class="flex flex-col justify-center items-center gap-3 pb-9">
        <Tag
          v-if="!qrShow"
          color="ghost"
          @click="qrShow = true"
        >
          QR보기
        </Tag>
        <Tag
          v-if="qrShow"
          color="ghost"
          @click="qrShow = false"
        >
          사진보기
        </Tag>
        <TypographyHead1>주민등록증</TypographyHead1>

        <img
          v-if="!qrShow"
          :src="idCard.imageUrl"
          class="w-[130px] mb-4"
        >
        <!-- <img v-if="qrShow" :src="'data:image/png;base64,' + idCard.qrUrl" class="h-[182px] mb-4" /> -->
        <div class="text-center">
          <TypographyHead2>{{ idCard.name }}</TypographyHead2>
          <TypographySubTitle2>{{ formatIdCardNumber(idCard.idCardNumber) }}</TypographySubTitle2>
          <TypographySubTitle2>{{ idCard.address }}</TypographySubTitle2>
        </div>

        <TypographyHead3>{{ formatFullDateToKorean(new Date(idCard.issuedDate)) }}</TypographyHead3>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { type UserIDCard } from '@/entities/user/user.entity'
import Card from '@/shared/components/atoms/card/Card.vue'
import Tag from '@/shared/components/atoms/tag/Tag.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean, formatIdCardNumber } from '@/shared/utils/format'
import { defineEmits, ref } from 'vue'

defineProps<{
  idCard: UserIDCard
}>()

const emit = defineEmits(['close'])
const qrShow = ref(false)
</script>
