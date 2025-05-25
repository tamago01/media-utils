var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, orderBy, } from "firebase/firestore";
import PhotoMap from "./PhotoMap";
import Roles from "../Auth/RolesMgmt";
import "./dashboard.css";
const Media = () => {
    const [temporaryPhotos, setTemporaryPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("photos");
    useEffect(() => {
        const fetchTemporaryPhotos = () => __awaiter(void 0, void 0, void 0, function* () {
            const db = getFirestore();
            const q = query(collection(db, "temporaryPhotos"), orderBy("createdAt", "desc"));
            const snapshot = yield getDocs(q);
            const photoList = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            setTemporaryPhotos(photoList);
            setLoading(false);
        });
        fetchTemporaryPhotos();
    }, []);
    const photosWithLocation = temporaryPhotos.filter((photo) => photo.location);
    return (React.createElement("div", { style: { padding: "20px" } },
        React.createElement(Roles, null),
        React.createElement("h1", null, "Media Gallery"),
        React.createElement("div", { style: { marginBottom: "20px", display: "flex", gap: "10px" } },
            React.createElement("button", { onClick: () => setActiveTab("photos"), style: {
                    padding: "8px 16px",
                    backgroundColor: activeTab === "photos" ? "#007bff" : "#f0f0f0",
                    color: activeTab === "photos" ? "white" : "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                } }, "All Photos"),
            React.createElement("button", { onClick: () => setActiveTab("map"), disabled: photosWithLocation.length === 0, style: {
                    padding: "8px 16px",
                    backgroundColor: activeTab === "map" ? "#007bff" : "#f0f0f0",
                    color: activeTab === "map" ? "white" : "black",
                    border: "none",
                    borderRadius: "4px",
                    cursor: photosWithLocation.length === 0 ? "not-allowed" : "pointer",
                    opacity: photosWithLocation.length === 0 ? 0.6 : 1,
                } },
                "Map View",
                " ",
                photosWithLocation.length > 0 && `(${photosWithLocation.length})`)),
        loading ? (React.createElement("p", null, "Loading photos...")) : activeTab === "photos" ? (React.createElement(React.Fragment, null,
            React.createElement("h2", null, "All Photos"),
            temporaryPhotos.length === 0 ? (React.createElement("p", null, "No photos found")) : (React.createElement("div", { style: {
                    display: "grid",
                    gap: "20px",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                } }, temporaryPhotos.map((photo) => {
                var _a, _b;
                return (React.createElement("div", { key: photo.id, style: {
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "8px",
                    } },
                    React.createElement("img", { src: photo.imageData, alt: `Photo ${photo.id}`, style: {
                            width: "100%",
                            height: "auto",
                            maxHeight: "300px",
                            objectFit: "contain",
                        } }),
                    React.createElement("p", null,
                        "Saved on: ", (_b = (_a = photo.createdAt) === null || _a === void 0 ? void 0 : _a.toDate()) === null || _b === void 0 ? void 0 :
                        _b.toLocaleString()),
                    photo.location && (React.createElement("p", null,
                        "\uD83D\uDCCD Location: ",
                        photo.location.latitude.toFixed(4),
                        ",",
                        " ",
                        photo.location.longitude.toFixed(4)))));
            }))))) : (React.createElement(React.Fragment, null,
            React.createElement("h2", null, "Photos on Map"),
            React.createElement(PhotoMap, { locations: photosWithLocation })))));
};
export default Media;
