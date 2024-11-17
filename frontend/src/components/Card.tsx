import React, { useState, useEffect } from 'react';
import { addToCart, getCartItems } from '../services/cart'; // Import your cart service functions
import './Card.css';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  bayOrRack: string;
  company: string;
  configuration: string;
  imageUrl: string;
  name: string;
  price: string;
  productType: string;
  type: string;
  warranty: string;
}

const ProductCard = ({ product, userId }: { product: Product; userId: string }) => {
  const [inCart, setInCart] = useState<number>(0); // Initialize with 0
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        const cartItems = await getCartItems(userId);
        const item = cartItems.find((item: { id: string }) => item.id === product.id);
        if (item) {
          setInCart(item.quantity);
        }
      }
    };

    fetchCartItems();
  }, [userId, product.id]);

  const handleAddToCart = async () => {
    if (userId === '') {
      alert('You need to login first!');
    } else {
      await addToCart(userId, { id: product.id, name: product.name, quantity: 1, price:product.price });
      setInCart((prevQuantity) => prevQuantity + 1); // Update state to reflect cart change
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-card-media" onClick={()=>navigate('/product/'+product.id)} />
      <div className="product-card-content">
        <div className="product-card-title" onClick={()=>navigate('/product/'+product.id)}>{product.name}</div>
        <div className="product-card-text">Company: {product.company}</div>
        <div className="product-card-text">Type: {product.productType}</div>
        <div className="product-card-text">Configuration: {product.configuration}</div>
        <div className="product-card-text">Bay or Rack: {product.bayOrRack}</div>
        <div className="product-card-text">Warranty: {product.warranty}</div>
        <div className="product-card-text">Price: INR {product.price}</div>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          <i className="fas fa-cart-plus"></i> {/* Font Awesome cart icon */}
          <span>{inCart > 0 ? `In Cart (${inCart})` : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
