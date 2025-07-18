<template>
  <div
    id="map"
    style="width: 100%; height: 350px;"
  />
</template>

<script>
export default {
  name: 'KakaoMap',
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      script.onload = this.initMap;
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=9ca00b05c25bfc609e5c9ad6de9602d9&autoload=false';
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
        new window.kakao.maps.Map(container, options);
      });
    },
  },
};
</script>

<style scoped>

</style>
