import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Table } from 'react-bootstrap';
import Axios from 'axios';
import ErrorNotice from "../../misc/ErrorNotice";

export default function ManageInventory() {
    const [inventory, setInventory] = useState([]);
    const [item, setItem] = useState();
    const [description, setDescription] = useState();
    const [onHand, setonHand] = useState();
    const [price, setPrice] = useState();
    const [error, setError] = useState();
    const [currentId, setCurrentId] = useState();
    const [editItem, setEditItem] = useState();
    const [editDescription, setEditDescription] = useState();
    const [editOnHand, setEditOnHand] = useState();
    const [editPrice, setEditPrice] = useState();

    useEffect(() => {
        const getInventory = async () => {
            const inv = await Axios.get("http://localhost:5000/inventory/all");
            console.log(inv.data);
            setInventory(inv.data);
        }
        getInventory();
    }, [inventory])

    const onSubmit = async () => {
        let newItem = {'item': item, 'description': description, 'onHand': onHand, 'allocated': 0, 'price': price};
        const header = { headers: {'level': userData.user?.level.toString()}}
        try {
            const addedItem = await Axios.post("http://localhost:5000/inventory/", newItem, header);
            inventory.push(addedItem);
            setInventory(inventory);
            setItem('');
            setDescription('');
            setonHand('');
            setPrice('');
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    //fill edit values so when the edit button is clicked, the default values will at least be the curren values
    const fillEditValues = (id, itemName, desc, have, price) => {
        setEditItem(itemName);
        setEditDescription(desc);
        setEditOnHand(have);
        setEditPrice(price);
        setCurrentId(id);
    }

    const onEditSubmit = async (id) => {
        const header = { headers: {'level': userData.user?.level.toString()}}
        let updatedItem = {'item': editItem, 'description': editDescription, 'onHand': editOnHand, 'allocated': 0, 'price': editPrice};

        try {
            let newItem = await Axios.post("http://localhost:5000/inventory/edit/"+id, updatedItem, header);
            setCurrentId(undefined);

            //TODO Determine when the on hand count is lowered, it difference will be sent to the "trash"

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    const {userData} = useContext(UserContext);

    return (
        <div className="container">
            {userData.user?.level === 4 ? (
                <div>
                    <h1 style={{textAlign: 'center'}}>Magage Inventory, {userData.user.displayName}</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>On Hand</th>
                                <th>Allocated</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inventory.map(items => (
                            <tr key={items.item}>
                                {currentId === items._id ? <td><input value={editItem} onChange={(e) => setEditItem(e.target.value)}/></td> : <td>{items.item}</td>}
                                {currentId === items._id ? <td><input value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/></td> : <td>{items.description}</td>}
                                {currentId === items._id ? <td><input value={editOnHand} type="number" onChange={(e) => setEditOnHand(e.target.value)}/></td> : <td>{items.onHand}</td>}
                                <td>{items.allocated}</td>
                                {currentId === items._id ? <td><input value={editPrice} type="number" min="0.01" step="0.01" onChange={(e) => setEditPrice(e.target.value)}/></td> : <td>${items.price}</td>}
                                {currentId === items._id ? 
                                    <td><Button variant="outline-info" type="submit" onClick={() => onEditSubmit(currentId)}>Save</Button><Button variant="outline-info" type="submit" onClick={() => setCurrentId('')}>X</Button></td> : 
                                    <td><Button variant="outline-info" type="submit" onClick={() => {fillEditValues(items._id, items.item, items.description, items.onHand, items.price)}}>Edit</Button></td>}
                            </tr>
                        ))}
                        <tr>
                            <td><input value={item} onChange={(e) => setItem(e.target.value)}/></td>
                            <td><input value={description} onChange={(e) => setDescription(e.target.value)}/></td>
                            <td><input value={onHand} type="number" onChange={(e) => setonHand(e.target.value)}/></td>
                            <td> </td>
                            <td><input value={price} type="number" min="0.01" step="0.01" onChange={(e) => setPrice(e.target.value)}/></td>
                            <td><Button variant="outline-info" type="submit" onClick={onSubmit}>Add</Button></td>
                            {error && (
                                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                            )}
                        </tr>
                        </tbody>
                    </Table>
                </div>
            ) : (
                <>
                <h2>You do not have sufficient permissions for this page</h2>
                <Button variant="outline-info" href="/login">Login</Button>
                </>
            )}
        </div>
    )
}
