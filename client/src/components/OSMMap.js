import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Hàm lấy tọa độ từ địa chỉ bằng Nominatim (OpenStreetMap)
const getLatLngFromAddress = async (address) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await res.json();
  if (data && data[0]) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
};

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 15);
  }, [center]);
  return null;
}

export default function OSMMap({ address }) {
  const [center, setCenter] = useState({ lat: 10.762622, lng: 106.660172 }); // Mặc định HCM

  useEffect(() => {
    if (address) {
      getLatLngFromAddress(address).then((latlng) => {
        if (latlng) setCenter(latlng);
      });
    }
  }, [address]);

  return (
    <MapContainer center={center} zoom={15} style={{ height: '300px', width: '100%' }}>
      <ChangeView center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={center} />
    </MapContainer>
  );
} 