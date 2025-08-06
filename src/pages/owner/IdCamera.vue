<template>
  <div>
    <video
      ref="videoRef"
      autoplay
      muted
      playsinline
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { BrowserQRCodeReader, type IScannerControls } from '@zxing/browser'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const videoRef = ref<HTMLVideoElement | null>(null)
const qrResult = ref('')
let codeReader: BrowserQRCodeReader
let controls: IScannerControls | null = null

const startScan = async () => {
  qrResult.value = ''
  codeReader = new BrowserQRCodeReader()

  try {
    controls = await codeReader.decodeFromVideoDevice(undefined, videoRef.value!, (result) => {
      if (result) {
        qrResult.value = result.getText()
        stopScan()
        router.push({ name: 'id_info', query: { result: result.getText() } })
      }
    })
  } catch (error) {
    console.error('QR 인식 에러:', error)
  }
}

const stopScan = () => {
  if (controls) {
    controls.stop()
    controls = null
  }
}

onMounted(() => {
  startScan()
})

onBeforeUnmount(() => {
  stopScan()
})
</script>
