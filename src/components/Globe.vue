<template>
  <div>
    <div id="globe" ref="globeEl"></div>
    <div id="controls">
      <button
        type="button"
        @click="onChangeMap('realistic')"
        :class="{ active: activeMap == 'realistic' }"
      >
        Realistic
      </button>
      <button
        type="button"
        @click="onChangeMap('globe')"
        :class="{ active: activeMap == 'globe' }"
      >
        Globe of Auberean
      </button>
      <button
        type="button"
        @click="onChangeMap('map')"
        :class="{ active: activeMap == 'map' }"
      >
        Map of Auberean
      </button>
      <button
        type="button"
        @click="onChangeMap('sketch')"
        :class="{ active: activeMap == 'sketch' }"
      >
        Early Sketch
      </button>
      <button type="button" @click="toggleRotation">
        <span v-if="isRotating">Stop</span><span v-else>Start</span> Rotation
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Globe from "globe.gl";
import * as THREE from "three";
import aubereanRegions from "@/assets/data/auberean-regions.geo";

const globeEl = ref();
const isRotating = ref(true);
const activeMap = ref("realistic");

function getFullUrl(relativeUrl) {
  return new URL(relativeUrl, import.meta.url).href;
}

const Auberean = ref();

const toggleRotation = () => {
  isRotating.value = !isRotating.value;
  Auberean.value.controls().autoRotate = isRotating.value;
};

const onChangeMap = (mapType) => {
  activeMap.value = mapType;
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
    case "sketch":
      Auberean.value.globeImageUrl(
        getFullUrl("/auberean-globe/aub-sketch.jpg")
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
    lat: 0,
    lng: 200,
    alt: 1.5,
    radius: 20,
    color: "orange",
    orbitSpeed: 0.2,
    texture: moon1Texture,
  };
  const moon2 = {
    lat: 0,
    lng: 180,
    alt: 1.02,
    radius: 17,
    color: "red",
    orbitSpeed: 1,
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

  (function moveSpheres() {
    gData.forEach((d) => (d.lng += d.orbitSpeed));
    Auberean.value.customLayerData(Auberean.value.customLayerData());
    requestAnimationFrame(moveSpheres);
  })();

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
  background: #000;
  padding: 14px;
  border: 1px solid #444;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}
#controls button {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  font-size: 16px;
  padding: 6px 10px;
}

#controls button:last-child {
  margin-bottom: 0;
}

#controls button.active {
    background: #797979;
    color: #fff;
}
</style>
