<template>
  <div
    id="map"
    style="width: 390px; height: 350px;"
  />
</template>

<script>
const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY; // env 파일에서 카카오맵 키 값 가져오기

export default {
  name: 'KakaoMap',
  data() {
    return {
      map: null,
      overlays: [],
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      script.onload = this.initMap;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`; // 카카오맵 api 키값 적용
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(36.9705, 127.9522), // 지도 중심 좌표 (현재 충주시)
          level: 9, // 초기 지도 확대값
        };

        const map = new window.kakao.maps.Map(container, options);
        this.map = map;

        // 지도 확대 축소 버튼 기능
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 개별 마커, 오버레이
        // title, desc, 페이지 링크 백엔드에서 데이터 값 받아서 사용할 수 있도록 변경예정
        const positions = [
          {
            title: '부산 해운대구',
            latlng: new window.kakao.maps.LatLng(35.1631, 129.1607),
            content: `
              <div class="overlay-wrap">
                <div class="info">
                  <div class="title">즐거운 부산여행
                    <span class="close" data-close-overlay>&times;</span>
                  </div>
                  <div class="body">
                    <div class="desc">
                      <div>2025.03.24</div>
                      <a href="https://www.haeundae.go.kr/" target="_blank" class="button-link">여행 기록페이지로 이동</a>
                    </div>
                  </div>
                </div>
              </div>
            `,
          },
          {
            title: '서울 동작구',
            latlng: new window.kakao.maps.LatLng(37.4979, 126.9828),
            content: `
              <div class="overlay-wrap">
                <div class="info">
                  <div class="title">즐거운 서울여행
                    <span class="close" data-close-overlay>&times;</span>
                  </div>
                  <div class="body">
                    <div class="desc">
                      <div>2025.03.24</div>
                      <a href="https://www.dongjak.go.kr/" target="_blank" class="button-link">여행 기록페이지로 이동</a>
                    </div>
                  </div>
                </div>
              </div>
            `,
          },
          {
            title: '제주 근린공원',
            latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
            content: `
              <div class="overlay-wrap">
                <div class="info">
                  <div class="title">즐거운 제주여행
                    <span class="close" data-close-overlay>&times;</span>
                  </div>
                  <div class="body">
                    <div class="desc">
                      <div>2025.03.24</div>
                      <a href="https://www.jeju.go.kr/" target="_blank" class="button-link">여행 기록페이지로 이동</a>
                    </div>
                  </div>
                </div>
              </div>
            `,
          },
        ];
        
        // 마커 이미지, 이미지 크기
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        const imageSize = new window.kakao.maps.Size(24, 35);

        positions.forEach(({ title, latlng, content }) => {
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
          const marker = new window.kakao.maps.Marker({
            map,
            position: latlng,
            title,
            image: markerImage,
          });

          // 오버레이
          const overlay = new window.kakao.maps.CustomOverlay({
            content,
            position: latlng,
            yAnchor: 1,
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            this.overlays.forEach(o => o.setMap(null));
            overlay.setMap(map);
            this.overlays = [overlay];

            this.$nextTick(() => {
              const closeBtn = document.querySelector('[data-close-overlay]');
              if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                  overlay.setMap(null);
                });
              }
            });
          });
        });
      });
    },
  },
};
</script>

<style>
.overlay-wrap {
  position: relative;
  bottom: 40px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  padding: 10px;
  width: 250px;
}

.title {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close {
  cursor: pointer;
  font-size: 18px;
}

.body .desc {
  font-size: 13px;
}

.button-link {
  display: inline-block;
  margin-top: 8px;
  padding: 8px 16px;
  background-color: #87BFFF;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-link:hover {
  background-color: #005ecb;
}
</style>