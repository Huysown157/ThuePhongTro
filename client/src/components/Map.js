import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const Map = ({ address }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!address) return;
    const provider = new OpenStreetMapProvider();
    provider.search({ query: address }).then((results) => {
      if (results && results.length > 0) {
        setPosition([results[0].y, results[0].x]);
      }
    });
  }, [address]);

  return (
    <div style={{ width: "100%", height: "350px" }}>
      {position ? (
        <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
            <Popup>Đây là vị trí hiện tại</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div>Đang tải bản đồ...</div>
      )}
    </div>
  );
};

export default Map;
