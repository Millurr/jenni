import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Container } from 'react-bootstrap';
import Axios from 'axios';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function AllTransactions() {
    const {userData} = useContext(UserContext);
    const [trans, setTrans] = useState([]);
    
    useEffect(() => {
        const getTrans = async () => {
            const token = localStorage.getItem("auth-token");
            const header = { headers: {'level': userData.user?.level.toString(), 'x-auth-token': token}};
            const users = await Axios.get('/transaction/alltrans', header);
            setTrans(users.data);
        }
        getTrans();
    }, [userData.user])

    const getDate = (date) => {
        date = new Date(date);
        var month = months[date.getMonth()];
        var day = date.getDate();
        var hour = date.getHours();
        // var ext = 'does not exist';
        if (hour === 0){
            hour = 12;
        }
        else if (hour >= 13){
            hour = hour -12;
        }

        return month + '/' + day;
    }

    return (  
        <Container fluid="md">
            {userData.user ? 
            <div style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
                <h1 style={{textAlign:'center'}}>All Transactions</h1>
                {trans?.length != 0 ? trans?.map((transaction) => (
                    <div key={transaction._id} style={{borderBottom:'4px solid', padding:'10px'}}>
                        <h1 style={{textAlign:'left', display:'inline-block', fontSize:'16px'}}>ID: {transaction._id}</h1><h1 className={'w3-right'} style={{textAlign:'right', display:'inline-block', fontSize:'16px'}}>{getDate(transaction.createdAt)}</h1>
                        <div style={{display:'flex', flexDirection:'row', flex:'3', justifyContent:'space-evenly'}}>
                            <h1 style={{fontSize:'16px'}}>Name: {transaction.name}</h1>
                            <h1 style={{fontSize:'16px', textAlign:'center'}}><b>Shipping: {transaction.address} </b></h1>
                            <h1 style={{fontSize:'16px'}}>Username: {transaction.username}</h1>
                        </div>
                        <h1 style={{textAlign:'center', fontSize:'16px'}}>Status: {transaction.status}</h1>
                        {transaction.items.map((item, index) => (
                            <p key={index} style={{textAlign:'center', fontSize:'18px'}}>{item.item} ${item.price} x {item.count}</p>
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