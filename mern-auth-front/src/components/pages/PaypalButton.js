import React, {useContext} from 'react';
import '../../style.css'
import Axios from 'axios';
import UserContext from "../../context/UserContext";
import {PayPalButton} from 'react-paypal-button-v2';

export default function PaypalButton({total, cart, onSuccess, isLoading, address}) {
    const {userData} = useContext(UserContext);

    return (
        <PayPalButton
            createOrder={(data, actions) => {
                isLoading(true);
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: 'USD',
                            value: total
                        }
                    }]
                })
            }}
            shippingPreference = "SET_PROVIDED_ADDRESS"
            onApprove={(data, actions) => {
                return actions.order.capture().then(async function(details) {
                    const trans = {
                        items: cart,
                        transactionId: data.orderID,
                        count: cart.length,
                        total,
                        username: userData.user.displayName ?? 'Guest',
                        name: details.payer.name.given_name,
                        address: address(),
                        email: details.payer.email_address,
                        userId: userData.user.id ?? 'Guest'
                    }
                    const transaction = await Axios.post('/transaction/', trans);

                    if (transaction) {
                        onSuccess(transaction.data);
                        isLoading(false);
                    }
                })
            }}
            onError={(data) => {
                console.log(data);
            }}
            onCancel={() => {
                isLoading(false);
            }}
        />
    )
}