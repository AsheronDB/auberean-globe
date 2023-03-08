<template>
  <div>
    <div id="globe" ref="globeEl"></div>
    <div id="controls">
      <button type="button" @click="onChangeMap('realistic')">Realistic</button>
      <button type="button" @click="onChangeMap('globe')">
        Globe of Auberean
      </button>
      <button type="button" @click="onChangeMap('map')">Map of Auberean</button>
    </div>
  </div>
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

const Auberean = ref();

const onChangeMap = (mapType) => {
  switch (mapType) {
    case "realistic":
      Auberean.value.globeImageUrl(
        getFullUrl("/auberean-globe/auberean-upscale.jpg")
      );
      break;
    case "globe":
      Auberean.value.globeImageUrl(
        getFullUrl("/auberean-globe/aub-globe-test.jpg")
      );
      break;
    case "map":
      Auberean.value.globeImageUrl(
        getFullUrl("/auberean-globe/auberean-map.jpg")
      );
      break;
  }
};

onMounted(() => {
  Auberean.value = Globe({ animateIn: false });

  const moon1Texture = new THREE.TextureLoader().load(
    getFullUrl("/auberean-globe/albarel-rect.jpg")
  );
  const moon2Texture = new THREE.TextureLoader().load(
    getFullUrl("/auberean-globe/rezarel-rect.jpg")
  );

  const moon1 = {
    lat: 25,
    lng: 200,
    alt: 0.8,
    radius: 16,
    color: "orange",
    texture: moon1Texture,
  };
  const moon2 = {
    lat: 20,
    lng: 180,
    alt: 0.6,
    radius: 15,
    color: "red",
    texture: moon2Texture,
  };
  const N = 2;

  const gData = [moon1, moon2];

  console.log(aubereanRegions);
  Auberean.value(globeEl.value).globeImageUrl(
    getFullUrl("/auberean-globe/auberean-upscale.jpg")
  );

  Auberean.value.backgroundImageUrl(
    "//unpkg.com/three-globe/example/img/night-sky.png"
  );

  //   Auberean.bumpImageUrl(
  //     getFullUrl("/auberean.png")
  //   );

  Auberean.value
    .customLayerData(gData)
    .customThreeObject(
      (d) =>
        new THREE.Mesh(
          new THREE.SphereGeometry(d.radius),
          new THREE.MeshBasicMaterial({ map: d.texture, overdraw: 0.5 })
          //   new THREE.MeshLambertMaterial({ color: d.color }),
        )
    )
    .customThreeObjectUpdate((obj, d) => {
      Object.assign(
        obj.position,
        Auberean.value.getCoords(d.lat, d.lng, d.alt)
      );
    });

  Auberean.value.atmosphereAltitude(0.18);

  Auberean.value.controls().autoRotate = true;
  Auberean.value.controls().autoRotateSpeed = 1.5;

  //   const globeMaterial = Auberean.globeMaterial();
  //   globeMaterial.bumpScale = 20;
  //   new THREE.TextureLoader().load(
  //     getFullUrl("/auberean-globe/auberean-water.png"),
  //     (texture) => {
  //       globeMaterial.specularMap = texture;
  //       globeMaterial.specular = new THREE.Color("grey");
  //       globeMaterial.shininess = 15;
  //     }
  //   );

  //   setTimeout(() => {
  //     // wait for scene to be populated (asynchronously)
  //     const directionalLight = Auberean.scene().children.find(
  //       (obj3d) => obj3d.type === "DirectionalLight"
  //     );
  //     directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
  //   });
  //Auberean.polygonsData(aubereanRegions.features);
});
</script>

<style scoped>
#globe {
  min-height: 1vh;
}

#controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 5000;
  width: 200px;
}
#controls button {
    display: block;
    width: 100%;
    margin-bottom: 8px;
    font-size: 18px;
    padding: 6px 12px;
}
</style>
