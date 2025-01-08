import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import "./Address_page.css";
import Sidebar from './Sidebar';


interface Address {
  name: string;
  mobile: string;
  email?: string;
  address: string;
  locality?: string;
  landmark: string;
  pinCode: string;
  city: string;
  state: string;
}

const Address_page: React.FC = () => {
  const [page, setPage] = useState<"home" | "addAddress" | "editAddress">("home");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentAddress, setCurrentAddress] = useState<Address>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    locality: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const userEmail = auth.currentUser?.email || "testuser@example.com"; // Replace with logged-in user email

  useEffect(() => {
    const fetchAddresses = async () => {
      const docRef = doc(db, "customer_Details", userEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAddresses(docSnap.data().addresses || []);
      }
    };

    fetchAddresses();
  }, [userEmail]);

  const handleAddAddress = async () => {
    if (!currentAddress.name || !currentAddress.mobile || !currentAddress.address) {
      alert("Please fill all required fields!");
      return;
    }

    const docRef = doc(db, "customer_Details", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        addresses: arrayUnion(currentAddress),
      });
    } else {
      await setDoc(docRef, {
        addresses: [currentAddress],
      });
    }

    setAddresses((prev) => [...prev, currentAddress]);
    resetForm();
    setPage("home");
  };

  const handleEditAddress = async () => {
    if (editIndex === null) return;

    const updatedAddresses = [...addresses];
    updatedAddresses[editIndex] = currentAddress;

    const docRef = doc(db, "customer_Details", userEmail);
    await updateDoc(docRef, { addresses: updatedAddresses });

    setAddresses(updatedAddresses);
    resetForm();
    setPage("home");
  };

  const handleDeleteAddress = async (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);

    const docRef = doc(db, "customer_Details", userEmail);
    await updateDoc(docRef, { addresses: updatedAddresses });

    setAddresses(updatedAddresses);
  };

  const handleEditClick = (index: number) => {
    setCurrentAddress(addresses[index]);
    setEditIndex(index);
    setPage("editAddress");
  };

  const resetForm = () => {
    setCurrentAddress({
      name: "",
      mobile: "",
      email: "",
      address: "",
      locality: "",
      landmark: "",
      pinCode: "",
      city: "",
      state: "",
    });
    setEditIndex(null);
  };

  return (
    <>
    <Sidebar/>
    <div className="address-app">
      {page === "home" && (
    <>
      <button className="address-app-btn" onClick={() => setPage("addAddress")}>
        + Add new address
      </button>
      {addresses.map((address, index) => (
        <div key={index} className="address-app-card">
          <p>
            <strong>{address.name}</strong>
          </p>
          <p>Mobile: {address.mobile}</p>
          <p>
            {address.address}, {address.city} - {address.pinCode}
          </p>
          <button
            className="address-app-card-btn"
            onClick={() => handleEditClick(index)}
          >
            Edit
          </button>
          <button
            className="address-app-card-btn delete"
            onClick={() => handleDeleteAddress(index)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  )}

      {(page === "addAddress" || page === "editAddress") && (
        <div className="address-app-form">
          <h3>{page === "addAddress" ? "Add New Address" : "Edit Address"}</h3>
          <input
            type="text"
            placeholder="Name"
            value={currentAddress.name}
            onChange={(e) => setCurrentAddress({ ...currentAddress, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={currentAddress.mobile}
            onChange={(e) => setCurrentAddress({ ...currentAddress, mobile: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email (Optional)"
            value={currentAddress.email}
            onChange={(e) => setCurrentAddress({ ...currentAddress, email: e.target.value })}
          />
          <textarea
            placeholder="Address"
            value={currentAddress.address}
            onChange={(e) => setCurrentAddress({ ...currentAddress, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Landmark"
            value={currentAddress.landmark}
            onChange={(e) => setCurrentAddress({ ...currentAddress, landmark: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            value={currentAddress.pinCode}
            onChange={(e) => setCurrentAddress({ ...currentAddress, pinCode: e.target.value })}
          />
          <input
            type="text"
            placeholder="City"
            value={currentAddress.city}
            onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
          />
          <select
            value={currentAddress.state}
            onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
          >
            <option value="">Select State</option>
            <option value="State 1">State 1</option>
            <option value="State 2">State 2</option>
          </select>
          <button
            onClick={page === "addAddress" ? handleAddAddress : handleEditAddress}
          >
            {page === "addAddress" ? "Add Address" : "Update Address"}
          </button>
          <button onClick={() => setPage("home")}>Cancel</button>
        </div>
      )}
    </div>
    </>
  );
};

export default Address_page;
