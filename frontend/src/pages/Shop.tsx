import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

import './Shop.css'
import ProductCard from '../components/Card';
import SearchBar from '../components/SearchBar';

interface product  {
    id: string,
    bayOrRack: string,
    company: string,
    configuration: string,
    imageUrl: string,
    name: string,
    price: string,
    productType: string,
    type: string,
    warranty: string
}

const Shop = () => {
    const { companyName } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    const [products, setProducts] = useState<product[]>([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsQuery = collection(db, 'Products');
                const productsSnapshot = await getDocs(productsQuery);
                const productsData: product[] = [];
                
                productsSnapshot.forEach((document) => {
                    productsData.push({id: document.id, ...document.data().data[0]});
                });
                setProducts(productsData);

            } catch (error) {
                console.log('Error fetching data: ', error);
            } 
        };

        fetchData();
    }, []);


    const handleFilterChange = (category: string) => {
        navigate('/shop/'+category);
    };

    const handleTypeChange = (category: string) => {
        setFilter(category);
    };

    const handleSortChange = (sortBy: string) => {
        setSort(sortBy);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const filteredProducts = products.filter((product) => {
        const companyNameMatch = companyName ? product.company.toLowerCase().includes(companyName.toLowerCase()) : true;
        const productTypeMatchCompanyName = companyName ? product.productType.toLowerCase().includes(companyName.toLowerCase()) : true;
        
        const filterMatch = filter ? product.productType.toLowerCase().includes(filter.toLowerCase()) || product.company.toLowerCase().includes(filter.toLowerCase()) : true;
        
        const searchQueryMatch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.productType.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        
        return (companyNameMatch || productTypeMatchCompanyName) && filterMatch && searchQueryMatch;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sort === 'price-asc') {
            return parseFloat(a.price) - parseFloat(b.price);
        } else if (sort === 'price-desc') {
            return parseFloat(b.price) - parseFloat(a.price);
        }
        return 0;
    });

    return (
        <div style={{display: 'flex', marginTop: '1rem',  flexDirection: 'column' }}>
            
            <SearchBar onTypeChange={handleTypeChange} onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} onSortChange={handleSortChange} />
            <div style={{ flex: 1, paddingTop: '20px' }}>
                <h1>Products from {companyName}</h1>
                <div className='products-container'> 
                {sortedProducts.map((product, index) => (
                    <ProductCard key={index} userId={auth.currentUser? auth.currentUser.uid:""} product={product} />
                ))}
                </div>

            </div>
        </div>
    );
};

export default Shop;
