import './App.css';
import { useEffect, useState } from 'react';
import Header from "./component/layout/Header/Header"
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import Profile from "./component/User/Profile.js";
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/payment.js";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetail from "./component/Order/OrderDetails.js"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct.js"
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from "./component/Admin/OrderList.js"
import ProcessOrder from "./component/Admin/ProcessOrder.js"
import UsersList from "./component/Admin/UsersList.js"
import UpdateUser from "./component/Admin/UpdateUser.js"
import ProductReviews from "./component/Admin/ProductReviews.js"
import NotFound from './component/layout/NotFound/NotFound';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import CashOnDelivery from './component/Cart/CashOnDelivery';



function App() {
  const {isAuthenticated, user} = useSelector((state)=>state.user);

  const [stripeApiKey, setStripeApiKey]= useState("");
  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  window.addEventListener("contextmenu",(e)=>e.preventDefault());
  return (<>
    <Router>
    
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
          <Route exact path="/process/payment" element={<Payment/>} />
          <Route exact path="/process/CashOnDelivery" element={<CashOnDelivery/>} />
          </Routes>
        </Elements>
      )}
      <Routes>
      <Route exact path="/password/forgot" element={<ForgotPassword/>} />

      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      {/* <Route exact path="/process/payment" element={<Payment/>} /> */}
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/product/:id" element={<ProductDetails/>} />
      <Route exact path='/products' element={<Products/>} />
      <Route path='/products/:keyword' element={<Products/>} />
      {/* <Route exact path='/search?products=/:keyword' element={<Products/>} /> */}      
      <Route exact path="/search" element={<Search/>} />

      <Route exact path='/cart' element={<Cart/>}/>
      <Route exact path='/login' element={<LoginSignUp/>}/>
      <Route  exact path='/password/update' component = {<UpdatePassword/>}/>
      <Route exact path='/account' element={<Profile/>}/>
      <Route exact path='/me/update'element={<UpdateProfile/>}/>    
      <Route exact path='/shipping' element={<Shipping/>}/>
      <Route exact path='/success' element={<OrderSuccess/>} />
      <Route exact path='/orders' element={<MyOrders/>}/>
      <Route exact path='/order/:id' element={<OrderDetail/>}/>
      <Route exact path='/order/confirm' element={<ConfirmOrder/>} />
      <Route exact path='/admin/dashboard' element={<Dashboard/>}/>
      <Route exact path='/admin/products' element={<ProductList/>}/>
      <Route exact path='/admin/product' element={<NewProduct/>}/>
      <Route exact path='/admin/product/:id' element={<UpdateProduct/>}/>
      <Route exact path='/admin/orders' element={<OrderList/>}/>
      <Route exact path='/admin/order/:id' element={<ProcessOrder/>}/>
      <Route exact path='/admin/users' element={<UsersList/>}/>
      <Route exact path='/admin/user/:id' element={<UpdateUser/>}/>
      <Route exact path='/admin/reviews' element={<ProductReviews/>}/>
      
      <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Routes>
      <Footer/>
      
    </Router>
     
   
    </>
   
  );
}

export default App; 
