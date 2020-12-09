import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push('/login');
    const manageInv = () => history.push('/manageinv');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        history.push('/login');
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
                                    return  <> 
                                                <a className="w3-bar-item w3-button" onClick={manageInv}>Inventory</a>
                                                <a href="/reports" className="w3-bar-item w3-button">Reports</a>
                                            </>
                                    // return <NavDropdown title="Admin Options" variant="outline-info" id="basic-nav-dropdown">
                                    //             <NavDropdown.Item onClick={manageInv}>Manage Inventory</NavDropdown.Item>
                                    //             {/* <NavDropdown.Item href="/manageloc">Manage Locations</NavDropdown.Item> */}
                                    //             <NavDropdown.Divider />
                                    //             <NavDropdown.Item href="/reports">Reports</NavDropdown.Item>
                                    //         </NavDropdown>
                            })()
                        }
                        <a className="w3-bar-item w3-button" onClick={logout}><i className="fa" /> LOG OUT</a>
                        {/* <Button variant="secondary" onClick={logout}>Log out</Button> */}
                    </>
                    ) : (
                    <>
                        <a className="w3-bar-item w3-button" onClick={register}><i className="fa" /> REGISTER</a>
                        <a className="w3-bar-item w3-button"  onClick={login}><i className="fa" /> LOG IN</a>
                        {/* <Button variant="secondary" onClick={register}>Register</Button>
                        <Button variant="secondary" onClick={login}>Log In</Button> */}
                    </>
            )}
            
        </>
    )
}
