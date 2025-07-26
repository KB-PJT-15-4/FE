<template>
  <div class="w-full">
    <SelectSmall v-model="selectedOption">
      <Option
        v-for="item in options"
        :key="item"
        :value="item"
      >
        {{ item }}
      </Option>
    </SelectSmall>
    <Card
      v-for="(item, index) in userNotificationMockData"
      :key="index"
      class="my-4"
    >
      <div class="flex gap-3">
        <i
          v-if="item.type === 'settle'"
          class="bi bi-wallet2"
        />
        <i
          v-if="item.type === 'trip'"
          class="bi bi-airplane"
        />
        <TypographySubTitle2> {{ item.message }}</TypographySubTitle2>
      </div>
      <div
        v-if="item.type === 'settle'"
        class="flex justify-end"
      >
        <ButtonExtraSmallMain><TypographyP2>이동</TypographyP2></ButtonExtraSmallMain>
      </div>

      <div
        v-if="item.type === 'trip'"
        class="flex justify-end gap-2"
      >
        <ButtonExtraSmallMain><TypographyP2>수락</TypographyP2></ButtonExtraSmallMain>
        <ButtonExtraSmallSub><TypographyP2>거절</TypographyP2></ButtonExtraSmallSub>
      </div>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { userNotificationMockData } from '@/entities/user/user.mock'
import ButtonExtraSmallMain from '@/shared/components/atoms/button/ButtonExtraSmallMain.vue'
import ButtonExtraSmallSub from '@/shared/components/atoms/button/ButtonExtraSmallSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import { ref } from 'vue'

const options = ['전체', '정산요청', '여행초대']
const selectedOption = ref(options[0])
</script>
