<template>
  <div>
    <ButtonMain>hello button</ButtonMain>
    <ButtonRoundMain>hello button</ButtonRoundMain>
    <ButtonSmallMain>hello button</ButtonSmallMain>
    <ButtonSub>hello button</ButtonSub>
    <ButtonSmallSub>hello button</ButtonSmallSub>
    <ButtonMain disabled>
      hello button
    </ButtonMain>

    <Map />
  </div>
</template>
<script setup>
import ButtonMain from '@/shared/components/atoms/buttons/ButtonMain.vue'
import ButtonRoundMain from '@/shared/components/atoms/buttons/ButtonRoundMain.vue'
import ButtonSmallMain from '@/shared/components/atoms/buttons/ButtonSmallMain.vue'
import ButtonSmallSub from '@/shared/components/atoms/buttons/ButtonSmallSub.vue'
import ButtonSub from '@/shared/components/atoms/buttons/ButtonSub.vue'

import Map from '@/shared/components/atoms/map/Map.vue'
</script>
