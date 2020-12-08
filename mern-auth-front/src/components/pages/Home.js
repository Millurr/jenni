import React from 'react'
import {useHistory} from 'react-router-dom';
import '../../style.css'
// import UserContext from '../../context/UserContext';
// import { Button } from 'react-bootstrap';

export default function Home() {
    const history = useHistory();

    const store = () => history.push('/store');

    return (
        <body>
            {/* Header with full-height image */}
            <header className="bgimg-1 w3-display-container w3-grayscale-min" id="home">
            <div className="w3-text-white" style={{padding: '48px'}}>
                <span className="w3-jumbo w3-hide-small">All crafts made by hand.</span><br />
                {/* <span className="w3-xxlarge">Get the gift for others.</span><br /> */}
                <span className="w3-large">Allow me to make something specific to you.</span>
                <p><a onClick={store} className="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off">Find what you are looking for today</a></p>
            </div>
            <div className="w3-display-bottomleft w3-text-grey w3-large" style={{padding: '24px 48px'}}>
                <i className="fa fa-facebook-official w3-hover-opacity" />
                <i className="fa fa-instagram w3-hover-opacity" />
                <i className="fa fa-snapchat w3-hover-opacity" />
                <i className="fa fa-pinterest-p w3-hover-opacity" />
            </div>
            </header>

            {/* About Section */}
            <div className="w3-container" style={{padding: '128px 16px'}} id="about">
            <h3 className="w3-center">ABOUT US</h3>
            <p className="w3-center w3-large">Some things to keep in mind</p>
            <div className="w3-row-padding w3-center" style={{marginTop: 64}}>
                <div className="w3-third">
                <i className="fa fa-desktop w3-margin-bottom w3-jumbo w3-center" />
                <p className="w3-large">Ease</p>
                <p>We make the process simple. Find what you like, add it to your cart and buy it.</p>
                </div>
                <div className="w3-third">
                <i className="fa fa-heart w3-margin-bottom w3-jumbo" />
                <p className="w3-large">Passion</p>
                <p>We have a pure passion to make crafts for you and us.</p>
                </div>
                <div className="w3-third">
                <i className="fa fa-envelope w3-margin-bottom w3-jumbo" />
                <p className="w3-large">Contact</p>
                <p>We would like to hear from to you. Whether it's about your experience or something you'd like to recommend. Fill out the form and let us know!</p>
                </div>
            </div>
            </div>

            {/* Footer */}
            <footer className="w3-center w3-black w3-padding-64">
            <a href="#home" className="w3-button w3-light-grey"><i className="fa fa-arrow-up w3-margin-right" />To the top</a>
            <div className="w3-xlarge w3-section">
                <i className="fa fa-facebook-official w3-hover-opacity" />
                <i className="fa fa-instagram w3-hover-opacity" />
                <i className="fa fa-snapchat w3-hover-opacity" />
                <i className="fa fa-pinterest-p w3-hover-opacity" />
            </div>
            <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" className="w3-hover-text-green">w3.css</a></p>
            </footer>


        </body>
    )
}
