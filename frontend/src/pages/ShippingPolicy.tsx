import { useNavigate } from 'react-router-dom';
import './ShippingPolicy.css';

const ShippingPolicy = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    
    navigate('/');
  };

  return (
    <div >
      <div className="popup">
        <button onClick={handleClose} className="closeButton">
          X
        </button>
        <div className="contentContainer">
          <h1 className="heading">Shipping Policy</h1>
          <p className="text">
            We ship from Coimbatore, Tamil Nadu. Our shipping details are as follows:
          </p>
          <p className="text">
            - <span className="bold">Within Tamil Nadu:</span> Guaranteed home delivery within 24 working hours via ST Couriers.
          </p>
          <p className="text">
            - <span className="bold">South India:</span> Delivery within 2-3 working days via DTDC Couriers.
          </p>
          <p className="text">
            - <span className="bold">North India:</span> Delivery within 3-4 working days via DTDC Couriers.
          </p>
          <p className="text">
            - <span className="bold">International Delivery:</span> We do not offer international shipping at this time.
          </p>
          <h2 className="subheading">Shipping Queries Contact:</h2>
          <p className="text">
            For any shipping-related queries, please contact Mani at +91-9786370374.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
