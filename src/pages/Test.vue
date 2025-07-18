<template>
  <div>
    <ButtonMain>hello button</ButtonMain>
    <ButtonRoundMain>hello button</ButtonRoundMain>
    <ButtonSub>hello button</ButtonSub>
    <ButtonSmallMain>hello button</ButtonSmallMain>
    <ButtonSmallSub>hello button</ButtonSmallSub>
    <ButtonMain disabled>
      hello disabled button
    </ButtonMain>
  </div>
</template>
<script setup>
import ButtonMain from '@/shared/components/atoms/buttons/ButtonMain.vue'
import ButtonRoundMain from '@/shared/components/atoms/buttons/ButtonRoundMain.vue'
import ButtonSmallMain from '@/shared/components/atoms/buttons/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/buttons/ButtonSmallSub.vue'
import ButtonSub from '@/shared/components/atoms/buttons/ButtonSub.vue'
</script>
