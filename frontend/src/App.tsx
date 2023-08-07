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
import MyProducts from "./pages/user/MyProducts";
import ManageProducts from "./pages/admin/ManageProducts";
import VerifyEmail from "./pages/user/VerifyEmail";


interface RouteConfig {
  title: string;
  path: string;
  element: ReactElement;
}

function App() {
  const routes: RouteConfig[] = [
    { path: "account", title: 'Account', element: <Accounts /> },
    { path: "seller", title: 'Sell On enchanté', element: <SellerPanel /> },
    { path: "orders", title: 'Orders', element: <Orders /> },
    { path: "my-products", title: 'My Products', element: <MyProducts /> },
    { path: "inbox", title: 'Inbox', element: <Inbox /> },
    { path: "saved-items", title: 'Saved Items', element: <SavedItems /> },
  ];

  const adminRoutes: RouteConfig[] = [
    { path: "manage-products", title: 'Mananage Products', element: <ManageProducts /> }
  ];


  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/:id/verify/:token" element={<VerifyEmail />} />
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
          <Route
            path="/admin/*"
            element={
              <PrivateRoute
                Component={() => (
                  <Routes>
                    {adminRoutes.map((val) =>
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