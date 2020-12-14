import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Container } from 'react-bootstrap';

export default function OrderHistory({setOptions}) {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    return (  
        <Container fluid="md">
            {userData.user ? 
            <div>

            </div> : 
            
            <>
            <h2>You do not have sufficient permissions for this page</h2>
            <Button variant="secondary" href="/login">Login</Button>
            </>
            }
        </Container>
    )
}