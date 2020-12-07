import React from 'react';
import AuthOptions from '../auth/AuthOptions';
import { Navbar, Nav } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">
                {/* <img
                    alt=""
                    src="/logo512.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                /> */}
                Jenni's Website
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/store">Store</Nav.Link>
                {/* <Nav.Link href="#features">Features</Nav.Link> */}
                {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                
            </Nav>

            <AuthOptions />
            
        </Navbar>
    )
}
