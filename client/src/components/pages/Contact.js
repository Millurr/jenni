import React from 'react'
import {useHistory} from 'react-router-dom';
import '../../style.css'
// import UserContext from '../../context/UserContext';
import { Container } from 'react-bootstrap';
import Footer from '../layouts/Footer'

export default function Contact() {
    const history = useHistory();

    const store = () => history.push('/store');

    return (
        <div>
        <div className="w3-container w3-light-grey" style={{padding: '128px 16px'}} id="contact">
        <h3 className="w3-center">CONTACT</h3>
        <p className="w3-center w3-large">Please let me know if I can make something for you or if you would just like to ask a question.</p>
        <Container fluid="md" style={{marginTop: 48}}>
            <p><i className="fa fa-map-marker fa-fw w3-xxlarge w3-margin-right" /> Louisiana, US</p>
            <p><i className="fa fa-envelope fa-fw w3-xxlarge w3-margin-right"> </i> Email: JMCraft@gmail.com</p>
            <br />
            <form action="/action_page.php" target="_blank">
            <p><input className="w3-input w3-border" type="text" placeholder="Name" required name="Name" /></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Email" required name="Email" /></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Subject" required name="Subject" /></p>
            <p><input className="w3-input w3-border" type="text" placeholder="Message" required name="Message" /></p>
            <p>
                <button className="w3-button w3-black" type="submit">
                <i className="fa fa-paper-plane" /> SEND MESSAGE
                </button>
            </p>
            </form>
        </Container>
        </div>
        <Footer />
        </div>
    );

}