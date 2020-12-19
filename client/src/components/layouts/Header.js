import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

export default function Header({setOptions, current}) {
    const history = useHistory();

    const home = () => history.push("/");
    const store = () => history.push('/store');
    const contact = () => history.push('/contact');
    const gallery = () => history.push('/gallery');

    return (
        <div className="w3-top" style={{position:'sticky', top:'0'}}>
            <div className="w3-bar w3-white w3-card" id="myNavbar">
                <a onClick={home} className="w3-bar-item w3-button w3-wide">HOME</a>
                {/* Right-sided navbar links */}
                <div className="w3-right w3-hide-small">
                    <a onClick={store} className="w3-bar-item w3-button">STORE</a>
                    <a onClick={gallery} className="w3-bar-item w3-button">GALLERY</a>
                    <a onClick={contact} className="w3-bar-item w3-button">CONTACT</a>
                    <AuthOptions setOptions={(val) => setOptions(val)} current={current} />
                </div>
            </div>
        </div>
    )
}
