import React from "react";
import './AboutUs.css';
import { FaLaptop, FaTools, FaVideo, FaServer, FaPhoneAlt } from 'react-icons/fa';  // Importing some icons for better visualization

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <h1 className="title">About Bala Systems</h1>

      {/* Section: Company Information */}
      <div className="company-info">
        <div className="company-details">
          <h2><FaLaptop /> Bala Systems</h2>
          <p><strong>Location:</strong> 3/2, PERAKKA NAGAR, Pasumalai Madurai, Madurai - 625004 (Military Office)</p>
          <p><strong>Established:</strong> 2005</p>
          <p><strong>GSTIN:</strong> 33AFHPV8488F1ZU</p>
        </div>

        {/* Section: Working Hours */}
        <div className="working-hours">
          <h3>Working Hours</h3>
          <ul>
            <li><strong>TUE (Today):</strong> 10:00 am - 9:00 pm</li>
            <li><strong>WED:</strong> 10:00 am - 9:00 pm</li>
            <li><strong>THU:</strong> 10:00 am - 9:00 pm</li>
            <li><strong>FRI:</strong> 10:00 am - 9:00 pm</li>
            <li><strong>SAT:</strong> 10:00 am - 9:00 pm</li>
            <li><strong>SUN:</strong> 11:00 am - 1:30 pm</li>
            <li><strong>MON:</strong> 10:00 am - 9:00 pm</li>
          </ul>
        </div>
      </div>

      {/* Section: Company Description */}
      <div className="company-description">
        <h2>Who We Are</h2>
        <p>Bala Systems, established in 2005, is one of the leading computer dealers in Madurai. We specialize in laptop repair and services, computer hardware sales, video editing services, and much more. Our goal is to provide high-quality products and customer satisfaction, which has earned us a strong reputation in the region.</p>

        <div className="service-icons">
          <div className="service-item">
            <FaTools className="service-icon" />
            <h4>Laptop Repair & Services</h4>
            <p>We offer expert repair services for laptops, including hardware and software fixes.</p>
          </div>
          <div className="service-item">
            <FaServer className="service-icon" />
            <h4>Computer Dealers</h4>
            <p>We provide high-quality desktops, laptops, and servers from trusted brands.</p>
          </div>
          <div className="service-item">
            <FaVideo className="service-icon" />
            <h4>Video & Photo Editing Services</h4>
            <p>Professional editing services for videos and photos using advanced software.</p>
          </div>
        </div>

        <p>We are proud to offer a wide range of services and products, including:</p>
        <ul>
          <li>Laptop Repair & Services</li>
          <li>Laptop Dealers</li>
          <li>Computer Dealers</li>
          <li>Video Editing Services</li>
          <li>Photo Editing Services</li>
          <li>Apple Laptop Repair & Services</li>
          <li>Computer Server Part Repair & Services</li>
          <li>Video Editing Software Dealers</li>
        </ul>

        <div className="client-commitment">
          <h3>Our Commitment to Customers</h3>
          <p>At Bala Systems, customer satisfaction is our top priority. We have a team of dedicated professionals who are always available to help and support our clients. Whether you need tech support or are looking for a new computer or laptop, we're here for you!</p>
        </div>
      </div>

      {/* Section: Contact */}
      <div className="contact-us">
        <h3>Get in Touch</h3>
        <p>If you need assistance, feel free to reach out to us:</p>
        <p><strong>Phone:</strong> <FaPhoneAlt /> +91 98765 43210</p>
        <p><strong>Email:</strong> support@balasystems.com</p>
      </div>
    </div>
  );
};

export default AboutUs;
