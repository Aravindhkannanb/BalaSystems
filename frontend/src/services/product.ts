import { db } from '../config/firebase';
import { collection, getDoc, doc, getDocs } from 'firebase/firestore';

// Get product by ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, 'Products', productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data().data[0] };
    } else {
      console.error('No such product!');
      return null;
    }
  } catch (error) {
    console.error('Error getting product:', error);
    throw new Error('Failed to fetch product');
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const productsCollectionRef = collection(db, 'Products');
    const productsSnapshot = await getDocs(productsCollectionRef);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data().data[0]
    }));
    return productsList;
  } catch (error) {
    console.error('Error getting products:', error);
    throw new Error('Failed to fetch products');
  }
};
