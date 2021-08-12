import React from 'react';
import {useHistory} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

export default function Header({setOptions, current}) {
    const history = useHistory();

    const home = () => history.push("/");
    const store = () => history.push('/store');
    const contact = () => history.push('/contact');
    const gallery = () => history.push('/gallery');

    const open = () => {
    var mySidebar = document.getElementById("mySidebar");
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
    } else {
        mySidebar.style.display = 'block';
    }
    }

    // Close the sidebar with the close button
    const close = () => {
        var mySidebar = document.getElementById("mySidebar");
        mySidebar.style.display = "none";
    }

    const onSelect = (val) => {
        if (val === 1) {
            store();
        } else if (val === 2) {
            gallery();
        } else if (val === 3) {
            contact();
        }
        close();
    }

    return (
        <>
        <div className="w3-top" style={{position:'sticky', top:'0'}}>
            <div className="w3-bar w3-white w3-card" id="myNavbar">
                <a onClick={home} className="w3-bar-item w3-button w3-wide"><img style={{height:'25px'}} src="/headerlog-vectorized.png" alt="Header"></img></a>
                {/* Right-sided navbar links */}
                <div className="w3-right w3-hide-small">
                    <a onClick={store} className="w3-bar-item w3-button">STORE</a>
                    {/* <a onClick={gallery} className="w3-bar-item w3-button">GALLERY</a> */}
                    <a onClick={contact} className="w3-bar-item w3-button">CONTACT</a>
                    <AuthOptions setOptions={(val) => setOptions(val)} current={current} />
                </div>
                <a href="javascript:void(0)" className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onClick={() => open()}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>
        </div>
        {/* Sidebar on small screens when clicking the menu icon */}
        <nav className="w3-sidebar w3-bar-block w3-white w3-card w3-animate-left w3-hide-medium w3-hide-large" style={{display: 'none', opacity:'80%'}} id="mySidebar">
            <a onClick={() => onSelect(1)} className="w3-bar-item w3-button">STORE</a>
            {/* <a onClick={() => onSelect(2)} className="w3-bar-item w3-button">GALLERY</a> */}
            <a onClick={() => onSelect(3)} className="w3-bar-item w3-button">CONTACT</a>
            <AuthOptions setOptions={(val) => setOptions(val)} current={current} close={() => close()} />
        </nav>

        </>
    )
}
