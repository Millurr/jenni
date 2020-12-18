import React from 'react';
import '../../style.css'
import {useHistory} from 'react-router-dom';
import { Card, Button, Container, Row } from 'react-bootstrap';

// Gets the local storage to get users items added to cart
// If user has no data it will display that the cart is empty

export default function CartPage({ cart, editItem, removeItem, removeCart}) {
    // let [cart, setCart] = useState([]);
    const history = useHistory();

    const checkout = () => history.push({
        pathname: '/checkout',
        state: {
            'total': getTotal(),
            'cart': cart,
        }
    });

    const getTotal = () => {
        let t = 0;
        for (let i=0; i<cart.length; i++) {
            t += cart[i].count * cart[i].price;
        }
        return t;
    }

    return (
        <Container fluid="md" style={{margin:0, position:'absolute', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
            <div>
                <div style={{textAlign:'center'}}>
                    {!(cart.length == 0) ? <span className="w3-jumbo w3-hide-small">Your cart</span> : <span className="w3-jumbo w3-hide-small">Your cart is empty.</span>}
                </div> 
            <Row style={{justifyContent:'center'}}>
            {cart.map((inv, index) => (
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
                        <Row >
                            <Button style={{ margin:'10px'}} onClick={() => editItem(inv._id, -1)} variant="secondary">-</Button>
                            <Card.Text style={{ margin:'10px'}}>
                                {inv.count}
                            </Card.Text>
                            <Button style={{ margin:'10px'}} onClick={() => editItem(inv._id, 1)} variant="secondary">+</Button>
                        </Row>
                        
                        <Button onClick={() => removeItem(inv._id)} variant="secondary">Remove</Button>
                    </Card.Body>
                </Card>
                
            ))
            }
            </Row>
                {!(cart.length == 0) ? 
                <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <p style={{textAlign:'center', fontSize:'24px'}} >Total: ${getTotal()}</p>
                    <Button variant="secondary" onClick={checkout}>Proceed to Checkout</Button>
                </div> : <></>}
            </div>
        </Container>
    )
 }