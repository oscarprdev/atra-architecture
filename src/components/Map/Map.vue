<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const myLatLng = {
    lat: 39.67827224731445,
    lng: -0.2763120234012604,
  };

  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 16,
    center: myLatLng,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: false,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "My location",
  });

  const infowindow = new google.maps.InfoWindow({
    content: `<div style="display: flex; flex-direction: column; align-items: center; font-size: 0.8rem">
               <h1>ATRArquitectura</h1>
               <a style="text-align: center; color: blue; text-decoration: underline;" target="_blank" href="https://www.google.es/maps/place/C.+dels+Dolors,+37,+46500+Sagunt,+Val%C3%A8ncia/@39.6782503,-0.2788762,17z/data=!3m1!4b1!4m6!3m5!1s0xd601516b4710047:0x96451dfa8bae958d!8m2!3d39.6782462!4d-0.2763013!16s%2Fg%2F11c4mrv63c?entry=ttu">
               Troba\'m</a>
            </div>`,
    ariaLabel: "ATRA",
  });

  const marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "ATRArquitectura",
  });

  infowindow.open({
    anchor: marker,
    map,
  });
});
</script>

<template>
  <div id="gmp-map" class="map"></div>
</template>

<style scoped>

.map {
  width: 100%;
  height: 100%;
}
</style>
