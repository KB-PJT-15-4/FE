<template>
  <div
    id="map"
    style="width: 390px; height: 350px;"
  />
</template>

<script>
const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY; // 카카오맵 API 키

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
          center: new window.kakao.maps.LatLng(36.9705, 127.9522), // 충주시
          level: 9,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 지도 타입 컨트롤 생성 및 추가 (일반/스카이뷰 전환용)
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        // 줌 컨트롤 생성 및 추가 (확대/축소 버튼)
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 마커 정보
        const positions = [
          {
            title: '부산 해운대구',
            latlng: new window.kakao.maps.LatLng(35.1631, 129.1607),
          },
          {
            title: '서울 동작구',
            latlng: new window.kakao.maps.LatLng(37.4979, 126.9828),
          },
          {
            title: '제주 근린공원',
            latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
          },
        ];

        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        const imageSize = new window.kakao.maps.Size(24, 35);

        // 마커 생성
        positions.forEach(position => {
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
          new window.kakao.maps.Marker({
            map,
            position: position.latlng,
            title: position.title,
            image: markerImage,
          });
        });
      });
    },
  },
};
</script>

<style scoped>
</style>