import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Table, Container } from 'react-bootstrap';
import Axios from 'axios';
import firebase from './Firebase';
import ErrorNotice from "../../misc/ErrorNotice";
import { FilePicker } from 'react-file-picker';

export default function ManageInventory() {
    const {userData} = useContext(UserContext);
    const [inventory, setInventory] = useState([]);
    const [item, setItem] = useState();
    const [description, setDescription] = useState();
    const [count, setCount] = useState();
    const [price, setPrice] = useState();
    const [imageName, setImageName] = useState();
    const [imagePath, setImagePath] = useState();
    const [error, setError] = useState();
    const [currentId, setCurrentId] = useState();
    const [editItem, setEditItem] = useState();
    const [editDescription, setEditDescription] = useState();
    const [editcount, setEditcount] = useState();
    const [editPrice, setEditPrice] = useState();
    const [editImgName, setEditImgName] = useState();
    const [editImgPath, setEditImgPath] = useState();
    

    useEffect(() => {
        const getInventory = async () => {
            const inv = await Axios.get("/inventory/all");
            setInventory(inv.data);
        }
        getInventory();
    }, [inventory])

    const onSubmit = async () => {
        let newItem = {'item': item, 'description': description, 'count': count, 'price': price, 'imageName': imageName, 'imagePath': imagePath};
        const header = { headers: {'level': userData.user?.level.toString()}}
        try {
            const addedItem = await Axios.post("/inventory/", newItem, header);
            inventory.push(addedItem);
            setInventory(inventory);
            setItem('');
            setDescription('');
            setCount('');
            setPrice('');
            setImageName(null);
            setImagePath(null);

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    //fill edit values so when the edit button is clicked, the default values will at least be the curren values
    const fillEditValues = (id, itemName, desc, have, price, imgName, path) => {
        setEditItem(itemName);
        setEditDescription(desc);
        setEditcount(have);
        setEditPrice(price);
        setCurrentId(id);
        setEditImgName(imgName);
        setEditImgPath(path);
    }

    const onEditSubmit = async (id) => {
        const header = { headers: {'level': userData.user?.level.toString()}}
        let updatedItem = {'item': editItem, 'description': editDescription, 'count': editcount, 'price': editPrice, 'imageName': editImgName, 'imagePath': editImgPath};

        try {
            await Axios.post("/inventory/edit/"+id, updatedItem, header);
            setCurrentId(undefined);
            setImagePath('');
            setImageName('');

        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    const onChooseImagePress = async (image) => {
        setImageName(image.name);
        uploadImage(image, image.name)
            .then(()=> {
                pushUrl(image.name)
                    .then(() =>{
                        console.log(imagePath);
                    })
                //alert("succuess")
            })
            .catch((error) => {
                alert(error)
            })
    }

    const uploadImage = async (image, imageName) => {
        var storage = firebase.storage();
        const ref = storage.ref().child('Store/' + imageName);
        return ref.put(image);
    }

    const pushUrl = async (imageName) => {
        var imageUrl = await firebase.storage().ref('Store/' + imageName).getDownloadURL();

        setImagePath(imageUrl);
    }

    return (
        <Container fluid="md">
            {userData.user?.level === 4 ? (
                <div>
                    <h1 style={{textAlign: 'center'}}>Magage Inventory, {userData.user.displayName}</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Count</th>
                                <th>Picture</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inventory.map(items => (
                            <tr key={items.item}>
                                {currentId === items._id ? <td><input value={editItem} onChange={(e) => setEditItem(e.target.value)}/></td> : <td>{items.item}</td>}
                                {currentId === items._id ? <td><input value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/></td> : <td>{items.description}</td>}
                                {currentId === items._id ? <td><input value={editcount} type="number" onChange={(e) => setEditcount(e.target.value)}/></td> : <td>{items.count}</td>}
                                {currentId === items._id ? <td><FilePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    onChange={(img) => {onChooseImagePress(img)}}
                                    //onClear={() => this.setState({ image: '' })}
                                    onError={errMsg => {}}>
                                        <button type="button" className="btn btn-primary">
                                            Click to change Image
                                        </button>
                                </FilePicker></td> :
                                <td>{items?.imageName}</td>
                                }
                                {currentId === items._id ? <td><input value={editPrice} type="number" min="0.01" step="0.01" onChange={(e) => setEditPrice(e.target.value)}/></td> : <td>${items.price}</td>}
                                {currentId === items._id ? 
                                    <td><Button variant="outline-info" type="submit" onClick={() => onEditSubmit(currentId)}>Save</Button><Button variant="outline-info" type="submit" onClick={() => setCurrentId('')}>X</Button></td> : 
                                    <td><Button variant="outline-info" type="submit" onClick={() => {fillEditValues(items._id, items.item, items.description, items.count, items.price, items.imageName, items.imagePath)}}>Edit</Button></td>}
                            </tr>
                        ))}
                        <tr>
                            <td><input value={item} onChange={(e) => setItem(e.target.value)}/></td>
                            <td><input value={description} onChange={(e) => setDescription(e.target.value)}/></td>
                            <td><input value={count} type="number" onChange={(e) => setCount(e.target.value)}/></td>
                            {imagePath == null ? <td> <FilePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                                    onChange={(img) => {onChooseImagePress(img)}}
                                    //onClear={() => this.setState({ image: '' })}
                                    onError={errMsg => {}}>
                                        <button type="button" className="btn btn-primary">
                                            Select Image
                                        </button>
                                </FilePicker> </td>
                                : <td>
                                    <FilePicker
                                    extensions={['jpg', 'jpeg', 'png']}
                                    onChange={(img) => {onChooseImagePress(img)}}
                                    //onClear={() => this.setState({ image: '' })}
                                    onError={errMsg => {}}>
                                        <button type="button" className="btn btn-primary">
                                            {imageName}
                                        </button>
                                </FilePicker>
                                </td>
                            }
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
        </Container>
    )
}
