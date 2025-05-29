/* eslint-disable no-undef */
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function MapCustom({ address }) {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [loadLeaf, setLoadLeaf] = useState(false);
  const [loadEsri, setLoadEsri] = useState(false);
  // console.log(address);
  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (!address) {
          address = [latitude, longitude];
        }
      }
    );
    if (!address) return;

    const leafletScript = document.createElement("script");
    const esriLeafletGeocoderScript = document.createElement("script");
    const esriLeafletScript = document.createElement("script");

    leafletScript.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
    leafletScript.async = true;
    leafletScript.onload = (e) => setLoadLeaf(true);
    document.head.appendChild(leafletScript);

    esriLeafletScript.src =
      "https://unpkg.com/esri-leaflet@3.0.10/dist/esri-leaflet.js";
    esriLeafletScript.async = true;
    esriLeafletScript.onload = (e) => setLoadEsri(true);
    document.head.appendChild(esriLeafletScript);

    esriLeafletGeocoderScript.src =
      "https://unpkg.com/esri-leaflet-geocoder@3.1.4/dist/esri-leaflet-geocoder.js";
    esriLeafletGeocoderScript.async = true;
    esriLeafletGeocoderScript.onload = (e) =>
      esriLeafletGeocoderScriptLoaded(e);
    document.head.appendChild(esriLeafletGeocoderScript);

    const esriLeafletGeocoderScriptLoaded = (e) => {
      if (!L || !loadEsri || !loadLeaf) return;

      const apiKey =
        "AAPK9da88b6ecd2f41f1b082da478a710ae3hswDcbGqFLvmY4fNSF3cipoI5pv-cSLaeqlNZJv2Ct13V3wwW1LOnT-tQ14sJ95K";

      let map = null;

      const check = L.DomUtil.get("map");

      const greenIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30], //size of the icon
      });

      if (check === null) {
        const element = document.getElementById("map");
        element?.parentNode.removeChild(element);
        document.getElementById("weathermap").innerHTML =
          "<div id='map' style='width: 100%; height: 100%;'></div>";
      }

      if (!mapInitialized && map === null) {
        try {
          map = new L.map("map");

          map.invalidateSize();
          L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          L.esri.Geocoding.geocode({
            apikey: apiKey,
          })
            .text(address)
            .run(function (error, response) {
              if (error) {
                console.log("error callback", error);
                return;
              }

              L.marker(
                [
                  response.results[0].latlng.lat,
                  response.results[0].latlng.lng,
                ],
                {
                  icon: greenIcon,
                }
              )
                .addTo(map)
                .bindPopup(response.results[0].properties.LongLabel)
                .openPopup();

              map.fitBounds(response.results[0].bounds);
              map.setZoom(14);
            });
          setMapInitialized(true);
        } catch (error) {
          if (map) {
            map.off();
            map.remove();
          }
        }
      }
    };

    return () => {
      document.head.removeChild(esriLeafletGeocoderScript);
      document.head.removeChild(leafletScript);
      document.head.removeChild(esriLeafletScript);
    };
  }, [address, loadEsri, loadLeaf, mapInitialized]);

  return <div id="weathermap"></div>;
}

// MapCustom.propTypes = {
//   address: PropTypes.string.isRequired,
// };

export default MapCustom;
