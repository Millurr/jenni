import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
    const history = useHistory();

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
        </div>
    )
        // <Navbar >
        //     <Navbar.Brand href="/">
        //         {/* <img
        //             alt=""
        //             src="/logo512.png"
        //             width="30"
        //             height="30"
        //             className="d-inline-block align-top"
        //         /> */}
        //         Jenni's Website
        //     </Navbar.Brand>
        //     <Nav className="mr-auto">
        //         <Nav.Link href="/store">Store</Nav.Link>
        //         {/* <Nav.Link href="#features">Features</Nav.Link> */}
        //         {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                
        //     </Nav>

        //     <AuthOptions />
            
        // </Navbar>
}
