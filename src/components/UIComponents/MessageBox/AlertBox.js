import React from 'react';

export function Success(props){
    return (  
        <div className="content-wrapper1">
            <div className='row'>
                <div className='col-md-12'>


                <div className="alert alert-success">
<strong>{props.title}</strong> {props.body}
    </div>
                </div>


            </div>
    
    </div>
    
    );


}


export function Info(props){
    return (  
        <div className="content-wrapper1">
            <div className='row'>
                <div className='col-md-12'>


                <div className="alert alert-info">
<strong>{props.title}</strong> {props.body}
    </div>
                </div>


            </div>
    
    </div>
    
    );


}
export function Warning(props){
    return (  
        <div className="content-wrapper1">
            <div className='row'>
                <div className='col-md-12'>


                <div className="alert alert-warning">
<strong>{props.title}</strong> {props.body}
    </div>
                </div>


            </div>
    
    </div>
    
    );


}
export function Danger(props){
    return (  
        <div className="content-wrapper1">
            <div className='row'>
                <div className='col-md-12'>


                <div className="alert alert-danger">
<strong>{props.title}</strong> {props.body}
    </div>
                </div>


            </div>
    
    </div>
    
    );


}

