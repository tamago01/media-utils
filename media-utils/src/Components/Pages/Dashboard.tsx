import React, { useState, useRef } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./Dashboard.css";
import CustomWebcam from "./CustomWebCam";

const storage = getStorage();
const db = getFirestore();

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is MP4
      if (file.type === "video/mp4") {
        setVideoFile(file);
        const url = URL.createObjectURL(file);
        setVideoPreviewUrl(url);
      } else {
        alert("Please upload an MP4 file");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) return;

    let photoURL = null;

    if (photo) {
      const photoBlob = await fetch(photo).then((res) => res.blob());
      const photoRef = ref(storage, `photos/${videoFile.name}-photo.png`);
      await uploadBytes(photoRef, photoBlob);
      photoURL = await getDownloadURL(photoRef);
    }

    try {
      const storageRef = ref(storage, `videos/${videoFile.name}`);
      await uploadBytes(storageRef, videoFile);

      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "videos"), {
        name: videoFile.name,
        size: videoFile.size,
        url,
        photoURL,
        createdAt: serverTimestamp(),
      });

      alert("Video uploaded successfully!");
      setVideoFile(null);
      setVideoPreviewUrl(null);
      setPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
            <p className="dashboard-subtitle">Upload and preview your videos</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </button>
        </div>

        <div className="upload-card">
          <div className="upload-header">
            <h2>Upload Your Video</h2>
            <p>MP4 format recommended</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              className={`upload-area ${
                !videoPreviewUrl ? "upload-empty" : "upload-filled"
              }`}
            >
              {!videoPreviewUrl ? (
                <div className="upload-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    height={40}
                    width={40}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="upload-text">
                    Drag and drop your video here or click to browse
                  </p>
                  <p className="upload-note">MP4 files up to 50MB</p>
                  <label className="upload-label">
                    <span className="upload-button">Select File</span>
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="video-preview">
                  <video
                    controls
                    src={videoPreviewUrl}
                    height={200}
                    width={300}
                    className="video-player"
                  />
                  <div className="progress-bar">
                    <div className="progress-fill"></div>
                  </div>
                  <div className="file-info">
                    <span>{videoFile?.name}</span>
                    <span>
                      {videoFile?.size
                        ? (videoFile.size / (1024 * 1024)).toFixed(2)
                        : "0"}{" "}
                      MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setVideoPreviewUrl(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="remove-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={20}
                      width={20}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remove File
                  </button>
                </div>
              )}
            </div>

            <div className="submit-section">
              <button
                type="submit"
                disabled={!videoFile}
                className={`submit-btn ${videoFile ? "enabled" : "disabled"}`}
              >
                {videoFile ? (
                  <span className="btn-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Upload Video
                  </span>
                ) : (
                  "Select a file to upload"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="webcam-section">
        <h2>Webcam Capture</h2>
        <CustomWebcam />
      </div>
    </div>
  );
};

export default Dashboard;
