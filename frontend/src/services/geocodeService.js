// geocodeService.js
// Simple reverse geocoding using Nominatim (OpenStreetMap)

export async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return data.display_name || `${lat}, ${lng}`;
  } catch (err) {
    return `${lat}, ${lng}`;
  }
}
