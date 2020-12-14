import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button } from 'react-bootstrap';

export default function AccountSettings({setOptions}) {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    const orderHistory = () => {
        history.push('/orderhistory');
        setOptions();
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        history.push('/login');
        localStorage.setItem("auth-token", "");
        setOptions();
    };

    return (  
            <div style={{width:'50%', height:'50%', position:'absolute', zIndex:10,  top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}} >
                <div style={{margin:0, backgroundColor:'black', opacity:'90%', position:'relative', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)', height:'400px', width:'400px'}}>
                    <div style={{margin:0, position:'absolute', textAlign:'center', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
                        <Button onClick={orderHistory} variant='secondary' style={{color:'white', fontSize:'16px', margin:'5px'}}>Order History</Button><br></br>
                        <Button onClick={logout} variant='secondary' style={{color:'white', fontSize:'16px', margin:'5px'}}>Log Out</Button> <br></br>
                        <Button onClick={() => setOptions()} variant='secondary' style={{color:'white', fontSize:'16px', margin:'5px'}}>Close</Button>
                    </div>
                </div>
            </div>
    )
}