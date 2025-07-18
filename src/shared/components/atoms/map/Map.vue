<template>
  <div
    id="map"
    style="width: 100%; height: 350px;"
  />
</template>

<script>
const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY;

export default {
  name: 'KakaoMap',
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      script.onload = this.initMap;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(container, options);

        // 마커 위치 지정
        const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도에 표시
        marker.setMap(map);

        // 필요 시 마커 제거는 아래처럼 사용 가능
        // marker.setMap(null);
      });
    },
  },
};
</script>

<style scoped>
</style>
