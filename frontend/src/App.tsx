import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Layout from './components/Layout'
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Catalog from "./pages/Catalog";


function App() {

  return (
  <>
  <Router>
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/catalog" element={<Layout><Catalog /></Layout>} />
      <Route path="/products/product-details/:id" element={<Layout><ProductDetails /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/checkout-success" element={<Layout><CheckoutSuccess /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  </Router>
</>

  )
}

export default App
