import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions({setOptions, current}) {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push('/login');
    const manageInv = () => history.push('/manageinv');
    const manageUsers = () => history.push('/manageusers');
    const reports = () => history.push('/reports');

    return (
        <>
            {
                userData.user ? (
                    <>
                        {
                            (() => {
                                if (userData.user.level === 4)
                                    return  <> 
                                                <a className="w3-bar-item w3-button" onClick={manageInv}>INVENTORY</a>
                                                <a className="w3-bar-item w3-button" onClick={manageUsers}>USERS</a>
                                                <a className="w3-bar-item w3-button" onClick={reports}>REPORTS</a>
                                            </>
                            })()
                        }
                        {/* <a className="w3-bar-item w3-button" onClick={logout}><i className="fa" /> LOG OUT</a> */}
                        <a className="w3-bar-item w3-button" onClick={() => setOptions(!current)}><i className="fa" />ACCOUNT</a>
                    </>
                    ) : (
                    <>
                        <a className="w3-bar-item w3-button" onClick={register}><i className="fa" /> REGISTER</a>
                        <a className="w3-bar-item w3-button"  onClick={login}><i className="fa" /> LOG IN</a>
                    </>
            )}
            
        </>
    )
}
