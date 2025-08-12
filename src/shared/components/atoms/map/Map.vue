<template>
  <div
    id="map"
    class="w-full h-[450px] rounded-md"
  />
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import BUSAN_IMG from '@/assets/BUSAN.jpeg'
import GANGNEUNG_IMG from '@/assets/GANGNEUNG.jpeg'
import JEJU_IMG from '@/assets/JEJU.jpeg'
import SEOUL_IMG from '@/assets/SEOUL.jpeg'

const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY
const emit = defineEmits(['selectLocation'])
const locations = ref([])

// 지역별 아이콘
const MARKER_ICON_MAP = {
  BUSAN: BUSAN_IMG,
  GANGNEUNG: GANGNEUNG_IMG,
  JEJU: JEJU_IMG,
  SEOUL: SEOUL_IMG,
}

// 기본 아이콘(예외)
const DEFAULT_ICON =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'

function normalizeKey(name = '') {
  return String(name).trim().toUpperCase()
}

function getIconSrcByLocationName(locationName) {
  const key = normalizeKey(locationName)
  return MARKER_ICON_MAP[key] ?? DEFAULT_ICON
}

function createCircleMarker(src, size = 36) {
  const wrapper = document.createElement('div')
  wrapper.style.width = `${size}px`
  wrapper.style.height = `${size}px`
  wrapper.style.borderRadius = '50%'
  wrapper.style.overflow = 'hidden'
  wrapper.style.border = '2px solid white'
  wrapper.style.boxShadow = '0 0 4px rgba(0,0,0,0.3)'
  wrapper.style.backgroundColor = '#fff'
  wrapper.style.cursor = 'pointer'

  const img = document.createElement('img')
  img.src = src
  img.alt = 'marker'
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.objectFit = 'cover'

  wrapper.appendChild(img)
  return wrapper
}

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

    const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/trip-locations`, {
      headers: { Authorization: `Bearer ${token}` },
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

    const infoOverlay = new window.kakao.maps.CustomOverlay({ yAnchor: 1 })

    locations.value.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.latitude, item.longitude)
      const iconSrc = getIconSrcByLocationName(item.locationName)
      const markerContent = createCircleMarker(iconSrc, 70) // 이미지 크기 조정

      const markerOverlay = new window.kakao.maps.CustomOverlay({
        position,
        content: markerContent,
        yAnchor: 1, 
      })
      markerOverlay.setMap(map)

      markerContent.addEventListener('click', () => {
        emit('selectLocation', item.locationName)

        const balloon = document.createElement('div')
        balloon.innerHTML = `
          <div style="position:relative; background:white; border:1px solid #ccc; padding:10px; font-size:12px; border-radius:10px;">
            <div style="font-weight:bold; margin-bottom:4px;">${item.locationName}</div>
            <div style="margin-bottom:3px;">${item.address ?? ''}</div>
            <button id="closeOverlay" style="position:absolute; top:4px; right:6px; background:none; border:none; font-size:16px; cursor:pointer;">×</button>
          </div>
        `
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
</script>


