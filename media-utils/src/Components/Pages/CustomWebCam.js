var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { getFirestore, collection, addDoc, serverTimestamp, } from "firebase/firestore";
import "./dashboard.css";
const db = getFirestore();
const CustomWebcam = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        accuracy: null,
    });
    const [locationError, setLocationError] = useState(null);
    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                });
            }, (error) => {
                setLocationError(error.message);
                console.error("Geolocation error:", error);
            }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
        }
        else {
            setLocationError("Geolocation is not supported by this browser.");
        }
    }, []);
    const capture = useCallback(() => {
        var _a;
        const imageSrc = (_a = webcamRef === null || webcamRef === void 0 ? void 0 : webcamRef.current) === null || _a === void 0 ? void 0 : _a.getScreenshot();
        setImgSrc(imageSrc !== null && imageSrc !== void 0 ? imageSrc : null);
    }, [webcamRef]);
    const retake = () => {
        setImgSrc(null);
    };
    const savePhotoToFirestore = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!imgSrc)
            return;
        setUploading(true);
        try {
            yield addDoc(collection(db, "temporaryPhotos"), {
                imageData: imgSrc,
                location: location.latitude && location.longitude
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
        }
        catch (error) {
            console.error("Error saving photo:", error);
            alert("Failed to save photo");
        }
        finally {
            setUploading(false);
        }
    });
    return (React.createElement("div", { className: "container" },
        imgSrc ? (React.createElement("div", { className: "photo-preview" },
            React.createElement("img", { src: imgSrc, alt: "webcam", style: { maxWidth: "100%", height: "auto" } }),
            location.latitude && location.longitude && (React.createElement("div", { className: "location-preview" },
                React.createElement("p", null, "\uD83D\uDCCD Location captured:"),
                React.createElement("p", null,
                    "Lat: ",
                    location.latitude.toFixed(6)),
                React.createElement("p", null,
                    "Lng: ",
                    location.longitude.toFixed(6)),
                React.createElement("p", null,
                    "Accuracy: ~",
                    Math.round(location.accuracy || 0),
                    " meters"))))) : (React.createElement(Webcam, { height: 600, width: 600, ref: webcamRef, screenshotFormat: "image/jpeg" })),
        locationError && (React.createElement("div", { className: "location-error" },
            React.createElement("p", null,
                "\u26A0\uFE0F ",
                locationError))),
        React.createElement("div", { className: "btn-container" }, imgSrc ? (React.createElement(React.Fragment, null,
            React.createElement("button", { onClick: retake, disabled: uploading }, "Retake photo"),
            React.createElement("button", { onClick: savePhotoToFirestore, disabled: uploading }, uploading ? "Saving..." : "Save with Location"))) : (React.createElement("button", { onClick: capture }, "Capture photo")))));
};
export default CustomWebcam;
