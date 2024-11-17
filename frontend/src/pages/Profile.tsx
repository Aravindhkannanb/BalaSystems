import './Profile.css';
import Sidebar from './Sidebar';
import { auth } from '../config/firebase';

const Profile = () => {


  return (
    <div className="profile-container">
      <Sidebar /> 
      
      <div className="profile-content">
        <h1>Profile</h1>
        <div className="profile-info">
          <label>
            User ID:
            <span>{auth.currentUser?.uid}</span>
          </label>
          <label>
            Email:
            <span>{auth.currentUser?.email}</span>
          </label>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
