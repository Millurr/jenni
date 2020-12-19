import React from 'react'
import '../../style.css'
// import UserContext from '../../context/UserContext';
import { Container } from 'react-bootstrap';
import Footer from '../layouts/Footer';

export default function Gallery() {

    return (
        <div>
        <div className="w3-row">
        <div className="w3-third">
            <img src="/natureboy.jpg" style={{width: '100%'}} alt="A boy surrounded by beautiful nature" />
            <img src="/girl_mountain.jpg" style={{width: '100%'}} alt="What a beautiful scenery this sunset" />
            <img src="/girl.jpg" style={{width: '100%'}} alt="The Beach. Me. Alone. Beautiful" />
        </div>
        <div className="w3-third">
            <img src="/boy.jpg" style={{width: '100%'}} alt="Quiet day at the beach. Cold, but beautiful" />
            <img src="/man_bench.jpg" style={{width: '100%'}} alt="Waiting for the bus in the desert" />
            <img src="/natureboy.jpg" style={{width: '100%'}} alt="Nature again.. At its finest!" />
        </div>
        <div className="w3-third">
            <img src="/girl.jpg" style={{width: '100%'}} alt="Canoeing again" />
            <img src="/girl_train.jpg" style={{width: '100%'}} alt="A girl, and a train passing" />
            <img src="/closegirl.jpg" style={{width: '100%'}} alt="What a beautiful day!" />
        </div>
        </div>
        <Footer />
        </div>
    );

}