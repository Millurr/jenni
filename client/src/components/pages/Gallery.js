import React from 'react'
import '../../style.css'
// import UserContext from '../../context/UserContext';
import { Container } from 'react-bootstrap';
import Footer from '../layouts/Footer';

export default function Gallery() {

    return (
        <div style={{backgroundColor:'black'}}>
        <div className="w3-row">
        <div className="w3-third">
            <img src="/1.jpg" style={{width: '100%'}} alt="A boy surrounded by beautiful nature" />
            <img src="/2.jpg" style={{width: '100%'}} alt="What a beautiful scenery this sunset" />
            <img src="/3.jpg" style={{width: '100%'}} alt="The Beach. Me. Alone. Beautiful" />
        </div>
        <div className="w3-third">
            <img src="/4.jpg" style={{width: '100%'}} alt="Quiet day at the beach. Cold, but beautiful" />
            <img src="/5.jpg" style={{width: '100%'}} alt="Waiting for the bus in the desert" />
            <img src="/6.jpg" style={{width: '100%'}} alt="Nature again.. At its finest!" />
        </div>
        <div className="w3-third">
            <img src="/7.jpg" style={{width: '100%'}} alt="Canoeing again" />
            <img src="/8.jpg" style={{width: '100%'}} alt="A girl, and a train passing" />
            <img src="/9.jpg" style={{width: '100%'}} alt="What a beautiful day!" />
        </div>
        </div>
        <Footer />
        </div>
    );

}