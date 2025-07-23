<template>
  <div
    id="map"
    class="w-full h-[450px]"
  />
</template>

<script setup>
import { onMounted } from 'vue'
import { mockData } from '@/entities/map/map.mock'

const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY
const emit = defineEmits(['selectLocation'])

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.onload = initMap
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`
    document.head.appendChild(script)
  }
})

function initMap() {
  window.kakao.maps.load(() => {
    const container = document.getElementById('map')

    const options = {
      center: new window.kakao.maps.LatLng(36.5, 127.9), // 중앙 좌표
      level: 9,
    }

    const map = new window.kakao.maps.Map(container, options)

    // ✅ 줌 컨트롤만 추가
    const zoomControl = new window.kakao.maps.ZoomControl()
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
    const imageSize = new window.kakao.maps.Size(24, 35)

    mockData.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.latitude, item.longitude)
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

      const marker = new window.kakao.maps.Marker({
        map,
        position,
        title: item.title,
        image: markerImage,
      })

      window.kakao.maps.event.addListener(marker, 'click', () => {
        emit('selectLocation', item.location)
      })
    })
  })
}
</script>
