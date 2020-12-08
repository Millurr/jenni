import React, {useEffect, useState} from 'react';
import '../../style.css'
// import UserContext from '../../context/UserContext';
import { CardDeck, Card, Button, Container, Row, Col, Center } from 'react-bootstrap';
import Axios from 'axios';

export default function Store() {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const getInv = async () => {
            const inv = await Axios.get("http://localhost:5000/inventory/all");
            setInventory(inv.data);
        }
        getInv();
    }, [inventory]);

    return (
        <body>
            {/* Header with full-height image */}
            <header className="bgimg-2 w3-display-container w3-grayscale-min" id="home" style={{height:300}}>
            <div className="w3-text-white" style={{padding: 48, textAlign:'center'}}>
                <span className="w3-jumbo w3-hide-small">We hope you find what you're looking for.</span><br />
            </div> 
            </header>
            
            <Container fluid="md">
            <Row>
            {inventory.map((inv, index) => (
                
                <Card style={{ width: '18rem', margin:'5px' }}>
                    <Card.Img variant="top" src={inv.imagePath} style={{width:'18rem', height:200}}/>
                    <Card.Body style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <Card.Title>{inv.item}</Card.Title>
                        <Card.Text>
                        {inv.description}
                        </Card.Text>
                        <Card.Text>
                            ${inv.price}
                        </Card.Text>
                        <Button variant="secondary">Add to Cart</Button>
                    </Card.Body>
                </Card>
                
            ))
            }
            </Row>
            </Container>
        </body>
    );
}