var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import { updateDoc, doc, getFirestore, collection, query, where, getDocs, } from "firebase/firestore";
const Roles = () => {
    const [email, setEmail] = useState("");
    const [newRole, setNewRole] = useState("user");
    const assignRole = () => __awaiter(void 0, void 0, void 0, function* () {
        const db = getFirestore();
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = yield getDocs(q);
        if (querySnapshot.empty) {
            alert("User not found");
            return;
        }
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        yield updateDoc(doc(db, "users", userId), { role: newRole });
        alert("Role updated for " + email);
    });
    return (React.createElement("div", null,
        React.createElement("h3", null, "Assign Role (Mock UI)"),
        React.createElement("input", { value: email, onChange: (e) => setEmail(e.target.value), placeholder: "User Email" }),
        React.createElement("select", { value: newRole, onChange: (e) => setNewRole(e.target.value) },
            React.createElement("option", { value: "user" }, "User"),
            React.createElement("option", { value: "admin" }, "Admin")),
        React.createElement("button", { onClick: assignRole }, "Update Role")));
};
export default Roles;
