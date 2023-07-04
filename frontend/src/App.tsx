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
import Accounts from "./pages/user/Accounts";
import SavedItems from "./pages/user/SavedItems";
import PrivateRoute from "./components/PrivateRoute";
import AccountLayout from "./components/AccountLayout";


function App() {



  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          {/* <Route path="/user/accounts" element={<PrivateRoute Component={<Layout><Accounts /></Layout>} />} /> */}
          {/* <Route path="/user/saved-items" element={<PrivateRoute Component={<Layout><SavedItems /></Layout>} />} /> */}



          {/* <Route
            path="/user"
            element={
              <PrivateRoute
                Component={() => (
                  <Route path="accounts" element={<Layout><Accounts /></Layout>} />
                )}
                isAuthenticated={isAuthenticated}
                redirectPath="/auth/login"
              />
            }
          /> */}

          <Route path="/user/account" element={
            <Layout>
              <AccountLayout title={"My Account"}>
                <Accounts />
              </AccountLayout>
            </Layout>}
          />
          <Route path="/user/saved-items" element={<Layout><SavedItems /></Layout>} />
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

export default App;