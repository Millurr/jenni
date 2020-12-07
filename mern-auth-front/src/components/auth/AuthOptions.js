import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Button, NavDropdown } from 'react-bootstrap';

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    //console.log(userData);

    const register = () => history.push("/register");
    const login = () => history.push('/login');
    const manageInv = () => history.push('/manageinv');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <>
            {
                userData.user ? (
                    <>
                        {
                            (() => {
                                if (userData.user.level === 4)
                                    return <NavDropdown title="Admin Options" variant="outline-info" id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={manageInv}>Manage Inventory</NavDropdown.Item>
                                                {/* <NavDropdown.Item href="/manageloc">Manage Locations</NavDropdown.Item> */}
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/reports">Reports</NavDropdown.Item>
                                            </NavDropdown>
                            })()
                        }
                        <Button variant="outline-info" onClick={logout}>Log out</Button>
                    </>
                    ) : (
                    <>
                        <Button variant="outline-info" onClick={register}>Register</Button>
                        <Button variant="outline-info" onClick={login}>Log In</Button>
                    </>
            )}
            
        </>
    )
}
