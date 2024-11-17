import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { To, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/images/icon.jpg'

const Navbar: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const isMobile = windowWidth < 768;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const hideSidebar = () => {
        setShowSidebar(false);
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

 

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                console.log('User signed up: ', userCredential.user);
                toggleModal();
            })
            .catch((error: { message: React.SetStateAction<string>; }) => {
                setError(error.message);
                console.error('Error signing up: ', error);
            });
    };

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                console.log('User signed in: ', userCredential.user);
                navigate("/add_product");
                toggleModal();
            })
            .catch((error: { message: React.SetStateAction<string>; }) => {
                setError(error.message);
                console.error('Error signing in: ', error);
            });
    };

    const handleNavigation = (path: To) => {
        navigate(path, { state: { searchQuery: searchQuery || '' } });
        hideSidebar();
    };

    return (
        <div className={`navbar navbarSpace ${isMobile ? 'mobile-navbar' : ''}`}>
            {isMobile?<button onClick={toggleSidebar} className="menu-button">
                <i className="fas fa-bars"></i>
            </button>:<></>}
            <img 
                src={Logo} 
                alt="Logo" 
                className="image" 
                onError={() => console.log('Error loading image')}
            />
            <button onClick={() => handleNavigation('/')} className="logo-container">
                <span className="logo">BALA SYSTEMS</span>
            </button>
            {(!isMobile || showSidebar) && (
                <div className={`menu-items ${showSidebar ? 'show-sidebar' : ''}`}>
                    {['Home', 'Shop', 'Shipping Policy', 'Privacy Policy', 'Refund Policy', 'Terms and Conditions'].map((item, index) => (
                        <HoverableMenuItem key={index} item={item} onPress={() => handleNavigation(`/${item.toLowerCase().replace(/ /g, '_')}`)} isSidebar={isMobile} />
                    ))}
                </div>
            )}
            <div className="icon-container">
                <button onClick={toggleSearch} className="icon-button">
                    <i className="fas fa-search"></i>
                </button>
                <button className="icon-button" onClick={() => navigate("/cart")}>
                    <i className="fas fa-heart"></i>
                </button>
                <button onClick={toggleModal} className="icon-button">
                    <i className="fas fa-user"></i>
                </button>
            </div>
            {showSearch && (
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-container">
                        <div className="modal-content">
                            <button onClick={toggleModal} className="close-button">
                                <i className="fas fa-times"></i>
                            </button>
                            <h2 className="modal-title">Sign In / Sign Up</h2>
                            {error && <p className="error-text">{error}</p>}
                            <input
                                type="email"
                                className="modal-input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="modal-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="button-container">
                                <button className="modal-button" onClick={handleSignIn}>Sign In</button>
                                <button className="modal-button" onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const HoverableMenuItem = ({ item, isSidebar, onPress }: { item: string; isSidebar: boolean; onPress: any }) => {
    const [hover, setHover] = useState(false);

    return (
        <div
            className={`menu-item-container ${isSidebar ? 'sidebar-item-container' : ''} ${hover ? 'hover' : ''}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <button onClick={onPress}>
                <span className={`menu-item ${isSidebar ? 'sidebar-item' : ''}`}>{item}</span>
            </button>
        </div>
    );
};

export default Navbar;
