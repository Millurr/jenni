import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';
import {Cart} from './Cart.js';

export default function Header() {
    const history = useHistory();
    let [cart, setCart] = useState([]);

    let localCart = localStorage.getItem("cart");

    useEffect(() => {
        localCart = JSON.parse(localCart);
        if (localCart) setCart(localCart);
    }, [localCart]);

    const home = () => history.push("/");
    const store = () => history.push('/store');

    return (
        <div className="w3-top">
            <div className="w3-bar w3-white w3-card" id="myNavbar">
                <a onClick={home} className="w3-bar-item w3-button w3-wide">HOME</a>
                {/* Right-sided navbar links */}
                <div className="w3-right w3-hide-small">
                    <a onClick={store} className="w3-bar-item w3-button">STORE</a>
                    <a href="#team" className="w3-bar-item w3-button"><i className="fa" /> ABOUT</a>
                    <a href="#contact" className="w3-bar-item w3-button"><i className="fa" /> CONTACT</a>
                    <AuthOptions />
                </div>
            </div>
            {/* <Cart count={cart.length}/> */}
            {(cart.length === 0) || (cart === undefined) ? <></> : <Cart style={{padding:'10px'}} count={cart.length}/> }
        </div>
    )
}
