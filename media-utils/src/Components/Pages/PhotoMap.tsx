import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const defaultIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PhotoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface PhotoMapProps {
  locations: {
    id: string;
    imageData: string;
    location: PhotoLocation;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt?: any;
  }[];
}

const PhotoMap: React.FC<PhotoMapProps> = ({ locations }) => {
  if (locations.length === 0) {
    return <p>No photos with location data available.</p>;
  }

  // Calculate map center (average of all locations)
  const centerLat =
    locations.reduce((sum, photo) => sum + photo.location.latitude, 0) /
    locations.length;
  const centerLng =
    locations.reduce((sum, photo) => sum + photo.location.longitude, 0) /
    locations.length;

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {locations.map((photo) => (
            
          <Marker
            key={photo.id}
            position={[photo.location.latitude, photo.location.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <div style={{ textAlign: "center" }}>
                <img
                  src={photo.imageData}
                  alt="Location photo"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
                <p>Captured: {photo.createdAt?.toDate()?.toLocaleString()}</p>
                {photo.location.accuracy && (
                  <p>Accuracy: ~{Math.round(photo.location.accuracy)} meters</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PhotoMap;
