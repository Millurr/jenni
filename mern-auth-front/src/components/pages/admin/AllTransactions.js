import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/UserContext';
import { Button, Table, Container } from 'react-bootstrap';
import Axios from 'axios';
import ErrorNotice from "../../misc/ErrorNotice";
import SuccessNotice from '../../misc/SuccessNotice';

export default function AllTransactions() {
    const {userData} = useContext(UserContext);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    return (  
        <div>
            {userData.user?.displayName}
        </div>
    )
}