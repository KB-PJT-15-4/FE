<template>
  <div class="">
    <TypographyHead2 class="mb-4">
      Typography
    </TypographyHead2>

    <TypographyHead1>TypographyHead1</TypographyHead1>
    <TypographyHead2>TypographyHead2</TypographyHead2>
    <TypographyHead3>TypographyHead3</TypographyHead3>
    <TypographySubTitle1>TypographySubTitle1</TypographySubTitle1>
    <TypographySubTitle2>TypographySubTitle2</TypographySubTitle2>
    <TypographyP1>TypographyP1</TypographyP1>
    <TypographyP2>TypographyP2</TypographyP2>
    <TypographyCaption>TypographyCaption</TypographyCaption>
    <TypographyCaption class="text-moa-error">
      TypographyError
    </TypographyCaption>
    <TypographyCaption class="text-moa-success">
      TypographySuccess
    </TypographyCaption>

    <TypographyHead2 class="mb-4">
      Button
    </TypographyHead2>

    <ButtonMain>hello button</ButtonMain>
    <ButtonRoundMain>hello button</ButtonRoundMain>
    <ButtonSub>hello button</ButtonSub>

    <ButtonSmallMain>hello button</ButtonSmallMain>
    <ButtonSmallSub>hello button</ButtonSmallSub>

    <div class="flex w-full items-center justify-between">
      <ButtonMediumSub>취소</ButtonMediumSub>
      <ButtonMediumMain>확인</ButtonMediumMain>
    </div>
    <ButtonMain disabled>
      hello disabled button
    </ButtonMain>
    <Map />
    
    <TypographyHead2 class="mb-4">
      Input
    </TypographyHead2>
    <Input placeholder="hello input" />

    <div class="flex w-full justify-between">
      <InputMedium placeholder="hello input" />
      <ButtonSmallMain>button</ButtonSmallMain>
    </div>
    <div class="flex w-full justify-between">
      <InputSmall
        placeholder="hello input"
        type="date"
      />
      <InputSmall
        placeholder="hello input"
        type="date"
      />
    </div>
    <Select
      v-model="selected"
      placeholder="선택하세요"
    >
      <Option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </Select>
    <SelectSmall
      v-model="selected"
      placeholder="선택하세요"
    >
      <Option
        v-for="item in options"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </Option>
    </SelectSmall>
    <DateTab
      v-model="selectedDate"
      start-date="2025-07-27"
      end-date="2025-08-03"
    />
    <ToggleTab
      v-model="selectedOption"
      :options="toggleOptions"
    />
    <SegmentedTab
      v-model="selectedSegmentOption"
      :options="segmentedOptions"
    />

    <TypographyHead2>Tag</TypographyHead2>
    <Tag color="pink">
      Tag1
    </Tag>
    <Tag color="main">
      Tag1
    </Tag>
    <Tag color="yellow">
      Tag1
    </Tag>
    <Card>
      <div>
        <TypographyHead1>hello world</TypographyHead1>
      </div>
    </Card>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import ButtonMain from '@/shared/components/atoms/buttons/ButtonMain.vue'
import ButtonRoundMain from '@/shared/components/atoms/buttons/ButtonRoundMain.vue'
import ButtonSmallMain from '@/shared/components/atoms/buttons/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/buttons/ButtonSmallSub.vue'
import ButtonSub from '@/shared/components/atoms/buttons/ButtonSub.vue'
import Map from '@/shared/components/atoms/map/Map.vue'
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import ButtonMediumMain from '@/shared/components/atoms/button/ButtonMediumMain.vue'
import ButtonMediumSub from '@/shared/components/atoms/button/ButtonMediumSub.vue'
import ButtonRoundMain from '@/shared/components/atoms/button/ButtonRoundMain.vue'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/button/ButtonSmallSub.vue'
import ButtonSub from '@/shared/components/atoms/button/ButtonSub.vue'
import Card from '@/shared/components/atoms/card/Card.vue'
import Input from '@/shared/components/atoms/input/Input.vue'
import InputMedium from '@/shared/components/atoms/input/InputMedium.vue'
import InputSmall from '@/shared/components/atoms/input/InputSmall.vue'
import Option from '@/shared/components/atoms/input/Option.vue'
import Select from '@/shared/components/atoms/input/Select.vue'
import SelectSmall from '@/shared/components/atoms/input/SelectSmall.vue'
import Tag from '@/shared/components/atoms/tag/Tag.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
import DateTab from '@/shared/components/molecules/tab/DateTab.vue'
import SegmentedTab from '@/shared/components/molecules/tab/SegmentedTab.vue'
import ToggleTab from '@/shared/components/molecules/tab/ToggleTab.vue'
const toggleOptions = ['option1', 'option2']
const segmentedOptions = ['option1', 'option2', 'option3', 'option4']
const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'grape', label: '포도' },
]

const selected = ref('')
const selectedDate = ref('2025-07-30')
const selectedOption = ref(toggleOptions[0])
const selectedSegmentOption = ref(segmentedOptions[0])
</script>
