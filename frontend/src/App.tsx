import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Layout from './components/Layout'
import Cart from "./pages/Cart";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout-success" element={<Layout><CheckoutSuccess /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
