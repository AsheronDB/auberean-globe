<template>
  <div>
    <div id="header">
      <h1>Auberean</h1>
      <p>
        <span class="albarel">Alb'arel,</span>
        <span class="rezarel">Rez'arel</span>
      </p>
    </div>
    <div id="globe" ref="globeEl"></div>
    <div id="controls">
      <div class="group">
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
      </div>
      <div class="group">
        <button type="button" @click="toggleLabels">
          <span v-if="showLabels">Hide</span><span v-else>Show</span> Labels
        </button>
        <button type="button" @click="toggleRotation">
          <span v-if="isRotating">Pause</span><span v-else>Start</span> Camera
          Spin
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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

const labelsData = {
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [40, -145],
      },
      properties: {
        name: "Dericost",
        labelSize: 4,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [45, -55.5],
      },
      properties: {
        name: "Dereth",
        labelSize: 2,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12, 45],
      },
      properties: {
        name: "Haebrous",
        labelSize: 4,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [72, 22],
      },
      properties: {
        name: "Ruschk",
        labelSize: 3,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-26.5, -42],
      },
      properties: {
        name: "Yalaini\nArchipelago",
        labelSize: 3,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-50, 160],
      },
      properties: {
        name: "Black Rains\nImpact Site",
        labelSize: 2,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [16, 126],
      },
      properties: {
        name: "Falatacot (?)",
        labelSize: 2.5,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [68, -34],
      },
      properties: {
        name: "Uninhabited\n(Strange Ruins)",
        labelSize: 1.8,
      },
    },
  ],
};

const toggleRotation = () => {
  isRotating.value = !isRotating.value;
  Auberean.value.controls().autoRotate = isRotating.value;
};

const showLabels = ref(true);

const drawLabels = () => {
  Auberean.value
    .labelsData(labelsData.features)
    .labelLat((d) => d.geometry.coordinates[0])
    .labelLng((d) => d.geometry.coordinates[1])
    .labelSize((d) => d.properties.labelSize)
    .labelText((d) => d.properties.name)
    .labelIncludeDot(false)
    .labelsTransitionDuration(0)
    .labelColor(() => "rgba(255, 255, 255, 1)")
    .labelResolution(2);
};

watch(
  showLabels,
  (newVal) => {
    if (newVal) {
      drawLabels();
    } else {
      console.log("hide labels");
      Auberean.value.labelsData(null);
    }
  }
);

const toggleLabels = () => {
  showLabels.value = !showLabels.value;
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

  console.log(Auberean.value);
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
      // console.log(obj);
      Object.assign(
        obj.position,
        Auberean.value.getCoords(d.lat, d.lng, d.alt)
      );

      obj.rotateY(d.orbitSpeed / 55);

      //obj.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));
    });

  Auberean.value.atmosphereAltitude(0.18);

  Auberean.value.controls().autoRotate = true;
  Auberean.value.controls().autoRotateSpeed = 1.5;

    drawLabels();
  (function moveSpheres() {
    gData.forEach((d) => {
      d.lng += d.orbitSpeed;
      // clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
    });

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

  border: 1px solid #444;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
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
  padding: 12px;
}
#controls .group:first-child {
  border-bottom: 1px solid #444;
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
</style>
