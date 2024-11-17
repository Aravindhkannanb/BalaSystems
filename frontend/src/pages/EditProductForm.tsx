import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';
import './AddProduct.css';
import Sidebar from './Sidebar';

const EditProductForm = () => {
    const [form, setForm] = useState({
        productType: 'Server',
        bayOrRack: '',
        company: '',
        configuration: '',
        name: '',
        price: '',
        type: '',
        warranty: '',
        imageUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'Products', productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setForm(docSnap.data().data[0]);  // Assuming `data` is an array
                } else {
                    console.error('No such document!');
                    navigate('/manage-products');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId, navigate]);

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const { ...productData } = form;

        if (imageFile) {
            const storage = getStorage();
            const storageRef = ref(storage, `product-images/${imageFile.name}`);
            try {
                const snapshot = await uploadBytes(storageRef, imageFile);
                const downloadURL = await getDownloadURL(snapshot.ref);
                productData.imageUrl = downloadURL;
            } catch (error) {
                console.error('Error uploading image: ', error);
                alert('Failed to upload image.');
                setLoading(false);
                return;
            }
        }

        try {
            const docRef = doc(db, 'Products', productId);
            await updateDoc(docRef, {
                data: [productData]  // Assuming `data` is an array
            });
            alert('Product updated successfully.');
            navigate('/manage-products');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
        setLoading(false);
    };

    return (
        <>
            <Sidebar />
            <div className="container">
                <div className="card">
                    <h2 className="heading">Edit Product</h2>
                    <div className="inputContainer">
                        <label>Product Type:</label>
                        <Select
                            options={[{ label: 'Server', value: 'Server' }, { label: 'Workstation', value: 'Workstation' }]}
                            onChange={(option) => handleChange('productType', option.value)}
                            value={{ label: form.productType, value: form.productType }}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Bay or Rack:</label>
                        <Select
                            options={form.productType === 'Server' ? [
                                { label: '2_BAY_NAS', value: '2_BAY_NAS' },
                                { label: '3_BAY_NAS', value: '3_BAY_NAS' },
                                { label: '4_BAY_NAS', value: '4_BAY_NAS' },
                            ] : [
                                { label: 'Rack', value: 'Rack' },
                                { label: 'Blade', value: 'Blade' },
                                { label: 'Tower', value: 'Tower' },
                            ]}
                            onChange={(option) => handleChange('bayOrRack', option.value)}
                            value={{ label: form.bayOrRack, value: form.bayOrRack }}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Company:</label>
                        <Select
                            options={[{ label: 'Company A', value: 'Company A' }, { label: 'Company B', value: 'Company B' }]}  // Replace with dynamic data
                            onChange={(option) => handleChange('company', option.value)}
                            value={{ label: form.company, value: form.company }}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Configuration:</label>
                        <input
                            className="input"
                            value={form.configuration}
                            onChange={(e) => handleChange('configuration', e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Name:</label>
                        <input
                            className="input"
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Price:</label>
                        <input
                            className="input"
                            value={form.price}
                            onChange={(e) => handleChange('price', e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Type:</label>
                        <input
                            className="input"
                            value={form.type}
                            onChange={(e) => handleChange('type', e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Warranty:</label>
                        <input
                            className="input"
                            value={form.warranty}
                            onChange={(e) => handleChange('warranty', e.target.value)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Product Image:</label>
                        <input type="file" onChange={handleImageChange} />
                        {form.imageUrl && <img src={form.imageUrl} alt="Product" className="productImagePreview" />}
                    </div>
                    <button onClick={handleSubmit} className="button" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Product'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditProductForm;
