import React, { useState } from "react";
import {
  updateDoc,
  doc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Roles = () => {
  const [email, setEmail] = useState("");
  const [newRole, setNewRole] = useState("user");

  const assignRole = async () => {
    const db = getFirestore();

    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("User not found");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userId = userDoc.id;

    await updateDoc(doc(db, "users", userId), { role: newRole });
    alert("Role updated for " + email);
  };
  return (
    <div>
      <h3>Assign Role (Mock UI)</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User Email"
      />
      <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={assignRole}>Update Role</button>
    </div>
  );
};
export default Roles;
