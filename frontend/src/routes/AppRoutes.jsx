// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*---------------------------- My Components -------------------------------*/
import { MenuProvider } from "../context/MenuContext";
import CategoryPage from "../Pages/CategoryPage";
import MenuPage from "../Pages/MenuPage";
import MenuItemDetails from "../Pages/MenuItemDetail";
import Home from "../Pages/Home";
import Cart from "../Components/Cart";
import OrderConfirmation from "../Pages/OrderConfirmation";

import OrderList from "../Components/OrderList";
import OrderHistory from "../Pages/OrderHistory";
import AdminPage from "../Pages/Admin";
import ReservationsPage from "../Pages/ReservationsPage";
import TablesPage from "../Pages/TablesPage";

import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import CouponPage from "../Pages/CouponPage";
import NotificationPage from "../Pages/NotificationPage";
import ProfilePage from "../Pages/ProfilPage";
import PromotionPage from "../Pages/PromotionPage";
import LoginHistoryPage from "../Pages/LoginHistoryPage";

import ReviewList from "../Components/ReviewList";
import AddressList from "../Components/AddressList";
import ReviewForm from "../Components/ReviewForm"; 
import ReviewImageUpload from "../Components/ReviewImageUpload"; 
import ReviewTagManager from "../Pages/TagMananger"; 
import TagList from "../Components/TagList";
import ReservationList from "../Components/ReservationList";
import ReservationDetail from "../Components/ReservationDetail"

import AboutUs from "../Pages/AboutUs"
import ContactUs from "../Pages/ContactPage";

import SearchResults from "../Pages/SearchResults";
import CheckOutPage from "../Pages/CheckOutPage"; 
import AIChat from "../Components/AIChat";

const AppRoutes = () => {
  return (
    <Router>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<CategoryPage />} />
          <Route path="/menu/categories/:categoryId/menu-items/" element={<MenuPage />} />
          <Route path="/menu-item/:id/" element={<MenuItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          
          <Route path="/admin/orders" element={<OrderList />} /> 
          <Route path="/admin/order-history" element={<OrderHistory />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route path="/admin/addresses" element={<AddressList />} />  
          <Route path="/admin/reviews" element={<ReviewList />} />  
          <Route path="/admin/review-form" element={<ReviewForm />} />
          <Route path="/admin/review-image-upload/:reviewId" element={<ReviewImageUpload />} />
          <Route path="/admin/review-tag-manager/:reviewId" element={<ReviewTagManager />} />
          <Route path="/admin/tags" element={<TagList />} />
          
          <Route path="/user-reservations" element={<ReservationsPage />} />
          <Route path="/admin/all-reservations" element={<ReservationList />} />
          <Route path="/reservation/:reservationId" element={<ReservationDetail />} />
          <Route path="/tables" element={<TablesPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/coupons" element={<CouponPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/promotions" element={<PromotionPage />} />
          <Route path="/login-history" element={<LoginHistoryPage />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          <Route path="/search" element={<SearchResults />} />
          <Route path="/checkout/:orderId" element={<CheckOutPage />} />
          <Route path="/ai-chat" element={<AIChat />} />

         
        </Routes>
      </MenuProvider>
    </Router>
  );
};

export default AppRoutes;
