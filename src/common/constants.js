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
        coordinates: [-34, -3],
      },
      properties: {
        name: "Atermore",
        labelSize: 18,
        url: "https://asheron.fandom.com/wiki/Atermore",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [10, -60],
      },
      properties: {
        name: "Jhenecaer",
        fontStyle: "italic",
        labelSize: 21,
        url: "https://asheron.fandom.com/wiki/AC:DM_CD_Lore/Dericost_Texts/The_Lay_of_Leikotha",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [36, -145],
      },
      properties: {
        name: "Dericost",
        labelSize: 26,
        url: "https://asheron.fandom.com/wiki/Dericost",
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
        url: "https://asheron.fandom.com/wiki/Dereth",
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
        url: "https://asheron.fandom.com/wiki/Haebrous",
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
        url: "https://asheron.fandom.com/wiki/Ruschk_Lore",
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
        url: "https://asheron.fandom.com/wiki/Yalaini_Lore",
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
        url: "https://asheron.fandom.com/wiki/Black_Rains",
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
        url: "https://asheron.fandom.com/wiki/Falatacot",
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
        url: "https://asheron.fandom.com/wiki/Prehistoric_Auberean",
      },
    },
  ],
};
