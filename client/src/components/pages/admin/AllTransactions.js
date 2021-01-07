import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Container, Modal } from 'react-bootstrap';
import Axios from 'axios';
import ErrorNotice from "../../misc/ErrorNotice";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function AllTransactions() {
    const {userData} = useContext(UserContext);
    const [trans, setTrans] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [current, setCurrent] = useState();
    const [currentId, setCurrentId] = useState();
    const [currentTracking, setCurrentTracking] = useState();
    const [search, setSearch] = useState('');
    
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

    const setCurrents = (val, id, track) => {
        setCurrent(val);
        setCurrentId(id);
        setCurrentTracking(track);
        setModalShow(true);
    }

    console.log(trans)

    return (  
        <Container fluid="md">
            {userData.user ? 
            <div style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
                <h1 style={{textAlign:'center'}}>All Transactions</h1>
                <input placeholder="Search (Name, Tracking #, Order ID, Username)" type="search" style={{padding:'5px'}} onChange={(e) => {setSearch(e.target.value)}} />
                {trans?.length != 0 ? trans?.filter((transaction) => {
                    if(search == '')
                        return transaction
                    else if(transaction.name?.toLowerCase().includes(search?.toLowerCase()) || transaction.tracking?.toLowerCase().includes(search?.toLowerCase()) || transaction._id?.toLowerCase().includes(search?.toLowerCase()) || transaction.username?.toLowerCase().includes(search?.toLowerCase())){
                        return transaction
                    }
                }).map((transaction) => (
                    <div key={transaction._id} style={{borderBottom:'4px solid', padding:'10px'}}>
                        <h1 style={{textAlign:'left', display:'inline-block', fontSize:'16px'}}>ID: {transaction._id}</h1><h1 className={'w3-right'} style={{textAlign:'right', display:'inline-block', fontSize:'16px'}}>{getDate(transaction.createdAt)}</h1>
                        <div style={{display:'flex', flexDirection:'row', flex:'3', justifyContent:'space-evenly'}}>
                            <h1 style={{fontSize:'16px'}}>Name: {transaction.name}</h1>
                            <h1 style={{fontSize:'16px', textAlign:'center'}}><b>Shipping: {transaction.address} </b></h1>
                            <h1 style={{fontSize:'16px'}}>Username: {transaction.username}</h1>
                        </div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                            <h1 style={{textAlign:'center', fontSize:'16px', padding:'5px'}}>Status: {transaction.status}</h1>
                            {transaction.status === 'Shipped' ? <h1 style={{textAlign:'center', fontSize:'16px', padding:'5px'}}>Tracking: {transaction.tracking}</h1> : <></>}
                            <Button variant="secondary" style={{height:'40px'}} onClick={() => setCurrents(transaction.status, transaction._id, transaction.tracking)}>
                                <i className="fa fa-edit"/> Edit
                            </Button>

                        </div>

                        <MyVerticallyCenteredModal
                            show={modalShow}
                            id={currentId}
                            tracking={currentTracking}
                            status={current}
                            onHide={() => setModalShow(false)}
                        />
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

function MyVerticallyCenteredModal(props) {
    const {userData} = useContext(UserContext);
    const [changedStatus, setChangedStatus] = useState(props.status);
    const [tracking, setTracking] = useState('');
    const [error, setError] = useState();

    const submit = async (id) => {
        let update;
        if (changedStatus === 'Shipped') {
            update = {
                status: changedStatus,
                tracking,
                id: id
            }
        } else {
            update = {
                status: changedStatus,
                id: id
            }
        }
        const token = localStorage.getItem("auth-token");
        const header = { headers: {'level': userData.user?.level.toString(), 'x-auth-token': token}};
        console.log(update)
        try {
            await Axios.put("/transaction/edit", update, header);
            setChangedStatus(undefined);
            setTracking(undefined);
            props.onHide();
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Current Status: {props.status} {props.staus === 'Shipped' ? props.tracking : ''}</p>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                <select
                    onChange={(e) => setChangedStatus((e.target.value == 'Update') ? undefined : e.target.value)}
                >
                    <option value='Update' >Update Status</option>
                    <option value='Pending' >Pending</option>
                    <option value='In Process' >In Process</option>
                    <option value='Shipped' >Shipped</option>
                </select>
                <p>{changedStatus}</p>
                {(changedStatus === 'Shipped') ? <input onChange={(e) => setTracking(e.target.value)}/> : <></>}
            </div>
        </Modal.Body>
        {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <Modal.Footer>
            <Button variant="secondary" type='submit' disabled={(props.status == changedStatus) || !(changedStatus)} onClick={() => submit(props.id)}>Update</Button>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }