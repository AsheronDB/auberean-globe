<template>
  <div id="globe" ref="globeEl"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Globe from "globe.gl";
import * as THREE from "three";
import aubereanRegions from "@/assets/data/auberean-regions.geo";

const globeEl = ref();

function getFullUrl(relativeUrl) {
  return new URL(relativeUrl, import.meta.url).href;
}

onMounted(() => {
  const Auberean = Globe({animateIn: false });

  console.log(getFullUrl("/auberean-globe/auberean.jpg"));
  console.log(aubereanRegions);
  Auberean(globeEl.value).globeImageUrl(getFullUrl("/auberean-globe/auberean.png"));

  Auberean.backgroundImageUrl(
    "//unpkg.com/three-globe/example/img/night-sky.png"
  );

//   Auberean.bumpImageUrl(
//     getFullUrl("/auberean.png")
//   );

  Auberean.atmosphereAltitude(0.18);


    Auberean.controls().autoRotate = true;
    Auberean.controls().autoRotateSpeed = 1.5;

  const globeMaterial = Auberean.globeMaterial();
  globeMaterial.bumpScale = 20;
  new THREE.TextureLoader().load(
    getFullUrl("/auberean-globe/auberean-water.png"),
    (texture) => {
      globeMaterial.specularMap = texture;
      globeMaterial.specular = new THREE.Color("grey");
      globeMaterial.shininess = 15;
    }
  );

  setTimeout(() => {
    // wait for scene to be populated (asynchronously)
    const directionalLight = Auberean.scene().children.find(
      (obj3d) => obj3d.type === "DirectionalLight"
    );
    directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
  });
  //Auberean.polygonsData(aubereanRegions.features);
});
</script>

<style scoped>
#globe {
  min-height: 1vh;
}
</style>
