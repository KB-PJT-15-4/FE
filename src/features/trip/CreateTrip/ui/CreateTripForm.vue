<template>
  <div class="w-full flex flex-col gap-7">
    <TypographyHead1 class="text-left">
      여행 만들기
    </TypographyHead1>
    <div class="flex flex-col gap-4 h-[520px] overflow-scroll">
      <Input
        v-model="tripName"
        placeholder="여행 제목을 입력해주세요"
      />
      <div class="flex justify-between">
        <div>
          <TypographySubTitle2 class="text-moa-main-text">
            시작 날짜
          </TypographySubTitle2>
          <InputSmall
            v-model="startTime"
            type="date"
          />
        </div>
        <div>
          <TypographySubTitle2 class="text-moa-main-text">
            종료 날짜
          </TypographySubTitle2>
          <InputSmall
            v-model="endTime"
            type="date"
          />
        </div>
      </div>
      <Select
        v-model="location"
        placeholder="여행 지역을 선택해주세요"
      >
        <Option
          v-for="(location, index) in locationList"
          :key="index"
        >
          {{ location }}
        </Option>
      </Select>
      <TypographyHead3>친구 초대하기</TypographyHead3>
      <div class="flex justify-between">
        <InputMedium
          v-model="memberEmail"
          placeholder="이메일을 입력해주세요"
        />
        <ButtonSmallMain @click="addMember">
          초대하기
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
    <div class="flex justify-between">
      <ButtonMediumSub @click="router.push({ name: 'trip_list' })">
        <TypographyHead3>취소</TypographyHead3>
      </ButtonMediumSub>
      <ButtonMediumMain @click="onClickCreateButton">
        <TypographyHead3>생성하기</TypographyHead3>
      </ButtonMediumMain>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from '@/app/router'
import { locationList } from '@/entities/trip/trip.entity'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import InputMedium from '@/shared/components/atoms/input/InputMedium.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import Tag from '@/shared/components/atoms/tag/Tag.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { formatFullDateToKorean2 } from '@/shared/utils/format'
import { ref } from 'vue'
import { createTrip, getIdByEmail } from '../services/createTrip.service'

const today = new Date()

const tripName = ref<string>('')
const startTime = ref<string>(today.toISOString().split('T')[0])

const endTime = ref<string>(today.toISOString().split('T')[0])
const location = ref<string>(locationList[0])
const memberList = ref<{ email: string; id: number }[]>([])
const memberEmail = ref<string>('')

async function addMember() {
  try {
    const result = await getIdByEmail(localStorage.getItem('accessToken')!, memberEmail.value)

    memberList.value.push({ email: memberEmail.value, id: result })
    memberEmail.value = ''
  } catch (e) {
    alert('해당하는 유저가 없습니다.')
    console.error(e)
    memberEmail.value = ''
  }
}

function removeMember(id: number) {
  const newMemberList = memberList.value.filter((value) => value.id !== id, [])
  memberList.value = newMemberList
}

async function onClickCreateButton() {
  const membersId = memberList.value.map((value) => value.id)

  if (window.confirm('여행을 생성하시겠습니까?')) {
    try {
      const result = await createTrip(
        localStorage.getItem('accessToken')!,
        tripName.value,
        formatFullDateToKorean2(new Date(startTime.value)),
        formatFullDateToKorean2(new Date(endTime.value)),
        'BUSAN',
        membersId
      )
      alert('여행 생성이 완료되었습니다.\n여행 페이지로 이동합니다.')
      router.push({ name: 'trip_detail', params: { tripId: String(result) } })
    } catch (e) {
      console.error(e)
      alert('여행을 생성하지 못하였습니다.')
    }
  }
}
</script>
