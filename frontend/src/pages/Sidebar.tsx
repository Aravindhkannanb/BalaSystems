import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import AdminDashboard from './Admin_Custom_PC';
import CustomDasboard from './Cus_Custom_PC';

const Sidebar = () => {
  const navigate = useNavigate();


  const handleNavigation = (path) => {
    navigate(path);
  };

  const isAdmin = auth.currentUser?.email == 'aravindhkannan26@gmail.com';

  const handleLogout = () => {
    console.log('User logged out');
    signOut(auth).then(()=> navigate('/home'))
    .catch((error: { message: React.SetStateAction<string>; }) => {
        console.error('Error signing up: ', error);
    });
  };
  return (
    <div className={`sidebarOpen`}>
        
        <ul className="sidebar-menu">
        {isAdmin? <li onClick={() => handleNavigation('/add_product')}>Add Products</li>:<></>}
        {isAdmin? <li onClick={() => handleNavigation('/manage-products')}>Manage Products</li>:<></>}
        {isAdmin? <li onClick={() => handleNavigation('/admin_dashboard')}>Customer Requests</li>:<li onClick={() => handleNavigation('/custom_dashboard')}>My Requests</li>}

          <li onClick={() => handleNavigation('/view_orders')}>View Orders</li>
          <li onClick={() => handleNavigation('/cart')}>View Cart Items</li>
          <li onClick={() => handleNavigation('/saved_addresses')}>Saved Addresses</li>
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </div>
  )
}

export default Sidebar