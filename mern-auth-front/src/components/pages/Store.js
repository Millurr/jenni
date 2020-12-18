import React, {useEffect, useState} from 'react';
import '../../style.css'
import { Card, Button, Container, Row } from 'react-bootstrap';
import Axios from 'axios';

export default function Store({addItem}) {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const getInv = async () => {
            const inv = await Axios.get("http://localhost:5000/inventory/all");
            setInventory(inv.data);
        }
        getInv();
    }, [inventory]);

    return (
        <div>
            {/* Header with full-height image */}
            <header className="bgimg-2 w3-display-container w3-grayscale-min" id="home" style={{height:300}}>
            <div className="w3-text-white" style={{padding: 48, textAlign:'center', backgroundColor:'black', opacity:'60%', height:300}}>
                <span style={{ position:'absolute', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}} className="w3-jumbo w3-hide-small">Our Shop</span><br />
            </div> 
            </header>
            
            <Container fluid="md" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Row style={{justifyContent:'center'}}>
            {inventory.map((inv, index) => (
                inv.count != 0 ?
                <Card style={{ width: '18rem', margin:'5px' }} key={inv._id}>
                    <Card.Img variant="top" src={inv.imagePath} style={{width:'18rem', height:200}}/>
                    <Card.Body style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <Card.Title>{inv.item}</Card.Title>
                        <Card.Text>
                        {inv.description}
                        </Card.Text>
                        <Card.Text>
                            ${inv.price}
                        </Card.Text>
                        <Button onClick={() => addItem(inv)} variant="secondary">Add to Cart</Button>
                    </Card.Body>
                </Card> : <></>
            ))
            }
            </Row>
            </Container>
        </div>
    );
}