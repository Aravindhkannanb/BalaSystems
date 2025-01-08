import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import './Cus_Custom_PC.css';
const UserDashboard: React.FC = () => {
  const [userSubmissions, setUserSubmissions] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRequests = async () => {
      if (!userEmail) return;

      try {
        const userDocRef = doc(db, "CustomerPc_config", userEmail); // Use email as the document ID
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserSubmissions(userDoc.data().submissions || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };

    fetchUserRequests();
  }, [userEmail]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the email of the logged-in user
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      {userSubmissions.length > 0 ? (
        userSubmissions.map((submission, index) => (
          <div key={index} className="user-submission-card">
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Budget:</strong> ${submission.budget}</p>
            <p><strong>Processor:</strong> {submission.processor}</p>
            <p><strong>Delivery Date:</strong> {submission.deliveryTime}</p>
            <p><strong>Comments:</strong> {submission.comments}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default UserDashboard;
