<template>
  <div class="w-full flex flex-col gap-3">
    <TypographyHead3>여행 멤버 추가하기</TypographyHead3>

    <div class="h-[65vh] w-full flex flex-col gap-3">
      <TypographySubTitle2 class="ml-1 mt-7 mb-2">
        이메일 입력
      </TypographySubTitle2>
      <div class="flex w-full">
        <InputMedium
          v-model="memberEmail"
          placeholder="이메일을 입력해주세요"
        />
        <ButtonSmallMain @click="addMember">
          검색하기
        </ButtonSmallMain>
      </div>
      <div class="w-full flex gap-2 flex-wrap">
        <Tag
          v-for="(member, index) in memberList"
          :key="index"
          color="ghost"
        >
          {{ member.email }}
          <button @click="removeMember(member.id)">
            <i class="bi bi-x" />
          </button>
        </Tag>
      </div>
    </div>

    <div class="flex justify-between w-full">
      <ButtonMediumSub @click="onClickCancelButton">
        취소
      </ButtonMediumSub>
      <ButtonMediumMain @click="onClickInviteButton">
        추가하기
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  getValidMemberIdByEmail,
  inviteMembers,
} from '@/features/trip/CreateTrip/services/createTrip.service'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import InputMedium from '@/shared/components/atoms/input/InputMedium.vue'
import Tag from '@/shared/components/atoms/tag/Tag.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const memberEmail = ref<string>('')
const memberList = ref<{ email: string; id: number }[]>([])

const tripId = route.params.tripId as string

async function addMember() {
  if (memberEmail.value == '') {
    alert('이메일을 입력해주세요')
    return
  }

  try {
    const result = await getValidMemberIdByEmail(memberEmail.value, tripId)

    memberList.value.push({ email: memberEmail.value, id: result })
    memberEmail.value = ''
  } catch (e) {
    const err = e as Error & { status?: number; code?: string }

    if (err.code === 'C400') {
      alert('이미 여행에 포함된 멤버입니다.')
    } else if (err.code === 'E500') {
      alert('존재하지 않는 이메일입니다.')
    }
  }
}

function removeMember(id: number) {
  const newMemberList = memberList.value.filter((value) => value.id !== id, [])
  memberList.value = newMemberList
}

function onClickCancelButton() {
  if (window.confirm('취소하시겠습니끼?')) {
    router.replace({ name: 'trip_detail', params: { tripId: tripId } })
  }
}

async function onClickInviteButton() {
  try {
    if (window.confirm('여행에 멤버들을 초대 하시겠습니끼?')) {
      const membersId = memberList.value.map((value) => value.id)
      await inviteMembers(Number(tripId), membersId)
      alert('추가 요청을 보냈습니다.')
      router.push({ name: 'trip_detail', params: { tripId: tripId } })
    }
  } catch (e) {
    console.error(e)
    alert('추가 요청에 실패하였습니다.')
  }
}
</script>
