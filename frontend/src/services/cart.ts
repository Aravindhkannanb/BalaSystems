import { db } from '../config/firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

// Add item to cart
export const addToCart = async (userId, item) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    // Cart exists, update it
    const cartData = cartSnap.data();
    const itemIndex = cartData.items.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex > -1) {
      // Update quantity if item already exists
      cartData.items[itemIndex].quantity += item.quantity;
    } else {
      // Add new item
      cartData.items.push(item);
    }

    await updateDoc(cartRef, { items: cartData.items });
  } else {
    // Create a new cart if it doesn't exist
    await setDoc(cartRef, { items: [item] });
  }
};

// Get product details by IDs
const getProductDetails = async (productIds) => {
  const productsRef = collection(db, 'Products');
  const productSnapshots = await getDocs(productsRef);
  const products = productSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return productIds.map(id => products.find(product => product.id === id));
};

// Get cart items with product details
export const getCartItems = async (userId) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartItems = cartSnap.data().items;
    const productIds = cartItems.map(item => item.id);
    const products = await getProductDetails(productIds);

    return cartItems.map(cartItem => {
      const product = products.find(product => product.id === cartItem.id);
      return { ...cartItem, ...product }; // Combine cart item with product details
    });
  } else {
    return [];
  }
};

// Get quantity of a specific item in the cart
export const getItemQuantity = async (userId, itemId) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data();
    const item = cartData.items.find(item => item.id === itemId);

    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

// Remove item from cart
export const removeFromCart = async (userId, itemId) => {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data();
    const updatedItems = cartData.items.filter(item => item.id !== itemId);
    await updateDoc(cartRef, { items: updatedItems });
  }
};
