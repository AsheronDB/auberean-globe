<template>
  <div>
    <div id="header">
      <!-- <div class="tree">

            <ul> -->
      <h1>Auberean</h1>
      <p>
        <span class="albarel">Alb'arel, </span
        ><span class="rezarel">Rez'arel</span>
      </p>
    </div>
    <div id="globe" ref="globeEl"></div>
    <div id="controls">
      <div class="group">
        <ul>
          <li
            v-for="layer in globeLayerData"
            :key="layer.handle"
            :class="{ active: activeGlobeLayerHandle == layer.handle }"
          >
            <a
              href="#"
              @click.prevent="activeGlobeLayerHandle = layer.handle"
              >{{ layer.label }}</a
            >
          </li>
        </ul>
      </div>
      <div class="group">
        <ul>
          <li
            v-for="layer in moonLayerData"
            :key="layer.handle"
            :class="{ active: activeMoonLayerHandle == layer.handle }"
          >
            <a href="#" @click.prevent="activeMoonLayerHandle = layer.handle">{{
              layer.label
            }}</a>
          </li>
        </ul>
      </div>
      <div class="group">
        <ul>
          <li>
            <a href="#" @click.prevent="toggleLabels"
              ><span v-if="showLabels">Hide</span
              ><span v-else>Show</span> Labels</a
            >
          </li>
          <li>
            <a href="#" @click.prevent="toggleRotation"
              ><span v-if="isRotating">Pause</span
              ><span v-else>Start</span> Camera Spin</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="source" v-if="activeGlobeLayer">
      <p>Images: <span v-html="activeGlobeLayer.source"></span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, reactive } from "vue";
import Globe from "globe.gl";
import * as THREE from "three";
import {
  MOONS,
  GLOBE_LAYERS,
  MOON_LAYERS,
  LABELS_DATA,
} from "@/common/constants.js";

const globeEl = ref();
const Auberean = ref();
const isRotating = ref(true);
const activeGlobeLayerHandle = ref(GLOBE_LAYERS.REALISTIC);
const activeMoonLayerHandle = ref(MOON_LAYERS.NORMAL);
const showLabels = ref(true);

function getFullUrl(relativeUrl) {
  return new URL(relativeUrl, import.meta.url).href;
}

const globeLayerData = ref([
  {
    label: "Realistic",
    handle: GLOBE_LAYERS.REALISTIC,
    filePath: "auberean-realistic.jpg?v=" + (+new Date()).toString(36),
    atmoAlt: 0.18,
    source: `© Copyright WB Games, <a href="https://web.archive.org/web/20170224045357/http://www.imaginaryatlas.com/2013/03/29/dereth-in-context-the-world-of-asherons-call/" target="_blank">Robert Wild/Imaginary Atlas</a>`,
  },
  {
    label: "Globe of Auberean",
    handle: GLOBE_LAYERS.GLOBE,
    filePath: "auberean-globe.jpg?v=" + (+new Date()).toString(36),
    atmoAlt: 0,
    source: "© Copyright WB Games",
  },
  {
    label: "Map of Auberean",
    handle: GLOBE_LAYERS.MAP,
    filePath: "auberean-map.jpg?v=" + (+new Date()).toString(36),
    atmoAlt: 0,
    source: "© Copyright WB Games",
  },
  {
    label: "Early Sketch",
    handle: GLOBE_LAYERS.SKETCH,
    filePath: "auberean-sketch.jpg?v=" + (+new Date()).toString(36),
    atmoAlt: 0,
    source: `© Copyright WB Games, <a href="https://asheron.fandom.com/wiki/File:Stormwaltz_Q%26A_image_3.jpeg" target="_blank">Chris L'Etoile (Stormwaltz)</a>`,
  },
]);

const activeGlobeLayer = computed(() =>
  globeLayerData.value.find(
    (layer) => layer.handle === activeGlobeLayerHandle.value
  )
);

const moonLayerData = ref([
  {
    label: "Normal Moons",
    handle: MOON_LAYERS.NORMAL,
    data: [
      { ...Object.assign(MOONS.ALBAREL, { filePath: "albarel.jpg" }) },
      { ...Object.assign(MOONS.REZAREL, { filePath: "rezarel.jpg" }) },
    ],
  },
  {
    label: "Dark Moons",
    handle: MOON_LAYERS.DARK,
    data: [
      { ...Object.assign(MOONS.ALBAREL, { filePath: "albarel-dark.jpg" }) },
      { ...Object.assign(MOONS.REZAREL, { filePath: "rezarel-dark.jpg" }) },
    ],
  },
]);

const activeMoonLayer = computed(() =>
  moonLayerData.value.find(
    (layer) => layer.handle === activeMoonLayerHandle.value
  )
);

const setGlobeLayer = () => {
  Auberean.value.globeImageUrl(
    getFullUrl(`/auberean-globe/img/${activeGlobeLayer.value.filePath}`)
  );
  Auberean.value.atmosphereAltitude(activeGlobeLayer.value.atmoAlt);
};

watch(activeGlobeLayerHandle, (newVal) => {
  setGlobeLayer();
});

watch(activeMoonLayerHandle, (newVal) => {
  drawMoons();
});

const toggleRotation = () => {
  isRotating.value = !isRotating.value;
  Auberean.value.controls().autoRotate = isRotating.value;
};

const drawLabels = () => {
  Auberean.value
    .htmlElementsData(LABELS_DATA.features)
    .htmlElement((d) => {
      const el = document.createElement("a");
      el.classList.add("label");
      el.style.fontSize = d.properties.labelSize + "px";
      el.innerHTML = d.properties.name;
      if (d.properties.fontStyle) el.style.fontStyle = d.properties.fontStyle;
      el.style["pointer-events"] = "auto";
      el.style.cursor = "pointer";
      el.onclick = () => window.open(d.properties.url, "_blank");
      return el;
    })
    .htmlLat((d) => d.geometry.coordinates[0])
    .htmlLng((d) => d.geometry.coordinates[1])
    .htmlTransitionDuration(0);
};

const drawMoons = () => {
  console.log("drawing moons");

  console.log(MOONS.ALBAREL);
  console.log(activeMoonLayer.value);

  console.log(activeMoonLayer.value.data);
  Auberean.value.customLayerData(null);

  Auberean.value
    .customLayerData(activeMoonLayer.value.data)
    .customThreeObject(
      (d) =>
        new THREE.Mesh(
          new THREE.SphereGeometry(d.radius),
          new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
              getFullUrl(`/auberean-globe/img/${d.filePath}`)
            ),
          })
        )
    )
    .customThreeObjectUpdate((obj, d) => {
      Object.assign(
        obj.position,
        Auberean.value.getCoords(d.lat, d.lng, d.alt)
      );

      obj.lookAt(0, 0, 0);
      //    obj.rotateZ(2);
    });
};

watch(showLabels, (newVal) => {
  if (newVal) {
    drawLabels();
  } else {
    console.log("hide labels");
    Auberean.value.htmlElementsData([]);
  }
});

const toggleLabels = () => {
  showLabels.value = !showLabels.value;
};

onMounted(() => {
  // Init globe
  Auberean.value = Globe({ animateIn: false });
  Auberean.value(globeEl.value);

  Auberean.value.backgroundImageUrl(
    getFullUrl(`/auberean-globe/img/night-sky.png`)
  );

  //   Auberean.bumpImageUrl(
  //     getFullUrl("/auberean.png")
  //   );

  setGlobeLayer();
  drawLabels();
  drawMoons();

  Auberean.value.controls().autoRotate = isRotating.value;
  Auberean.value.controls().autoRotateSpeed = 1.5;

  (function moveSpheres() {
    activeMoonLayer.value.data.forEach((d) => {
      d.lng += d.orbitSpeed;
      // clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
    });

    Auberean.value.customLayerData(Auberean.value.customLayerData());
    requestAnimationFrame(moveSpheres);
  })();
});
</script>

<style scoped>
#globe {
  min-height: 1vh;
}
#header {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 5000;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  line-height: 1;
  font-family: "Apple Garamond", "Baskerville", "Times New Roman", "Droid Serif",
    "Times", "Source Serif Pro", serif;
}

#header h1 {
  color: #fff;
  margin: 0;
  padding: 0;
  font-size: 42px;

  margin: 0 0 4px 0;
  padding: 0;
}

#header p {
  color: #fff;
  opacity: 0.75;
  font-size: 21px;
  font-style: italic;
  margin: 0;
  padding: 0;
}

.albarel {
  color: #e2cc81;
  /* font-size: 42px;
    vertical-align: middle; */
}

.rezarel {
  color: #ff9966;
}

:deep(.label) {
  /* text-shadow: -1 0 1px rgba(0, 0, 0, 1), 0 0 20px rgba(0, 0, 0, 1); */

  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000, 0 0 15px #000;

  font-family: "Apple Garamond", "Baskerville", "Times New Roman", "Droid Serif",
    "Times", "Source Serif Pro", serif !important;
  color: #fff !important;
  text-align: center;
  display: block;
  transition: color 0.05s linear;
}

:deep(.label:hover) {
    color: #e5b700 !important;
}

.source {
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #fff;
  z-index: 5000;
  opacity: 0.35;
  font-size: 13px;
  font-weight: bold;
  text-shadow: 0 0 15px #000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.source p {
  margin: 0;
  padding: 0;
}

:deep(.source a) {
  color: #fff;
  text-decoration: none;
}

#controls {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#controls {
  position: absolute;
  bottom: 15px;
  left: 15px;
  z-index: 5000;
  width: 200px;

  /* border: 1px solid #444;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.6);
  border-radius: 10px; */
}
#controls button {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 10px;
}

#controls button:last-child {
  margin-bottom: 0;
}

#controls button.active {
  background: #797979;
  color: #fff;
}

#controls .group {
  margin-bottom: 12px;
}
#controls .group:first-child {
  border-bottom: 1px solid #444;
}

#controls .group:last-child {
  margin: 0;
}

.group ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.group ul li {
  border: 1px solid #bea86a;
  border-bottom-width: 0;
}

.group ul li a {
  padding: 10px;
  text-align: center;
  color: #fff;
  display: block;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  background: #540c06;
  text-decoration: none;
  transition: background-color 0.1s linear;
}

.group ul li a:hover {
  background-color: #73150e;
}

.group ul li.active a {
  background: #021097;
}

.group ul li:last-child {
  border-bottom-width: 1px;
}

.group h3 {
  color: #fff;
  margin: 0;
  padding: 0 0 6px 0;

  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.05rem;
}
</style>
