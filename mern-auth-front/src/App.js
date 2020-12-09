import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import UserContext from "./context/UserContext";

import Home from "./components/pages/Home";
import ManageInventory from "./components/pages/admin/ManageInventory";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/layouts/Header";
import Store from './components/pages/Store';
import CheckOut from './components/pages/CheckOut';

import "./style.css";

export default function App() {

  const [userData, setUserData] = useState({
    token: localStorage.getItem('auth-token') ?? undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
  
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      try {
        const tokenResponse = await Axios.post(
          "http://localhost:5000/users/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );
  
        
        if (tokenResponse.data) {
          const userRes = await Axios.get("http://localhost:5000/users/", {
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
    const timer = setTimeout(() => {
      checkLoggedIn();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/manageinv" component={ManageInventory} />
            <Route path="/store" component={Store}/>
            <Route path="/checkout" component={CheckOut}/>
            {/* <Route path="/manageloc" component={ManageLocations} /> */}
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
