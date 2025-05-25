import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import PhotoMap from "./PhotoMap";
import "./dashboard.css";

interface TemporaryPhoto {
  id: string;
  imageData: string;
  location?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt?: any;
}

const Media: React.FC = () => {
  const [temporaryPhotos, setTemporaryPhotos] = useState<TemporaryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"photos" | "map">("photos");

  useEffect(() => {
    const fetchTemporaryPhotos = async () => {
      const db = getFirestore();
      const q = query(
        collection(db, "temporaryPhotos"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);

      const photoList: TemporaryPhoto[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TemporaryPhoto[];

      setTemporaryPhotos(photoList);
      setLoading(false);
    };

    fetchTemporaryPhotos();
  }, []);

  const photosWithLocation = temporaryPhotos.filter((photo) => photo.location);

  return (
    <div style={{ padding: "20px" }}>
      {/* <Roles /> */}
      <h1>Media Gallery</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setActiveTab("photos")}
          style={{
            padding: "8px 16px",
            backgroundColor: activeTab === "photos" ? "#007bff" : "#f0f0f0",
            color: activeTab === "photos" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          All Photos
        </button>
        <button
          onClick={() => setActiveTab("map")}
          disabled={photosWithLocation.length === 0}
          style={{
            padding: "8px 16px",
            backgroundColor: activeTab === "map" ? "#007bff" : "#f0f0f0",
            color: activeTab === "map" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: photosWithLocation.length === 0 ? "not-allowed" : "pointer",
            opacity: photosWithLocation.length === 0 ? 0.6 : 1,
          }}
        >
          Map View{" "}
          {photosWithLocation.length > 0 && `(${photosWithLocation.length})`}
        </button>
      </div>

      {loading ? (
        <p>Loading photos...</p>
      ) : activeTab === "photos" ? (
        <>
          <h2>All Photos</h2>
          {temporaryPhotos.length === 0 ? (
            <p>No photos found</p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
            >
              {temporaryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={photo.imageData}
                    alt={`Photo ${photo.id}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "300px",
                      objectFit: "contain",
                    }}
                  />
                  <p>Saved on: {photo.createdAt?.toDate()?.toLocaleString()}</p>
                  {photo.location && (
                    <p>
                      📍 Location: {photo.location.latitude.toFixed(4)},{" "}
                      {photo.location.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Photos on Map</h2>
          <PhotoMap
            locations={
              photosWithLocation as {
                id: string;
                imageData: string;
                location: {
                  latitude: number;
                  longitude: number;
                  accuracy?: number;
                };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                createdAt?: any;
              }[]
            }
          />
        </>
      )}
    </div>
  );
};

export default Media;
