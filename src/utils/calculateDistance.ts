// export default function calculateDistanceInMeters(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): number {
//   const R = 6371; // Earth's radius in km

//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distanceInKm = R * c; // Distance in kilometers
//   const distanceInMeters = distanceInKm * 1000; // Convert to meters

//   console.log("dLat:", dLat);
//   console.log("dLon:", dLon);
//   console.log("a:", a);
//   console.log("c:", c);

//   return distanceInMeters;
// }

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function areLocationsNear(
  lat1: number,
  lon1: number,
  accuracy1: number,
  lat2: number,
  lon2: number,
  accuracy2: number,
  threshold: number = 10
): boolean {
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  const allowedDistance = accuracy1 + accuracy2 + threshold;
  return distance <= allowedDistance;
}
