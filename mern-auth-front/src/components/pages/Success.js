import React, {useEffect, useState, useRef} from 'react';
import '../../style.css'
// import { Card, Button, Container, Row } from 'react-bootstrap';

export default function Success({_id, total, name, removeCart}) {
    useEffect(() => {
        removeCart();
    }, [])

    return (
        <div>
            <h1>Thank you, {name}</h1>
            <p>Keep this for your records: Order ID {_id}</p>
            <p>Your total: ${total}</p>
        </div>
    )
}
