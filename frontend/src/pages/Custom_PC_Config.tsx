import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase"; // Adjust path as needed
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./Custom_PC_Config.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  processor: string;
  motherboard: string;
  ram: number;
  hdd: number;
  ssd: number;
  gpu: string;
  psu: string;
  cooling: string;
  chassis: string;
  os: string;
  monitor: string;
  keyboardMouse: string;
  peripherals: string;
  budget: number;
  deliveryTime: string;
  comments: string;
}

const CustomPCForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    processor: "",
    motherboard: "",
    ram: 0,
    hdd: 0,
    ssd: 0,
    gpu: "",
    psu: "",
    cooling: "",
    chassis: "",
    os: "none",
    monitor: "none",
    keyboardMouse: "no",
    peripherals: "",
    budget: 0,
    deliveryTime: "",
    comments: "",
  });

  const [userId, setUserId] = useState<string | null>(null);

  // Monitor user authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to submit this form.");
      return;
    }

    try {
      // Reference the document in Firestore
      const userDocRef = doc(db, "CustomerPc_config", userId);

      // Add form data to the submissions array
      await setDoc(
        userDocRef,
        { submissions: arrayUnion(formData) }, // Append form data to submissions array
        { merge: true } // Merge with existing data
      );

      alert("Form submitted successfully!");

      // Reset the form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        processor: "",
        motherboard: "",
        ram: 0,
        hdd: 0,
        ssd: 0,
        gpu: "",
        psu: "",
        cooling: "",
        chassis: "",
        os: "none",
        monitor: "none",
        keyboardMouse: "no",
        peripherals: "",
        budget: 0,
        deliveryTime: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Custom PC Configuration Form</h1>

      {/* Basic Details */}
      <fieldset>
        <legend><strong>Basic Details</strong></legend>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br /><br />

        <label>Email Address:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

        <label>Phone Number:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /><br /><br />

        <label>Delivery Address:</label><br />
        <textarea name="address" value={formData.address} onChange={handleChange} rows={4} required></textarea>
      </fieldset>

      {/* Preferred Configuration */}
      <fieldset>
        <legend><strong>Preferred Configuration</strong></legend>
        <label>Processor:</label>
        <input type="text" name="processor" value={formData.processor} onChange={handleChange} required /><br /><br />

        <label>Motherboard:</label>
        <input type="text" name="motherboard" value={formData.motherboard} onChange={handleChange} required /><br /><br />

        <label>RAM (GB):</label>
        <input type="number" name="ram" value={formData.ram} onChange={handleChange} required /><br /><br />

        <label>HDD (TB):</label>
        <input type="number" name="hdd" value={formData.hdd} onChange={handleChange} /><br /><br />

        <label>SSD (GB):</label>
        <input type="number" name="ssd" value={formData.ssd} onChange={handleChange} /><br /><br />

        <label>Graphics Card:</label>
        <input type="text" name="gpu" value={formData.gpu} onChange={handleChange} /><br /><br />

        <label>Power Supply Unit (PSU):</label>
        <input type="text" name="psu" value={formData.psu} onChange={handleChange} /><br /><br />

        <label>Cooling System:</label>
        <input type="text" name="cooling" value={formData.cooling} onChange={handleChange} /><br /><br />

        <label>Cabinet/Chassis:</label>
        <input type="text" name="chassis" value={formData.chassis} onChange={handleChange} /><br /><br />
      </fieldset>

      {/* Additional Preferences */}
      <fieldset>
        <legend><strong>Additional Preferences</strong></legend>
        <label>Operating System:</label>
        <select name="os" value={formData.os} onChange={handleChange} required>
          <option value="none">None</option>
          <option value="windows">Windows</option>
          <option value="linux">Linux</option>
        </select><br /><br />

        <label>Monitor:</label>
        <select name="monitor" value={formData.monitor} onChange={handleChange}>
          <option value="none">No</option>
          <option value="24">Yes - 24 inch</option>
          <option value="27">Yes - 27 inch</option>
        </select><br /><br />

        <label>Keyboard and Mouse:</label>
        <select name="keyboardMouse" value={formData.keyboardMouse} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select><br /><br />

        <label>Other Peripherals:</label><br />
        <textarea name="peripherals" value={formData.peripherals} onChange={handleChange} rows={3}></textarea>
      </fieldset>

      {/* Budget and Timeline */}
      <fieldset>
        <legend><strong>Budget and Timeline</strong></legend>
        <label>Approximate Budget (in USD):</label>
        <input type="number" name="budget" value={formData.budget} onChange={handleChange} required /><br /><br />

        <label>Preferred Delivery Time:</label>
        <input type="date" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required />
      </fieldset>

      {/* Comments */}
      <fieldset>
        <legend><strong>Comments or Special Requests</strong></legend>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          placeholder="Enter any additional requests or details"
        ></textarea>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomPCForm;
