import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./admin";
import AdminProductsPage from "./admin/pages/ProductsPage";
import { useSelector } from "react-redux";
import GenPDF from "./admin/generateQr";
import AdminLoginPage from "./admin/pages/LoginPage";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const AuthLayout = () => {
    if (userInfo) {
      return <Outlet />; // or loading indicator, etc...
    } else {
      return <Navigate to={"/login"} replace />;
    }
  };

  const AdminAuthLayout = () => {
    if (userInfo && userInfo.isAdmin) {
      return <Outlet />; // or loading indicator, etc...
    } else {
      return <Navigate to={"/admin/login"} replace />;
    }
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/generate/pdf" element={<GenPDF />} />
          <Route element={<AuthLayout />}>
            <Route path="/checkout/pay" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Router>
      {/* Dashboard Routes */}
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminAuthLayout />}>
            <Route path="/admin/" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
