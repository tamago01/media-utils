import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./dashboard.css";

interface GeoLocation {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp?: number;
}

const db = getFirestore();

const CustomWebcam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [location, setLocation] = useState<GeoLocation>({
    latitude: null,
    longitude: null,
    accuracy: null,
  });
  const [locationError, setLocationError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          setLocationError(error.message);
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImgSrc(imageSrc ?? null);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const savePhotoToFirestore = async () => {
    if (!imgSrc) return;

    setUploading(true);
    try {
      await addDoc(collection(db, "temporaryPhotos"), {
        imageData: imgSrc,
        location:
          location.latitude && location.longitude
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy,
              }
            : null,
        createdAt: serverTimestamp(),
        status: "temporary",
      });

      alert("Photo saved with location data!");
      setImgSrc(null);
    } catch (error) {
      console.error("Error saving photo:", error);
      alert("Failed to save photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      {imgSrc ? (
        <div className="photo-preview">
          <img
            src={imgSrc}
            alt="webcam"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          {location.latitude && location.longitude && (
            <div className="location-preview">
              <p>📍 Location captured:</p>
              <p>Lat: {location.latitude.toFixed(6)}</p>
              <p>Lng: {location.longitude.toFixed(6)}</p>
              <p>Accuracy: ~{Math.round(location.accuracy || 0)} meters</p>
            </div>
          )}
        </div>
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      )}

      {locationError && (
        <div className="location-error">
          <p>⚠️ {locationError}</p>
        </div>
      )}

      <div className="btn-container">
        {imgSrc ? (
          <>
            <button onClick={retake} disabled={uploading}>
              Retake photo
            </button>
            <button onClick={savePhotoToFirestore} disabled={uploading}>
              {uploading ? "Saving..." : "Save with Location"}
            </button>
          </>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
