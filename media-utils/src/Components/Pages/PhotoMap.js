import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const defaultIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
const PhotoMap = ({ locations }) => {
    if (locations.length === 0) {
        return React.createElement("p", null, "No photos with location data available.");
    }
    // Calculate map center (average of all locations)
    const centerLat = locations.reduce((sum, photo) => sum + photo.location.latitude, 0) /
        locations.length;
    const centerLng = locations.reduce((sum, photo) => sum + photo.location.longitude, 0) /
        locations.length;
    return (React.createElement("div", { style: { height: "500px", width: "100%", marginTop: "20px" } },
        React.createElement(MapContainer, { center: [centerLat, centerLng], zoom: 13, style: { height: "100%", width: "100%" } },
            React.createElement(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
            locations.map((photo) => {
                var _a, _b;
                return (React.createElement(Marker, { key: photo.id, position: [photo.location.latitude, photo.location.longitude], icon: defaultIcon },
                    React.createElement(Popup, null,
                        React.createElement("div", { style: { textAlign: "center" } },
                            React.createElement("img", { src: photo.imageData, alt: "Location photo", style: { maxWidth: "150px", maxHeight: "150px" } }),
                            React.createElement("p", null,
                                "Captured: ", (_b = (_a = photo.createdAt) === null || _a === void 0 ? void 0 : _a.toDate()) === null || _b === void 0 ? void 0 :
                                _b.toLocaleString()),
                            photo.location.accuracy && (React.createElement("p", null,
                                "Accuracy: ~",
                                Math.round(photo.location.accuracy),
                                " meters"))))));
            }))));
};
export default PhotoMap;
