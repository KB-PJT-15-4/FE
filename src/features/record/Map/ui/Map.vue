<template>
  <div
    id="map"
    class="w-full h-[450px] rounded-md"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  createCircleMarker,
  createInfoBalloon,
  ensureKakaoLoaded,
  getIconSrcByLocationName,
  getTripLocations,
} from '../services/map.service'

const emit = defineEmits(['selectLocation'])
const locations = ref([])

function initMap() {
  window.kakao.maps.load(() => {
    const container = document.getElementById('map')
    if (!container) return

    const options = {
      center: new window.kakao.maps.LatLng(36.35041, 127.38455),
      level: 15,
    }

    const map = new window.kakao.maps.Map(container, options)

    const zoomControl = new window.kakao.maps.ZoomControl()
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

    const infoOverlay = new window.kakao.maps.CustomOverlay({ yAnchor: 1 })

    locations.value.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.latitude, item.longitude)
      const iconSrc = getIconSrcByLocationName(item.locationName)
      const markerContent = createCircleMarker(iconSrc, 70)

      const markerOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content: markerContent,
        yAnchor: 1,
      })
      markerOverlay.setMap(map)

      markerContent.addEventListener('click', () => {
        emit('selectLocation', item.locationName)

        const balloon = createInfoBalloon(item)
        infoOverlay.setContent(balloon)
        infoOverlay.setPosition(position)
        infoOverlay.setMap(map)

        const closeButton = balloon.querySelector('#closeOverlay')
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            infoOverlay.setMap(null)
          })
        }
      })
    })
  })
}

onMounted(async () => {
  try {
    locations.value = await getTripLocations()

    await ensureKakaoLoaded(import.meta.env.VITE_KAKAOMAP_KEY)
    initMap()
  } catch (e) {
    console.error(e)
  }
})
</script>
