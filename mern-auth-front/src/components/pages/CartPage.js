import React, {useEffect, useState, useRef} from 'react';
import '../../style.css'
import { Card, Button, Container, Row } from 'react-bootstrap';
import Axios from 'axios';
import PaypalButton from './PaypalButton';
import Success from './Success';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

// Gets the local storage to get users items added to cart
// If user has no data it will display that the cart is empty

export default function CartPage({ cart, editItem, removeItem, removeCart}) {
    // let [cart, setCart] = useState([]);
    const [paidFor, setPaidFor] = useState(false);
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    let localCart = localStorage.getItem("cart");

    const getTotal = () => {
        let t = 0;
        for (let i=0; i<cart.length; i++) {
            t += cart[i].count * cart[i].price;
        }
        return t;
    }

    const onSuccess = (trans) => {
        setTransaction(trans);
        setPaidFor(true);
        console.log(transaction);
    }

    return (
        <Container fluid="md" style={{margin:0, position:'absolute', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
            {!paidFor ? <div>
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
                    {loading ? <Loader type="TailSpin" color="black" height={50} width={50} timeout={20000} /> : <></> }
                    <PaypalButton total={getTotal()} cart={cart} onSuccess={(trans) => onSuccess(trans)} isLoading={(val) => setLoading(val)}/>
                </div> : <></>}
            </div> :

            <div>
                <Success _id={transaction._id} total={transaction.total} name={transaction.name} removeCart={() => removeCart()}/>
            </div>
            }
        </Container>
    )
 }