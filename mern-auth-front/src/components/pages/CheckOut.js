import React, {useState} from 'react';
import '../../style.css'
import {useLocation} from 'react-router-dom';
import { Container, Form, Col } from 'react-bootstrap';
import PaypalButton from './PaypalButton';
import {useHistory} from 'react-router-dom';
import Success from './Success';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

export default function CheckOut({removeCart}) {
    const history = useHistory();
    const [transaction, setTransaction] = useState([]);
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zip, setZip] = useState();
    const [paidFor, setPaidFor] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const onSuccess = (trans) => {
        setTransaction(trans);
        setPaidFor(true);
        console.log(transaction);
    }

    const fullAddress = () => {
        return street + ' ' + city + ', ' + state + ' ' + zip;
    }

    return (  
        <Container fluid="md">
            {!paidFor ? 
            location.state ? <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignContent:'center', textAlign:'center'}}>
                <h1>Check Out</h1>
                {location.state.cart?.map((cart) => (
                    <div style={{borderBottom:'4px solid', padding:'10px'}}>
                        <h1 style={{fontSize:'16px'}}>{cart.item} x ${cart.price} x {cart.count}</h1>
                    </div>
                ))}
                <Form>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Shipping Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" onChange={(e) => setStreet(e.target.value)}/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={(e) => setCity(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." onChange={(e) => setState(e.target.value == 'Choose...' ? undefined : e.target.value)}>
                            <option>Choose...</option>
                            {states.map((state) => (
                                <option>{state}</option>
                            ))}
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onChange={(e) => setZip(e.target.value)}/>
                        </Form.Group>
                    </Form.Row>
                    </Form>
                <p>Total: ${location.state.total}</p>
                {loading ? <Loader type="TailSpin" color="black" height={50} width={50} timeout={20000} /> : <></> }
                    {(street && city && state && zip) ? <PaypalButton total={location.state.total} cart={location.state.cart} onSuccess={(trans) => onSuccess(trans)} isLoading={(val) => setLoading(val)} address={() => fullAddress()}/>
                    : <h3>You muse fill out all shipping info for payment options to appear.</h3>}
            </div> : <div>Nothing in cart</div>
            :
            <div>
                <Success _id={transaction._id} total={transaction.total} name={transaction.name} removeCart={() => removeCart()}/>
            </div>}
        </Container>
    )

}