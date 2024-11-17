import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart } from '../services/cart';
import './Cart.css'; // Import the CSS for styling
import { auth } from '../config/firebase';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";


const Cart = () => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0); 
  const tprice = totalPrice*100;

  const [prod,setProd] = useState({
    name:"laptop",
    price : 2000*100,
    productBy :"Balasystems" 
  });

  const makePayment = (token)=>{
      const body = {
        token,
        tprice
      };
      const headers = {
        "Content-Type":"application/json"
      };
      return fetch("http://localhost:5000/payment",
        {method:"POST",
        headers:headers,
        body:JSON.stringify(body)
        }).then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        });
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserId(currentUser.uid);
      } else {
        navigate('/home');
        return;
      }

      // Fetch cart items once userId is set
      const fetchCartItems = async () => {
        if (currentUser) {
          const cartItems = await getCartItems(currentUser.uid);
          setItems(cartItems);

          const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          setTotalPrice(total);
        }
      };

      await fetchCartItems();
      setLoading(false); // Stop loading once cart items are fetched
    };

    checkAuthStatus();

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/home');
      }
    });

    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  const handleRemoveItem = async (itemId) => {
    if (userId) {
      await removeFromCart(userId, itemId);
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Display loading indicator
  }

  return (
    <div>
      <Sidebar />
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        {items.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {items.map(item => (
              <div className="cart-item" key={item.id} onClick={() => navigate('/product/' + item.id)}>
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  <p className="cart-item-price">INR {item.price}</p>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                    <i className="fas fa-trash-alt"></i> {/* Font Awesome trash icon */}
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="cart-footer">
            <StripeCheckout
            name='Balasystems Products'
            amount={tprice}
            currency='INR'
            token={makePayment}
            stripeKey='pk_test_51PwRaRElGfOXsG9dMlf4Nsqvmo2jPuDcagspoLXxQ1wdhFJzFaGK9It0BKiC88iSyuIy5DJekW63wjc7uOIdXTdB00zjunJk0Q'
            >
              <button className="checkout-button">
              <i className="fas fa-credit-card"></i> 
               Checkout
               </button>
            </StripeCheckout>
        </div>
      </div>
    </div>
  );
};

export default Cart;
