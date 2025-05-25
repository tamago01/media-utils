var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useRef } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp, } from "firebase/firestore";
import "./dashboard.css";
import CustomWebcam from "./CustomWebCam";
const storage = getStorage();
const db = getFirestore();
const Dashboard = () => {
    const navigate = useNavigate();
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield signOut(auth);
            navigate("/login");
        }
        catch (error) {
            console.error("Error signing out: ", error);
        }
    });
    const handleFileChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // Check if file is MP4
            if (file.type === "video/mp4") {
                setVideoFile(file);
                const url = URL.createObjectURL(file);
                setVideoPreviewUrl(url);
            }
            else {
                alert("Please upload an MP4 file");
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        }
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!videoFile)
            return;
        let photoURL = null;
        if (photo) {
            const photoBlob = yield fetch(photo).then((res) => res.blob());
            const photoRef = ref(storage, `photos/${videoFile.name}-photo.png`);
            yield uploadBytes(photoRef, photoBlob);
            photoURL = yield getDownloadURL(photoRef);
        }
        try {
            const storageRef = ref(storage, `videos/${videoFile.name}`);
            yield uploadBytes(storageRef, videoFile);
            const url = yield getDownloadURL(storageRef);
            yield addDoc(collection(db, "videos"), {
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
            if (fileInputRef.current)
                fileInputRef.current.value = "";
        }
        catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Check console for details.");
        }
    });
    return (React.createElement("div", { className: "dashboard" },
        React.createElement("div", { className: "dashboard-container" },
            React.createElement("div", { className: "dashboard-header" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "dashboard-title" }, "Welcome to Your Dashboard"),
                    React.createElement("p", { className: "dashboard-subtitle" }, "Upload and preview your videos")),
                React.createElement("button", { onClick: handleLogout, className: "logout-btn" },
                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", viewBox: "0 0 20 20", fill: "currentColor" },
                        React.createElement("path", { fillRule: "evenodd", d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z", clipRule: "evenodd" })),
                    "Logout")),
            React.createElement("div", { className: "upload-card" },
                React.createElement("div", { className: "upload-header" },
                    React.createElement("h2", null, "Upload Your Video"),
                    React.createElement("p", null, "MP4 format recommended")),
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement("div", { className: `upload-area ${!videoPreviewUrl ? "upload-empty" : "upload-filled"}` }, !videoPreviewUrl ? (React.createElement("div", { className: "upload-placeholder" },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", height: 40, width: 40, viewBox: "0 0 24 24", stroke: "currentColor" },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" })),
                        React.createElement("p", { className: "upload-text" }, "Drag and drop your video here or click to browse"),
                        React.createElement("p", { className: "upload-note" }, "MP4 files up to 50MB"),
                        React.createElement("label", { className: "upload-label" },
                            React.createElement("span", { className: "upload-button" }, "Select File"),
                            React.createElement("input", { type: "file", accept: "video/mp4", onChange: handleFileChange, ref: fileInputRef, className: "hidden" })))) : (React.createElement("div", { className: "video-preview" },
                        React.createElement("video", { controls: true, src: videoPreviewUrl, height: 200, width: 300, className: "video-player" }),
                        React.createElement("div", { className: "progress-bar" },
                            React.createElement("div", { className: "progress-fill" })),
                        React.createElement("div", { className: "file-info" },
                            React.createElement("span", null, videoFile === null || videoFile === void 0 ? void 0 : videoFile.name),
                            React.createElement("span", null,
                                (videoFile === null || videoFile === void 0 ? void 0 : videoFile.size)
                                    ? (videoFile.size / (1024 * 1024)).toFixed(2)
                                    : "0",
                                " ",
                                "MB")),
                        React.createElement("button", { type: "button", onClick: () => {
                                setVideoFile(null);
                                setVideoPreviewUrl(null);
                                if (fileInputRef.current)
                                    fileInputRef.current.value = "";
                            }, className: "remove-btn" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: 20, width: 20, viewBox: "0 0 20 20", fill: "currentColor" },
                                React.createElement("path", { fillRule: "evenodd", d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z", clipRule: "evenodd" })),
                            "Remove File")))),
                    React.createElement("div", { className: "submit-section" },
                        React.createElement("button", { type: "submit", disabled: !videoFile, className: `submit-btn ${videoFile ? "enabled" : "disabled"}` }, videoFile ? (React.createElement("span", { className: "btn-content" },
                            React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", viewBox: "0 0 20 20", fill: "currentColor" },
                                React.createElement("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" })),
                            "Upload Video")) : ("Select a file to upload")))))),
        React.createElement("div", { className: "dashboard-title" },
            React.createElement("h2", null, "Webcam Capture"),
            React.createElement(CustomWebcam, null))));
};
export default Dashboard;
