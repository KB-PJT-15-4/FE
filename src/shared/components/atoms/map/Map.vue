<template>
  <div
    id="map"
    class="w-full h-[450px] rounded-md"
  />
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY
const emit = defineEmits(['selectLocation'])
const locations = ref([])

onMounted(async () => {
  await fetchLocations()

  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.onload = initMap
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`
    document.head.appendChild(script)
  }
})

async function fetchLocations() {
  try {
    const token = localStorage.getItem('accessToken')
    if (!token) throw new Error('No access token found')

    const res = await axios.get('${import.meta.env.VITE_APP_API_URL}/api/trip-locations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })

    locations.value = res.data.data
  } catch (error) {
    console.error('지도 위치 데이터를 불러오는 중 오류 발생:', error)
  }
}

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

    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
    const imageSize = new window.kakao.maps.Size(24, 35)

    const overlay = new window.kakao.maps.CustomOverlay({ yAnchor: 1 })

    locations.value.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.latitude, item.longitude)
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)

      const marker = new window.kakao.maps.Marker({
        map,
        position,
        title: item.locationName,
        image: markerImage,
      })

      window.kakao.maps.event.addListener(marker, 'click', () => {
        emit('selectLocation', item.locationName)

        const content = document.createElement('div')
        content.innerHTML = `
          <div style="position:relative; background:white; border:1px solid #ccc; padding:10px; font-size:12px; border-radius:10px;">
            <div style="font-weight:bold; margin-bottom:4px;">${item.locationName}</div>
            <div style="margin-bottom:3px;">${item.address}</div>
            <button id="closeOverlay" style="position:absolute; top:4px; right:6px; background:none; border:none; font-size:16px; cursor:pointer;">×</button>
          </div>
        `

        overlay.setContent(content)
        overlay.setPosition(position)
        overlay.setMap(map)

        // 닫기 버튼 이벤트
        const closeButton = content.querySelector('#closeOverlay')
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            overlay.setMap(null)
          })
        }
      })
    })
  })
}
</script>
