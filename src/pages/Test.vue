<template>
  <div class="flex flex-col gap-3">
    <div>
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
    </div>
    <div>
      <TypographyHead2 class="mb-4">
        Button
      </TypographyHead2>

      <ButtonMain>hello button</ButtonMain>
      <ButtonRoundMain>hello button</ButtonRoundMain>
      <ButtonSub>hello button</ButtonSub>
      <ButtonSmallMain>hello button</ButtonSmallMain>
      <ButtonSmallSub>hello button</ButtonSmallSub>
      <ButtonMain disabled>
        hello disabled button
      </ButtonMain>
    </div>
    <div>
      <TypographyHead2 class="mb-4">
        Input
      </TypographyHead2>
      <InputDefault placeholder="hello input" />
    </div>
  </div>
</template>
<script setup>
import ButtonMain from '@/shared/components/atoms/button/ButtonMain.vue'
import ButtonRoundMain from '@/shared/components/atoms/button/ButtonRoundMain.vue'
import ButtonSmallMain from '@/shared/components/atoms/button/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/button/ButtonSmallSub.vue'
import ButtonSub from '@/shared/components/atoms/button/ButtonSub.vue'
import InputDefault from '@/shared/components/atoms/input/InputDefault.vue'
import TypographyCaption from '@/shared/components/atoms/typography/TypographyCaption.vue'
import TypographyHead1 from '@/shared/components/atoms/typography/TypographyHead1.vue'
import TypographyHead2 from '@/shared/components/atoms/typography/TypographyHead2.vue'
import TypographyHead3 from '@/shared/components/atoms/typography/TypographyHead3.vue'
import TypographyP1 from '@/shared/components/atoms/typography/TypographyP1.vue'
import TypographyP2 from '@/shared/components/atoms/typography/TypographyP2.vue'
import TypographySubTitle1 from '@/shared/components/atoms/typography/TypographySubTitle1.vue'
import TypographySubTitle2 from '@/shared/components/atoms/typography/TypographySubTitle2.vue'
</script>
