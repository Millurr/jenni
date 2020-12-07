import React, {useEffect, useContext, useState} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Table, Form, Col } from 'react-bootstrap';
import ErrorNotice from "../../misc/ErrorNotice";
import Axios from 'axios';
import {AddLocationModal} from './AddLocation.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const isLive = "Is live";
const ntLive = "Not live";

export default function ManageLocations() {
    const [inventory, setInventory] = useState([]);
    const [allInv, setAllInv] = useState([]);
    const {userData} = useContext(UserContext);
    const [currentId, setCurrentId] = useState();
    const [editCount, setEditCount] = useState();
    const [currentLocId, setCurrentLocId] = useState();
    const [maxInv, setMaxInv] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [editLoc, setEditLoc] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [error, setError] = useState();


    useEffect(() => {
        const getInventory = async () => {
            const inv = await Axios.get("http://localhost:5000/locations/all");
            // console.log(inv.data);
            setInventory(inv.data);
        }
        // setAllInv(getAll());
        getInventory();
    }, [inventory])

    useEffect(() => {
        // Gets all inventory for adding items and the counts
        const getAll = async () => {
            const inv = await Axios.get('http://localhost:5000/inventory/all');
            setAllInv(inv.data);
        }
        getAll();
    }, [allInv])

    const checkArr = (arr, val) => {
        var isInclued = false;
        arr.forEach((item) => {
            // console.log(item);
            if ((item.item === val) && (item.count != 0) ) isInclued = true;
        })
        return isInclued;
    }

    const checkMinMax = (val) => {
        if (val > maxInv) val = maxInv;
        if (val < 0) val = 1;
        setEditCount(val);
    }

    const changeVal = async (locID, _id) => {
        // console.log(_id);
        let count = {'count': 1};
        const header = { headers: {'level': userData.user?.level.toString()}}
        await Axios.post("http://localhost:5000/locations/addinv/"+ locID + '/' + _id, count, header);
    }

    const editLocSubmit = async (id) => {
        const changes = {
            'startDate': start,
            'endDate': end,
            'show': editShow
        }
        
        await Axios.post('http://localhost:5000/locations/editLoc/'+id, changes);

        setStart('');
        setEnd('');
        setEditShow(false);
        setEditLoc(false);
        setCurrentId('');
    }

    const locEditValues = (locId, bool, st, en, shouldShow) => {
        setEditShow(shouldShow);
        setStart(new Date(st));
        setEnd(new Date(en));
        setEditLoc(bool);
        setCurrentLocId(locId);
    }

    const fillEditValues = async (index, count, _id, locId) => {
        setCurrentId(_id);
        setEditCount(count);
        setCurrentLocId(locId);

        const item = await Axios.get('http://localhost:5000/inventory/item/' + _id);
        setMaxInv(item.data.onHand);
    }

    const onSave = async (_id, locId, oldCount, newCount) => {
        const header = { headers: {'level': userData.user?.level.toString()}};
        const updatedCount = {
            '_id': _id,
            'oldCount': oldCount,
            'newCount': newCount
        };
        await Axios.post('http://localhost:5000/locations/editinvcount/'+locId, updatedCount, header);
        setCurrentId('');
    }

    const date = (date) => {
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

        return month + '/' + day + ' -- ' + hour + ' ' + ext;
    }

    return (
        <div className="container">
            {userData.user?.level === 4 ? (
                <>
                    <h1 style={{textAlign: 'center'}}>Magage Locations, {userData.user.displayName}</h1>

                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', margin:'10px'}}>
                        <Button variant="outline-info" onClick={() => setModalShow(true)}>
                            Add a Location
                        </Button>
                    </div>

                    <AddLocationModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', borderBottom:'solid 2px'}}>
                        {/* <h2 style={{textAlign:'center'}}>Starting Date</h2> <h2 style={{textAlign:'center'}}>Location Name</h2> <h2 style={{textAlign:'center'}}>Ending Date</h2> */}
                    </div>
                    {inventory.map((loc, index) => (
                        <div style={{margin:'10px'}}>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <div style={{width:'250px', position:'relative'}}>
                                {((loc._id === currentLocId) && editLoc) ?  <div><DatePicker showTimeSelect dateFormat="Pp" selected={start} onChange={date => setStart(date)} /> to <DatePicker showTimeSelect dateFormat="Pp" selected={end} onChange={date => setEnd(date)} /> </div> :
                                    <p key={index++} style={{textAlign:'center', position:'absolute', bottom:'0', fontSize:'14px'}}>{date(loc.startDate)} to {date(loc.endDate)}</p>}
                                    </div>                              
                                <div style={{width:'250px', position:'relative'}}><p key={index++} style={{textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>{loc.location} </p></div>
                                <div style={{width:'250px', position:'relative'}}>
                                    {((loc._id === currentLocId) && editLoc) ? <div style={{textAlign:'center', fontSize:'20px'}}> <Form.Check label='Is Live?' defaultChecked={loc.show} onChange={() => setEditShow(!editShow)}/> </div>:
                                        <p key={loc._id} style={{textAlign:'center', fontSize:'20px'}}>{loc.show ? isLive : ntLive}</p>
                                    }
                                </div>
                                {((loc._id === currentLocId) && editLoc) ?  <Button variant="outline-info" onClick={() => editLocSubmit(loc._id)}>Save</Button>:
                                    <Button variant="outline-info" onClick={() => locEditValues(loc._id, true, loc.startDate, loc.endDate, loc.show)}>Edit</Button>
                                }
                            </div>
                            <Table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>On Hand</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {loc.inventory.map((items, index) => (
                                items.count != 0 ? <tr key={items.item}>
                                    {<td>{items.item}</td>}
                                    {<td>{items.description}</td>}
                                    {((items._id === currentId) && (currentLocId === loc._id)) ? <td><input value={editCount} type="number" max={maxInv} onChange={(e) => checkMinMax(e.target.value)} /></td> : <td>{items.count}</td>}
                                    {<td>${items.price}</td>}
                                    {((items._id === currentId) && (currentLocId === loc._id)) ? <td><Button variant="outline-info" type="submit" onClick={() => {onSave(items._id, loc._id, items.count, editCount)}}>Save</Button><Button variant="outline-info" type="submit" onClick={() => setCurrentId('')}>X</Button></td> : 
                                            <td><Button variant="outline-info" type="submit" onClick={() => {fillEditValues(items._id, items.count, items._id, loc._id)}}>Edit</Button></td>}
                                </tr> : <></>
                            ))}
                            </tbody>
                            </Table>
                            <div>
                            <Form>
                                <Form.Row className='align-items-center'>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control onChange={(e) => changeVal(loc._id, e.target.value)} as="select" className="mr-sm-2" custom>
                                            <option key={'0'} value='0'>Choose new item</option>
                                            {allInv.map((items, index) => (
                                                checkArr(loc.inventory, items.item) ? <></> : <option key={items._id} value={items._id}>{items.item} {items.onHand}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Form.Row>
                            </Form>
                            </div>
                            {error && (
                                <ErrorNotice message={error} clearError={() => setError(undefined)} />
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <>
                <h2>You do not have sufficient permissions for this page</h2>
                <Button variant="outline-info" href="/login">Login</Button>
                </>
            )}
        </div>
    )
}
