import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Table, Container } from 'react-bootstrap';
import Axios from 'axios';
import ErrorNotice from "../../misc/ErrorNotice";
import SuccessNotice from '../../misc/SuccessNotice';

export default function ManageInventory() {
    const {userData} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem("auth-token");
            const header = { headers: {'level': userData.user?.level.toString(), 'x-auth-token': token}};
            const users = await Axios.get('http://localhost:5000/users/getallusers', header);
            setUsers(users.data);
        }
        getUsers();
    }, [userData.user]);

    const resetPassword = async (userId) => {
        let id = {'id': userId};
        const token = localStorage.getItem("auth-token");
        const header = { headers: {'level': userData.user?.level.toString(), 'x-auth-token': token}};
        try {
            const res = await Axios.put('http://localhost:5000/users/resetpassword', id, header);
            setSuccess(res.data.message);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    const removeAccount = async (userId) => {
        if (window.confirm('Delete this user?')) {
            let id = {'id' : userId};
            const token = localStorage.getItem("auth-token");
            const header = { headers: {'level': userData.user?.level.toString(), 'x-auth-token': token}};
            try {
                await Axios.delete('http://localhost:5000/users/asadmin/delete', id, header);
                setSuccess("User deleted.");
            }
            catch (err) {
                err.response.data.msg && setError(err.response.data.msg);
            }
        } else {
            console.log("User not deleted.");
        }
    }

    return (  
        <Container fluid="md">
            <div>
                <h1 style={{textAlign: 'center'}}>Magage Users, {userData.user?.displayName}</h1>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                {success && (
                    <SuccessNotice message={success} clearMessage={() => setSuccess(undefined)} />
                )}
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
                            <td>
                                <Button style={{marginRight:'5px', fontSize:'12px'}} variant="secondary" type="submit" onClick={() => (resetPassword(user._id))}>Reset</Button>
                            <Button style={{fontSize:'12px'}} variant="secondary" type="submit" onClick={() => (removeAccount(user._id))}>Remove</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}