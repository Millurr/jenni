import React, {useEffect, useState} from 'react';
import '../../style.css'
import { Card, Button, Container, Row } from 'react-bootstrap';
import Axios from 'axios';
import scriptLoader from 'react-async-script-loader';
import {PayPalButton} from 'react-paypal-button-v2';

export default function PaypalButton({total, cart}) {

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
                return actions.order.capture().then(function(details) {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // CALL SERVER HERE TO SAVE DATA
                })
            }}
        />
    )
}