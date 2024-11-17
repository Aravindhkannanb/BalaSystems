import { Routes, Route, useNavigate, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import AddProductForm from "./pages/AddProduct"
import Shop from "./pages/Shop"
import ShippingPolicy from "./pages/ShippingPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import RefundPolicy from "./pages/RefundPolicy"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import ProductPage from "./pages/ProductPage"
import ManageProductsPage from "./pages/ManageProductPage"
import EditProductForm from "./pages/EditProductForm"
const Router = () => {
  return (
    <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route  path='/' element = {<Home />} />
                <Route  path='/home' element = {<Home />} />
                <Route path='/add_product' element = {<AddProductForm />} />
                <Route path="/shop/:companyName" element={<Shop />} />
                <Route path="/shop/category/:companyName" element={<Shop />} />
                
                <Route path="/shop" element={<Shop />} />
                <Route path="/shipping_policy" element={<ShippingPolicy />} />
                <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
                <Route path="/refund_policy" element={<RefundPolicy />} />
                <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:productId" element={<ProductPage />} />

                <Route path="/manage-products" element={<ManageProductsPage />} />
                <Route path="/edit-product/:productId" element={<EditProductForm />} />


            </Routes>
    </>
  )
}

export default Router