import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Table, Container } from 'react-bootstrap';
import Axios from 'axios';
import ErrorNotice from "../../misc/ErrorNotice";

export default function ManageInventory() {
    const {userData} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const [currentId, setCurrentId] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem("auth-token");
            const header = { headers: {'level': userData.user?.level.toString(), 'x-auth-token': token}};
            const users = await Axios.get('http://localhost:5000/users/getallusers', header);
            setUsers(users.data);
        }
        getUsers();
    }, [userData.user]);

    console.log(users);

    return (  
        <Container fluid="md">
            <div>
                <h1 style={{textAlign: 'center'}}>Magage Users, {userData.user?.displayName}</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Level</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.displayName}</td>
                            <td>{user.level}</td>
                            <td><Button variant="secondary" type="submit" onClick={() => (alert('edit'))}>Reset</Button><Button variant="secondary" type="submit" onClick={() => (alert('edit'))}>Remove</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}