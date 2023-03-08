export const GLOBE_LAYERS = {
  REALISTIC: "realistic",
  GLOBE: "globe",
  MAP: "map",
  SKETCH: "sketch",
};

export const MOON_LAYERS = {
  NORMAL: "normal",
  DARK: "dark",
};

export const MOONS = {
  ALBAREL: {
    lat: 0,
    lng: 200,
    alt: 2.68,
    radius: 29.1,
    orbitSpeed: 0.2,
  },
  REZAREL: {
    lat: 0,
    lng: 180,
    alt: 1.836,
    radius: 21,
    orbitSpeed: 1,
  },
};

export const LABELS_DATA = {
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [36, -145],
      },
      properties: {
        name: "Dericost",
        labelSize: 26,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [46.5, -52.4],
      },
      properties: {
        name: "Dereth",
        labelSize: 16,
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
        labelSize: 26,
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
        labelSize: 18,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-30, -42],
      },
      properties: {
        name: "Yalaini<br />Archipelago",
        labelSize: 24,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-50, 160],
      },
      properties: {
        name: "Black Rains<br />Impact Site",
        labelSize: 16,
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
        labelSize: 21,
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [68, -34],
      },
      properties: {
        name: "Uninhabited<br /><small>(Strange Ruins)</small>",
        labelSize: 14,
      },
    },
  ],
};
