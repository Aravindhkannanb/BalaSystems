import React, { useState, useEffect } from "react";
import { db } from "../config/firebase"; // Adjust the path as needed
import { collection, getDocs } from "firebase/firestore";
import "./Admin_Custom_PC.css";
interface Request {
  email: string;
  submissions: any[];
}

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "CustomerPc_config"));
        const allRequests: Request[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allRequests.push({ email: doc.id, submissions: data.submissions });
        });

        setRequests(allRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {requests.map((request) => (
        <div key={request.email} className="request-card">
          <h2>{request.email}</h2>
          {request.submissions.map((submission, index) => (
            <div key={index} className="submission">
              <p><strong>Name:</strong> {submission.name}</p>
              <p><strong>Budget:</strong> ${submission.budget}</p>
              <p><strong>Processor:</strong> {submission.processor}</p>
              <p><strong>Delivery Date:</strong> {submission.deliveryTime}</p>
              <p><strong>Comments:</strong> {submission.comments}</p>
              <button className="btn-accept">Accept</button>
              <button className="btn-decline">Decline</button>
              <button className="btn-deliver">Deliver</button>
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
