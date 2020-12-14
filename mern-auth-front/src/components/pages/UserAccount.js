import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from '../misc/SuccessNotice';
import UserContext from '../../context/UserContext';
import { Button, Container } from 'react-bootstrap';
import Axios from 'axios';

export default function UserAccount() {
    const {userData} = useContext(UserContext);
    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPassCheck, setNewPassCheck] = useState('');
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    console.log(userData.user);

    const onSubmit = async () => {
        const update = {
            id: userData.user.id,
            password: current,
            newPassword: newPass,
            newPasswordCheck: newPassCheck
        };
        try {
            await Axios.post('http://localhost:5000/users/changepass', update);
            setCurrent('');
            setNewPass('');
            setNewPassCheck('');
            setSuccess("Password updated.");
        }
        catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }

    return (
        <Container fluid="md">
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'10px', justifyContent:'space-evenly'}}>
                {userData.user?.displayName}
                <input style={{padding:'5px', margin:'5px'}} placeholder="Current Password" type="password" onChange={(e) => setCurrent(e.target.value)}/>
                <input style={{padding:'5px', margin:'5px'}} placeholder="New Password" type="password" onChange={(e) => setNewPass(e.target.value)}/>
                <input style={{padding:'5px', margin:'5px'}} placeholder="New Password" type="password" onChange={(e) => setNewPassCheck(e.target.value)}/>
                <Button variant="secondary" onClick={onSubmit}>Update Password</Button>
                {error && (
                    <ErrorNotice message={error} clearError={() => setError(undefined)} />
                )}
                {success && (
                    <SuccessNotice message={success} clearMessage={() => setSuccess(undefined)} />
                )}
            </div>
        </Container>
    )
}