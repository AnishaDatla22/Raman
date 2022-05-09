import React from 'react';
import './spinner.css';
const Spinner=props => {
    
    return (
        <>
        <div id="overlayspi">
        <div className='loader'>
        <img src = 'assets/images/spinner.gif' alt='spinner'  style={{'width':'11%','zindex':'1000'}} />



        </div>
        </div>
        </>
    );
}

export default Spinner;
