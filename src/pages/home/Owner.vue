<template>
  <div>
    <video
      ref="videoRef"
      autoplay
      muted
      playsinline
      class="w-full"
    />
    <p v-if="qrResult">
      📦 QR 결과: {{ qrResult }}
    </p>
    <button @click="startScan">
      📷 QR 스캔 시작
    </button>
    <button @click="stopScan">
      🛑 중지
    </button>
  </div>
</template>

<script setup lang="ts">
import { BrowserCodeReader, BrowserQRCodeReader } from '@zxing/browser'
import { onBeforeUnmount, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const qrResult = ref('')
let codeReader: BrowserCodeReader = new BrowserQRCodeReader()
const startScan = async () => {
  qrResult.value = ''
  codeReader = new BrowserQRCodeReader()

  try {
    const result = await codeReader.decodeFromVideoDevice(undefined, videoRef.value!, (result) => {
      if (result) {
        qrResult.value = result.getText()
        stopScan()
      }
    })
  } catch (error) {
    console.error('QR 인식 에러:', error)
  }
}

const stopScan = () => {
  const reader = codeReader as unknown as { reset: () => void }
  reader.reset()
}

onBeforeUnmount(() => {
  stopScan()
})
</script>
