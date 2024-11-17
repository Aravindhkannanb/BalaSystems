import React, { useEffect, useState } from 'react';
import { addDoc, arrayUnion, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../config/firebase';
import Select from 'react-select';
import './AddProduct.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
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
    const [companies, setCompanies] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if(auth.currentUser?.email!=="hariharanvj2003@gmail.com"){
            navigate('/home')
        }
        const getData = async () => {
            const companiesQuery = collection(db, 'Companies');
            const companiesSnapshot = await getDocs(companiesQuery);
            const companiesData = [];
            companiesSnapshot.forEach((docSnap) => {
                companiesData.push({ id: docSnap.id, name: docSnap.data().name });
            });
            setCompanies(companiesData);
        };
        getData();

        const getProductTypes = async () => {
            const typesQuery = collection(db, 'ProductTypes');
            const typesSnapshot = await getDocs(typesQuery);
            const typesData = [];
            typesSnapshot.forEach((docSnap) => {
                typesData.push({ id: docSnap.id, type: docSnap.data().type });
            });
            setTypes(typesData);
        };
        getProductTypes();
    }, []);

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
            const docRef = await addDoc(collection(db, 'Products'), {
                data: arrayUnion(productData)
            });
            alert('Product added successfully with ID: ' + docRef.id);
        } catch (error) {
            console.error('Error adding product: ', error);
            alert('Failed to add product.');
        }
        setLoading(false);
    };

    return (<>
            <Sidebar />
    
        <div className="container">
            <div className="card">
                <h2 className='heading'>Add Product</h2>
                <div className="inputContainer">
                    <label>Product Type:</label>
                    <Select
                        options={types.map(type => ({ label: type.type, value: type.type }))}
                        onChange={(option) => handleChange('productType', option.value)}
                        value={{ label: form.productType, value: form.productType }}
                    />
                    
                </div>
                <div className="inputContainer">
                    <label>Bay or Rack:</label>
                    <Select
                        options={
                            form.productType === 'Server'
                                ? [
                                    { label: '2_BAY_NAS', value: '2_BAY_NAS' },
                                    { label: '3_BAY_NAS', value: '3_BAY_NAS' },
                                    { label: '4_BAY_NAS', value: '4_BAY_NAS' },
                                ]
                                : [
                                    { label: 'Rack', value: 'Rack' },
                                    { label: 'Blade', value: 'Blade' },
                                    { label: 'Tower', value: 'Tower' },
                                ]
                        }
                        onChange={(option) => handleChange('bayOrRack', option.value)}
                        value={{ label: form.bayOrRack, value: form.bayOrRack }}
                    />
                </div>
                <div className="inputContainer">
                    <label>Company:</label>
                    <Select
                        options={companies.map(company => ({ label: company.name, value: company.name }))}
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button className="button" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </div>
        </div>
    </>

    );
};

export default AddProductForm;
