import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Cart(props) {

    const history = useHistory();

    const cartpage = () => history.push('/cartpage');

    return (
        <a href="javascript:void(0)" onClick={cartpage}>
            <div style={{fontSize: '38px', borderRadius:'50%', position:'fixed', bottom:15, right:15, height:75, width:75, backgroundColor:'black', alignItems:'center', opacity:'80%', zIndex:10}}>
                {/* <div style={{margin:0, position:'absolute', top:'58%', left: '25%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
                    <p style={{color:'white', fontSize:'22px'}}>{props.count}</p>
                </div> */}
                <div style={{margin:0, position:'absolute', top:'50%', left: '50%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
                    <i className="fa fa-shopping-cart fa-xs" style={{ariaHidden:"true", verticalAlign:'center', color:'white'}} />
                </div>
            </div>
        </a>
    )
}