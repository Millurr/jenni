import React, {useEffect} from 'react';
import '../../style.css';
import {useHistory} from 'react-router-dom';

export default function Success({_id, total, name, removeCart}) {
    const history = useHistory();
    useEffect(() => {
        removeCart();
        history.replace({
            'state': undefined
        });
    }, [])

    return (
        <div>
            <h1>Thank you, {name}</h1>
            <p>Keep this for your records: Order ID {_id}</p>
            <p>Your total: ${total}</p>
        </div>
    )
}
