import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import Sidebar from './Sidebar';
import './ManageProducts.css';
import { useNavigate } from 'react-router-dom';

// Define the type for the product data structure
interface Product {
    id: string;
    data: {
        imageUrl?: string;
        name: string;
        company: string;
        type: string;
        price: number;
    }[];
}

const ManageProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsQuery = collection(db, 'Products');
                const productsSnapshot = await getDocs(productsQuery);
                const productsData = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data().data as DocumentData[], // Explicitly cast to an array of DocumentData
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleEdit = (productId: string) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleDelete = async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'Products', productId));
                setProducts(products.filter((product) => product.id !== productId));
                alert('Product deleted successfully.');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product.');
            }
        }
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <>
            <Sidebar />
            <div className="container">
                <h2 className="heading">Manage Products</h2>
                <div className="productsList">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="productCard">
                                <img src={product.data[0]?.imageUrl} alt={product.data[0]?.name} className="productImage" />
                                <h3>{product.data[0]?.name}</h3>
                                <p>Company: {product.data[0]?.company}</p>
                                <p>Type: {product.data[0]?.type}</p>
                                <p>Price: INR {product.data[0]?.price}</p>
                                <button onClick={() => handleEdit(product.id)} className="button">Edit</button>
                                <button onClick={() => handleDelete(product.id)} className="button deleteButton">Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ManageProductsPage;
