import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/product';
import './ProductPage.css'; // Import the CSS for styling
import { auth } from '../config/firebase';
import { addToCart, getItemQuantity } from '../services/cart';

const ProductPage = () => {
  const { productId } = useParams(); // Retrieve the product ID from the URL
  const [product, setProduct] = React.useState(null);
  const [inCart, setInCart] = useState<number>(0); // Initialize with 0

  getItemQuantity(auth.currentUser?.uid, productId).then(quantity => setInCart(quantity));

  React.useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }



  const handleAddToCart = async () => {
    const userId = auth.currentUser?.uid;
    if (userId === '') {
      alert('You need to login first!');
    } else {
      await addToCart(userId, { id: product.id, name: product.name, quantity: 1 });
      setInCart((prevQuantity) => prevQuantity + 1); // Update state to reflect cart change
    }
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-company">Company: {product.company}</p>
        <p className="product-type">Type: {product.productType}</p>
        <p className="product-configuration">Configuration: {product.configuration}</p>
        <p className="product-bay-rack">Bay or Rack: {product.bayOrRack}</p>
        <p className="product-warranty">Warranty: {product.warranty}</p>
        <p className="product-price">Price: INR {product.price}</p>
        <p className="product-description">{product.description}</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">
          <i className="fas fa-cart-plus"></i> {/* Font Awesome cart icon */}
          <span>{inCart > 0 ? `In Cart (${inCart})` : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
