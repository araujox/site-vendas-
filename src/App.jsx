
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import HomePage from '@/pages/HomePage.jsx';
import ShopPage from '@/pages/ShopPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import ShoppingCartPage from '@/pages/ShoppingCartPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import AdminLoginPage from '@/pages/admin/LoginPage.jsx';
import AdminLayout from '@/components/admin/AdminLayout.jsx';
import DashboardPage from '@/pages/admin/DashboardPage.jsx';
import ProductsPage from '@/pages/admin/ProductsPage.jsx';
import CouponsPage from '@/pages/admin/CouponsPage.jsx';
import OrdersPage from '@/pages/admin/OrdersPage.jsx';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="coupons" element={<CouponsPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
