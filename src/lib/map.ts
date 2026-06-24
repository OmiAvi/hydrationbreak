export type GeoPoint = {
  lat: number;
  lon: number;
};

export type ProjectedPoint = {
  x: number;
  y: number;
};

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 520;

export const GUESS_STORAGE_PREFIX = "hydration-break-guess";

export function latLonToPoint({ lat, lon }: GeoPoint): ProjectedPoint {
  return {
    x: ((lon + 180) / 360) * MAP_WIDTH,
    y: ((90 - lat) / 180) * MAP_HEIGHT,
  };
}

export function pointToLatLon({ x, y }: ProjectedPoint): GeoPoint {
  return {
    lat: 90 - (y / MAP_HEIGHT) * 180,
    lon: (x / MAP_WIDTH) * 360 - 180,
  };
}

export function percentToPoint(percentX: number, percentY: number): ProjectedPoint {
  return {
    x: (percentX / 100) * MAP_WIDTH,
    y: (percentY / 100) * MAP_HEIGHT,
  };
}

export function pointToPercent({ x, y }: ProjectedPoint) {
  return {
    x: (x / MAP_WIDTH) * 100,
    y: (y / MAP_HEIGHT) * 100,
  };
}

export function haversineDistanceKm(a: GeoPoint, b: GeoPoint) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lon - a.lon);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));
}

export function scoreGuess(distanceKm: number) {
  return Math.max(0, Math.round(5000 / (1 + distanceKm / 160)));
}

export function getResultLabel(distanceKm: number) {
  if (distanceKm < 250) {
    return { title: "MAP MASTER!", emoji: "🏆" };
  }

  if (distanceKm < 1000) {
    return { title: "WORLD WANDERER!", emoji: "😎" };
  }

  if (distanceKm < 3000) {
    return { title: "SOLID SCOUT!", emoji: "🙂" };
  }

  if (distanceKm < 7000) {
    return { title: "CLOSE-ISH CALL!", emoji: "😅" };
  }

  return { title: "GEOGRAPHY ROOKIE!", emoji: "😅" };
}
