import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../../context/UserContext';

let opacity = '70%';

export default function AccountSettings({setOptions}) {
    const {setUserData} = useContext(UserContext);
    const history = useHistory();
    const [acc,
        setAcc] = useState(undefined);
    const [order,
        setOrder] = useState(undefined);
    const [log,
        setLog] = useState(undefined);
    const [close,
        setClose] = useState(undefined);

    const orderHistory = () => {
        history.push('/orderhistory');
        setOptions();
    }

    const userHistory = () => {
        history.push('/useraccount');
        setOptions();
    }

    const logout = () => {
        setUserData({token: undefined, user: undefined});
        history.push('/login');
        localStorage.setItem("auth-token", "");
        setOptions();
    };

    return (
        <div
            onClick={() => setOptions()}
            style={{
            width: '75%',
            height: '75%',
            position: 'absolute',
            zIndex: 10,
            top: '50%',
            left: '50%',
            msTransform: 'translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)'
        }}>
            <div
                style={{
                margin: 0,
                backgroundColor: 'black',
                opacity: '90%',
                position: 'relative',
                top: '50%',
                left: '50%',
                msTransform: 'translate(-50%, -50%)',
                transform: 'translate(-50%, -50%)',
                height: '400px',
                width: '300px',
                borderRadius: '25px'
            }}>
                <div
                    style={{
                    margin: 0,
                    position: 'absolute',
                    textAlign: 'center',
                    top: '50%',
                    left: '50%',
                    msTransform: 'translate(-50%, -50%)',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <div
                        onMouseEnter={() => setAcc(opacity)}
                        onMouseLeave={() => setAcc(undefined)}
                        style={{
                        width: '100%',
                        opacity: acc == undefined
                            ? '100%'
                            : acc,
                        borderBottom: '2px solid white'
                    }}>
                        <div
                            onClick={userHistory}
                            variant='secondary'
                            style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '5px'
                        }}>Account Info</div>
                    </div>
                    <br></br>
                    <div
                        onMouseEnter={() => setOrder(opacity)}
                        onMouseLeave={() => setOrder(undefined)}
                        style={{
                        width: '100%',
                        opacity: order == undefined
                            ? '100%'
                            : order,
                        borderBottom: '2px solid white'
                    }}>
                        <div
                            onClick={orderHistory}
                            variant='secondary'
                            style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '5px'
                        }}>Order History</div>
                    </div>
                    <br></br>
                    <div
                        onMouseEnter={() => setLog(opacity)}
                        onMouseLeave={() => setLog(undefined)}
                        style={{
                        width: '100%',
                        opacity: log == undefined
                            ? '100%'
                            : log,
                        borderBottom: '2px solid white'
                    }}>
                        <div
                            onClick={logout}
                            variant='secondary'
                            style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '5px'
                        }}>Log Out</div>
                    </div>
                    <br></br>
                    <div
                        onMouseEnter={() => setClose(opacity)}
                        onMouseLeave={() => setClose(undefined)}
                        style={{
                        width: '100%',
                        opacity: close == undefined
                            ? '100%'
                            : close,
                        borderBottom: '2px solid white'
                    }}>
                        <div
                            onClick={() => setOptions()}
                            variant='secondary'
                            style={{
                            color: 'white',
                            fontSize: '16px',
                            margin: '5px'
                        }}>Close</div>
                    </div>
                </div>
            </div>
        </div>
    )
}