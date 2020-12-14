import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, Container } from 'react-bootstrap';
import Axios from 'axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function OrderHistory() {
    const {userData, setUserData} = useContext(UserContext);
    const [trans, setTrans] = useState([]);
    
    useEffect(() => {
        const getTrans = async () => {
            console.log(userData.user?.id)
            const allTrans = await Axios.get('http://localhost:5000/transaction/gettrans/'+userData.user?.id);
            setTrans(allTrans.data);
        }
        getTrans();
    }, [userData.user])

    const getDate = (date) => {
        date = new Date(date);
        var month = months[date.getMonth()];
        var day = date.getDate();
        var hour = date.getHours();
        var ext = 'does not exist';
        if (hour === 0){
            hour = 12;
            ext = 'A.M.';
        }
        else if (hour >= 13){
            hour = hour -12;
            ext = 'P.M.';
        }

        return month + '/' + day;
    }

    return (  
        <Container fluid="md">
            {userData.user ? 
            <div style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
                {trans?.length != 0 ? trans.map((transaction) => (
                    <div style={{borderBottom:'4px solid', padding:'10px'}}>
                        <h1 style={{textAlign:'left', display:'inline-block', fontSize:'16px'}}>ID: {transaction._id}</h1><h1 className={'w3-right'} style={{textAlign:'right', display:'inline-block', fontSize:'16px'}}>{getDate(transaction.createdAt)}</h1>
                        {transaction.items.map((item) => (
                            <p style={{textAlign:'center', fontSize:'18px'}}>{item.item} ${item.price} x {item.count}</p>
                        ))}
                        <p style={{textAlign:'center', fontSize:'18px', fontWeight:'bold'}}>Total: ${transaction.total}</p>
                    </div>
                ))
                : <h1>No transactions logged.</h1>}
            </div> : 
            
            <>
            <h2>You do not have sufficient permissions for this page</h2>
            <Button variant="secondary" href="/login">Login</Button>
            </>
            }
        </Container>
    )
}