import React from 'react';

export function Cart(props) {

    return (
        <a href="/cartpage">
            <div style={{fontSize: '38px', borderRadius:'50%', position:'fixed', bottom:15, right:15, height:75, width:75, backgroundColor:'black', alignItems:'center', opacity:'80%'}}>
                <div style={{margin:0, position:'absolute', top:'58%', left: '25%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
                    <p style={{color:'white', fontSize:'22px'}}>{props.count}</p>
                </div>
                <div style={{margin:0, position:'absolute', top:'50%', left: '60%', msTransform:'translate(-50%, -50%)', transform:'translate(-50%, -50%)'}}>
                    <i className="fa fa-shopping-cart fa-xs" style={{ariaHidden:"true", verticalAlign:'center', color:'white'}} />
                </div>
            </div>
        </a>
    )
}