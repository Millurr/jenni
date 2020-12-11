import React, {useEffect, useState, useContext} from 'react';
import '../../style.css'
import { Card, Button, Container, Row } from 'react-bootstrap';
import Axios from 'axios';
import UserContext from "../../context/UserContext";
import {PayPalButton} from 'react-paypal-button-v2';

export default function PaypalButton({total, cart}) {
    const {userData, setUserData} = useContext(UserContext);

    return (
        <PayPalButton
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: 'USD',
                            value: total
                        }
                    }]
                })
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(async function(details) {
                    // alert("Transaction completed by " + details.payer.name.given_name);
                    // alert(data.orderID);
                    const trans = {
                        items: cart,
                        transactionId: data.orderID,
                        count: cart.length,
                        total,
                        username: userData.user.displayName ?? 'Guest',
                        name: details.payer.name.given_name
                    }
                    await Axios.post('http://localhost:5000/transaction/', trans);
                })
            }}
        />
    )
}