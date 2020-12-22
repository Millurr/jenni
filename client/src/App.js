import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import UserContext from "./context/UserContext";

// Admin pages
import ManageInventory from "./components/pages/admin/ManageInventory";
import ManageUsers from './components/pages/admin/ManageUsers';
import AllTransactions from './components/pages/admin/AllTransactions';

// Auth pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Users pages
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Gallery from "./components/pages/Gallery";
import Store from './components/pages/Store';
import CartPage from './components/pages/CartPage';
import CheckOut from './components/pages/CheckOut';
import Success from './components/pages/Success';
import Cart from './components/layouts/Cart';
import AccountSettings from './components/layouts/AccountSettings';
import OrderHistory from './components/pages/OrderHistory';
import UserAccount from './components/pages/UserAccount';

import "./style.css";

export default function App() {

  const [userData, setUserData] = useState({
    token: localStorage.getItem('auth-token') ?? undefined,
    user: undefined,
  });

  const [options, setOptions] = useState(false);
  let [cart, setCart] = useState([]);

  let localCart = localStorage.getItem("cart");

  useEffect(() => {
    localCart = JSON.parse(localCart);
    // if (localCart) setCart(localCart);
    if (localCart) {
        let toShow = [];
        const getInv = async () => {
            localCart.forEach(async inv => {
                const cartInv = await Axios.get('/inventory/items/'+inv._id);
                cartInv.data.count = inv.count;
                toShow.push(cartInv.data);
                setCart(toShow);
            }
            )
        }
        getInv();
    };
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
  
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      try {
        const tokenResponse = await Axios.post(
          "/users/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );
  
        
        if (tokenResponse.data) {
          const userRes = await Axios.get("/users/", {
            headers: { "x-auth-token": token },
          });
          setUserData({
            token,
            user: userRes.data,
          });
        }
      } catch(err) {
        console.log(err);
      }
      
    };
    checkLoggedIn()
    // const timer = setTimeout(() => {
    //   checkLoggedIn();
    // }, 1000);
    // return () => clearTimeout(timer);
  }, [localCart]);

  const addItem = (item) => {
      let cartCopy = [...cart];

      if (item.count <= 0) return;

      let {_id} = item;

      let existingItem = cartCopy.find(cartItem => cartItem._id == _id);

      if (existingItem) {
          if (existingItem.count < item.count) existingItem.count += 1;
          else alert("You have reached the max inventory of this item. Please edit in cart to remove.");
      } else {
          cartCopy.push({
              '_id': item._id,
              'count': 1
          });
      }

      setCart(cartCopy);

      let stringCart = JSON.stringify(cartCopy);
      localStorage.setItem("cart", stringCart);
  }

  const removeItem = (itemId) => {
      let cartCopy = [...cart];

      cartCopy = cartCopy.filter(item => item._id != itemId);

      setCart(cartCopy);

      let copyCopyCart = [];

      // This loops prevents price and unessesary vaialbes being stored locally
      for (let i=0; i<cartCopy.length; i++) {
          copyCopyCart.push({'_id': cartCopy[i]._id, 'count': cartCopy[i].count});
      }

      let cartString = JSON.stringify(copyCopyCart);

      localStorage.setItem("cart", cartString);
  }

  const editItem = async (itemId, amount) => {
      let cartCopy = [...cart]

      let existingItem = cartCopy.find(item => item._id == itemId);

      if (!existingItem) return;

      const maxCheck = await Axios.get('/inventory/items/'+itemId);

      const max = maxCheck.data.count;

      // make sure the user can not exceed the inventory
      if (existingItem.count < max) existingItem.count += amount;
      else if (existingItem.count >= max) {
          if (amount < 0) existingItem.count += amount;
          else existingItem.count = max;
      }
      
      // make sure the user does not go less than zero
      if (existingItem.count <= 1) {
          if (amount > 0) existingItem.count += amount;
          else existingItem.count = 1;
      }

      setCart(cartCopy);

      let copyCopyCart = [];

      // This loops prevents price and unessesary vaialbes being stored locally
      for (let i=0; i<cartCopy.length; i++) {
          copyCopyCart.push({'_id': cartCopy[i]._id, 'count': cartCopy[i].count});
      }

      let cartString = JSON.stringify(copyCopyCart);

      localStorage.setItem('cart', cartString);
  }

  const removeCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header setOptions={(val) => setOptions(val)} current={options} />
        {(cart.length === 0) || (cart === undefined) ? <></> : <Cart style={{padding:'10px'}} count={cart.length}/> }
        {options ? <AccountSettings setOptions={() => setOptions(false)} /> : <></>}
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact}/>
            <Route path="/gallery" component={Gallery}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/manageinv" component={ManageInventory} />
            <Route path="/store" render={(props) => <Store addItem={(item) => addItem(item)} />}/>
            <Route path="/cartpage" render={(props) => <CartPage cart={cart} editItem={(item, v) => editItem(item, v)} removeItem={(item, v) => removeItem(item, v)} removeCart={() => removeCart()}/>}/>
            <Route path="/success" render={(props) => <Success removeCart={() => removeCart()} />}/>
            <Route path="/orderhistory" component={OrderHistory} />
            <Route path="/useraccount" render={(props) => <UserAccount />}/>
            <Route path="/manageusers" render={(props) => <ManageUsers />}/>
            <Route path="/alltrans" render={(props) => <AllTransactions />}/>
            <Route path="/checkout" render={(props) => <CheckOut removeCart={() => removeCart()} />}/>
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
