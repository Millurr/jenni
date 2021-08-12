import React from 'react'
import {useHistory} from 'react-router-dom';
import '../../style.css'
import Footer from '../layouts/Footer'

export default function Home() {
    const history = useHistory();

    const store = () => history.push('/store');
    const contact = () => history.push('/contact');
    const gallery = () => history.push('/gallery');

    return (
        <div>
            {/* Header with full-height image */}
            <header className="bgimg-1 w3-display-container w3-grayscale-min" id="home">
                <div
                    className="w3-text-white"
                    style={{
                    padding: '48px'
                }}>
                    <span className="w3-jumbo w3-hide-small">All crafts made by hand.</span><br/> {/* <span className="w3-xxlarge">Get the gift for others.</span><br /> */}
                    <span className="w3-large">Allow me to make something specific to you.</span>
                    <p>
                        <a
                            onClick={store}
                            className="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Take a look!</a>
                    </p>
                </div>
                <div
                    className="w3-display-bottomleft w3-text-grey w3-large"
                    style={{
                    padding: '24px 48px'
                }}>
                    <i className="fa fa-facebook-official w3-hover-opacity"/>
                    <i className="fa fa-instagram w3-hover-opacity"/>
                    <i className="fa fa-snapchat w3-hover-opacity"/>
                    <i className="fa fa-pinterest-p w3-hover-opacity"/>
                </div>
            </header>

            {/* About Section */}
            <div
                className="w3-container"
                style={{
                padding: '128px 16px'
            }}
                id="about">
                <h3 className="w3-center">ABOUT US</h3>
                <p className="w3-center w3-large">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus
                    diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
                    Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
                    Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in
                    libero. Sed dignissim lacinia nunc.
                </p>
            </div>

            <div className="w3-container w3-row w3-center w3-dark-grey bgimg-3 w3-padding-64">
                <div className="w3-third w3-hover-opacity" onClick={gallery}>
                    <i className="fa fa-camera w3-margin-bottom w3-jumbo"/>
                    <p className="w3-large">Gallery</p>
                    <p>View some images of our crafts.</p>
                </div>
                <div className="w3-third w3-hover-opacity" onClick={store}>
                    <i className="fa fa-shopping-bag w3-margin-bottom w3-jumbo"/>
                    <p className="w3-large">Store</p>
                    <p>Check out our online store.</p>
                </div>
                <div className="w3-third w3-hover-opacity" onClick={contact}>
                    <i className="fa fa-envelope w3-margin-bottom w3-jumbo"/>
                    <p className="w3-large">Contact</p>
                    <p>We would like to hear from to you.</p>
                </div>
            </div>

            <div
                className="w3-container"
                style={{
                padding: '128px 16px'
            }}
                id="work">
                <h3 className="w3-center">OUR CRAFTS</h3>
                <p className="w3-center w3-large">What we've done for people</p>
                <div
                    className="w3-row-padding"
                    style={{
                    marginTop: 64
                }}>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_1.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_2.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_3.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_4.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                </div>
                <div className="w3-row-padding w3-section">
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_5.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_6.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_7.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                    <div className="w3-col l3 m6">
                        <img
                            src="/home_8.jpg"
                            style={{
                            width: '100%'
                        }}
                            alt=""/>
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
    )
}
