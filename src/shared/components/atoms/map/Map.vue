<template>
  <div
    id="map"
    class="w-full h-[450px]"
  />
</template>

<script>
import { mockData } from '@/entities/map/map.mock' // mock 데이터 가져오기
import { formatFullDateToKorean } from '@/shared/utils/format' // 포맷팅

const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY

export default {
  name: 'KakaoMap',
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap()
    } else {
      const script = document.createElement('script')
      script.onload = this.initMap
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`
      document.head.appendChild(script)
    }
  },
  methods: {
    initMap() {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map')

        const options = {
          center: new window.kakao.maps.LatLng(36.9705, 127.9522),
          level: 9,
        }

        const map = new window.kakao.maps.Map(container, options)

        const mapTypeControl = new window.kakao.maps.MapTypeControl()
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT)

        const zoomControl = new window.kakao.maps.ZoomControl()
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
        const imageSize = new window.kakao.maps.Size(24, 35)

        mockData.forEach((item) => {
          const position = new window.kakao.maps.LatLng(item.latitude, item.longitude)
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

          const formattedDate = formatFullDateToKorean(new Date(item.date))

          const marker = new window.kakao.maps.Marker({
            map,
            position,
            title: item.name,
            image: markerImage,
          })

          const overlayContent = `
            <div class="bg-white border border-gray-300 rounded-lg shadow-md text-center p-3 min-w-[160px]">
              <div class="font-semibold text-gray-800 mb-1">${item.name}</div>
              <div class="text-sm text-gray-600">${formattedDate}</div>
            </div>
          `

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content: overlayContent,
            position,
            yAnchor: 1.4,
          })

          window.kakao.maps.event.addListener(marker, 'click', () => {
            customOverlay.setMap(map)
          })
        })

        map.relayout()
      })
    },
  },
}
</script>

<style scoped></style>
