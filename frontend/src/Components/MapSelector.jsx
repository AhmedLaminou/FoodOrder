import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correct way to import marker icons in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const MapSelector = ({ onLocationSelect, height = "300px" }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (position) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect]);

  // Try to get user's current location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div style={{ width: "100%", height }}>
      <MapContainer
        center={position || [48.8566, 2.3522]} // Paris default
        zoom={13}
        style={{ width: "100%", height: "100%", borderRadius: "16px", boxShadow: "0 2px 16px rgba(44,62,80,0.10)" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
        {position ? (
          <span style={{ color: "#2c3e50", fontWeight: 500 }}>
            Selected: {position[0].toFixed(5)}, {position[1].toFixed(5)}
          </span>
        ) : (
          <span style={{ color: "#888" }}>Click on the map to set your delivery location</span>
        )}
      </div>
    </div>
  );
};

export default MapSelector;
