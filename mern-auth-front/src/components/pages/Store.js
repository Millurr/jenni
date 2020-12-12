import React, {useEffect, useState} from 'react';
import '../../style.css'
import { Card, Button, Container, Row } from 'react-bootstrap';
import Axios from 'axios';

export default function Store() {
    const [inventory, setInventory] = useState([]);
    let [cart, setCart] = useState([]);

    let localCart = localStorage.getItem("cart");

    useEffect(() => {
        const getInv = async () => {
            const inv = await Axios.get("http://localhost:5000/inventory/all");
            setInventory(inv.data);
        }
        getInv();

        localCart = JSON.parse(localCart);

        if (localCart) setCart(localCart);
    }, [inventory]);

    const addItem = (item) => {
        let cartCopy = [...cart];

        if (item.count <= 0) return;

        let {_id} = item;

        let existingItem = cartCopy.find(cartItem => cartItem._id == _id);

        if (existingItem) {
            if (existingItem.count < item.count) existingItem.count += 1;
            else alert("You have reached the max inventory of this item. Please edit in cart to remove.");
        } else {
            cartCopy.push({
                '_id': item._id,
                'count': 1
            });
        }

        setCart(cartCopy);

        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);
    }

    return (
        <div>
            {/* Header with full-height image */}
            <header className="bgimg-2 w3-display-container w3-grayscale-min" id="home" style={{height:300}}>
            <div className="w3-text-white" style={{padding: 48, textAlign:'center', backgroundColor:'black', opacity:'60%', height:300}}>
                <span style={{ position:'absolute', top:'58%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}} className="w3-jumbo w3-hide-small">Our Shop</span><br />
            </div> 
            </header>
            
            <Container fluid="md" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <Row style={{justifyContent:'center'}}>
            {inventory.map((inv, index) => (
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
                        <Button href='/store' onClick={() => addItem(inv)} variant="secondary">Add to Cart</Button>
                    </Card.Body>
                </Card>
                
            ))
            }
            </Row>
            </Container>
        </div>
    );
}