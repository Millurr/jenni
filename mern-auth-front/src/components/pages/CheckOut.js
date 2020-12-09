import React, {useEffect, useState} from 'react';
import '../../style.css'
import { Card, Button, Container, Row } from 'react-bootstrap';
import Axios from 'axios';

export default function CheckOut() {
    let [cart, setCart] = useState([]);

    let localCart = localStorage.getItem("cart");

    const removeItem = (itemId) => {
        let cartCopy = [...cart];

        cartCopy = cartCopy.filter(item => item._id != itemId);

        setCart(cartCopy);

        let copyCopyCart = [];

        // This loops prevents price and unessesary vaialbes being stored locally
        for (let i=0; i<cartCopy.length; i++) {
            copyCopyCart.push({'_id': cartCopy[i]._id, 'count': cartCopy[i].count});
        }

        let cartString = JSON.stringify(copyCopyCart);

        localStorage.setItem("cart", cartString);
    }

    const editItem = (itemId, amount) => {
        let cartCopy = [...cart]

        let existingItem = cartCopy.find(item => item._id == itemId);

        if (!existingItem) return;

        existingItem.count += amount;

        if (existingItem.count <= 0) cartCopy = cartCopy.filter(item => item._id != itemId);

        setCart(cartCopy);

        let copyCopyCart = [];

        // This loops prevents price and unessesary vaialbes being stored locally
        for (let i=0; i<cartCopy.length; i++) {
            copyCopyCart.push({'_id': cartCopy[i]._id, 'count': cartCopy[i].count});
        }

        let cartString = JSON.stringify(copyCopyCart);

        localStorage.setItem('cart', cartString);
    }

    const getTotal = () => {
        let t = 0;
        for (let i=0; i<cart.length; i++) {
            t += cart[i].count * cart[i].price;
        }
        return t;
    }

    useEffect(() => {
        localCart = JSON.parse(localCart);
        if (localCart) {
            let toShow = [];

            const getInv = async () => {
                localCart.forEach(async inv => {
                    // _ids.push(localCart[i]._id);
                    const cartInv = await Axios.get('http://localhost:5000/inventory/items/'+inv._id);
                    // console.log(cartInv.data);
                    cartInv.data.count = inv.count;
                    toShow.push(cartInv.data);
                    console.log(toShow);
                    setCart(toShow);
                }
                )
            }
            
            getInv();
            
        };
        
        console.log(localCart);
    }, [])

    return (
        <Container fluid="md" style={{margin:0, position:'absolute', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
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
                    
                    <Button href='/checkout' onClick={() => removeItem(inv._id)} variant="secondary">Remove</Button>
                </Card.Body>
            </Card>
            
        ))
        }
        </Row>
        <div>
            {!(cart.length == 0) ? <p style={{textAlign:'center', fontSize:'24px'}} >Total: ${getTotal()}</p> : <></>}
            {/* <p style={{textAlign:'center'}}>Total: ${getTotal()}</p> */}
        </div>
        
        </Container>
    )
 }