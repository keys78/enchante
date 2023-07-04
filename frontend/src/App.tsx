import { ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
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
import AccountLayout from "./components/containers/AccountLayout";
import Layout from "./components/containers/Layout";
import PrivateRoute from "./components/containers/PrivateRoute";
import SellerPanel from "./pages/user/SellerPanel";
import Orders from "./pages/user/Orders";
import Inbox from "./pages/user/Inbox";


interface RouteConfig {
  title: string;
  path: string;
  element: ReactElement;
}

function App() {
  const routes: RouteConfig[] = [
    { path: "account", title: 'My Account', element: <Accounts /> },
    { path: "seller", title: 'Sell On enchante', element: <SellerPanel /> },
    { path: "my-orders", title: 'My Orders', element: <Orders /> },
    { path: "inbox", title: 'Inbox', element: <Inbox /> },
    { path: "saved-items", title: 'Saved Items', element: <SavedItems /> },
  ];


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
          <Route
            path="/user/*"
            element={
              <PrivateRoute
                Component={() => (
                  <Routes>
                    {routes.map((val) =>
                      <Route path={val.path} element={<Layout><AccountLayout title={val.title}>{val.element}</AccountLayout></Layout>} />
                    )}
                  </Routes>
                )}
              />
            }
          />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>
    </>

  )
}

export default App;