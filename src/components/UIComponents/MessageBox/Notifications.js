import './MessageBox.css';


import React, { Component } from 'react';
import {RangeSlide}  from '../RangeSlider';

class Notifications extends Component {
constructor(props) {
  super(props);
  this.state={
    message:props.message,
    model:'',
    range:false,
    minRange:'',
    maxRange:'',
    minValue:900,
    maxValue:1700,
    res:0,
    scans:0,
    pred:props.prediction
  }
}

modelChange=(e)=>{
  if (e.target.value == 'm1'){
    this.setState({
      minValue:1100,
      maxValue:1500,
      minRange:64,
      maxRange:257,
      res:5,
      scans:5
    })

  }
  else if (e.target.value == 'm2'){
    this.setState({
      minValue:1050,
      maxValue:1650,
      minRange:54,
      maxRange:300,
      res:4,
      scans:5
    })


  }
  else if (e.target.value == 'm3'){
    this.setState({
      minValue:1116,
      maxValue:1175,
      minRange:76,
      maxRange:100,
      res:5,
      scans:5
    })


  }
  else if (e.target.value == 'm4'){
    this.setState({
      minValue:900,
      maxValue:1650,
      minRange:0,
      maxRange:306,
      res:4,
      scans:5
    })

  }
  
}

componentDidMount(){
  const script=document.createElement('script');

  script.src='assets/js/modal.js';
  script.async=true;
  
  document.body.appendChild(script);
  



}

  
  render() {
    localStorage.setItem('values',JSON.stringify({'min':this.state.minRange,'max':this.state.maxRange}))

    return (
      <>
        <div className="content-wrapper1">
  <div className="row">
   
  </div>
  <div className="modal fade" id="modal-default">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          
    <h4 className="modal-title"></h4>
        </div>
        <div className="modal-body">
       
    <p class='notify'>{this.state.message}</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.close}><b>Close</b></button>


        </div>
      </div>
      {/* /.modal-content */}
    </div>
    {/* /.modal-dialog */}
  </div>

  </div>
      </>
    );
  }
}

export default Notifications;