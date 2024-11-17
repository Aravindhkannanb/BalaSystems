import React, {useState, useEffect} from 'react'
import CarouselComponent from '../components/Carousel'
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import './Home.css'

import OfferZone from '../assets/images/offerzone.jpg';
import Dell from '../assets/images/dell.jpg'
import Acer from '../assets/images/acer.jpg';
import Hp from '../assets/images/hp.jpg';
import Lenovo from '../assets/images/lenovo.jpg';
import ProductCard from '../components/Card';

interface product  {
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
const Home: React.FC = () => {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      
        try {
             
            const productsQuery = collection(db, 'Products');

            const productsSnapshot = await getDocs(productsQuery);

            const productsData: product[] = [];
            
            productsSnapshot.forEach((document) => {
              console.log(document.data().data[0]);
              productsData.push({id: document.id, ...document.data().data[0]});

            });
            setProducts(productsData);

        } catch (error) {

            console.log('Error fetching data: ', error);
        } 
    };

    fetchData();
}, []);
  
  return (
    <div>

      <CarouselComponent />
      <h1 className='title'>SHOP BY CATEGORIES</h1>
      <ShowByCategory />
      <h1 className='title'>OUR PRODUCTS</h1>
      <div className='products-container'>
        {products.map((product, index)=> 
                    <ProductCard key={index} userId={auth.currentUser? auth.currentUser.uid:""} product={product} />
        
        )}
      </div>

    </div>
  )
}


const ShowByCategory = () => {
    const navigate = useNavigate();

    return (
        <div className="outerContainer">
            <div className="offerZoneContainer">
                <div
                    onClick={() => navigate("/shop", { state: { company: "DELL" } })}

                    className="cardImage"
                    style={{ backgroundImage: "url(" + OfferZone + ")"}}

                >
                    <div className="textOverlay">
                        <span className="overlayText">Offer Zone</span>
                    </div>
                </div>
            </div>
            <div className="productContainer">
                <div className="productRow">
                    <div
                        className="cardImage1"
                        style={{ backgroundImage: "url(" + Dell + ")"}}

                        onClick={() => navigate("/shop/Dell", { state: { company: "DELL" } })}
                    >
                        <div className="textOverlay">
                            <span className="overlayText">Dell</span>
                        </div>
                    </div>
                    <div
                        className="cardImage1"
                        style={{ backgroundImage: "url(" + Hp + ")"}}
                        onClick={() => navigate("/shop/HP", { state: { company: "HP LAPTOPS" } })}
                    >
                        <div className="textOverlay">
                            <span className="overlayText">HP</span>
                        </div>
                    </div>
                </div>
                <div className="productRow">
                    <div
                        className="cardImage1"
                        style={{ backgroundImage: "url(" + Acer + ")"}}
                        onClick={() => navigate("/shop/Acer", { state: { company: "Server" } })}
                    >
                        <div className="textOverlay">
                            <span className="overlayText">Server</span>
                        </div>
                    </div>
                    <div
                        className="cardImage1"
                        style={{ backgroundImage: "url(" + Lenovo + ")"}}
                        onClick={() => navigate("/shop/Lenovo", { state: { company: "Apple" } })}
                    >
                        <div className="textOverlay">
                            <span className="overlayText">Apple</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Home