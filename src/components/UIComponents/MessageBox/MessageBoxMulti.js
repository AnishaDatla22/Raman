import './MessageBox.css';
import btnImg from './../../images/arrow.png';


import React, { Component } from 'react';

class MessageBoxMulti extends Component {
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
    name:'',
    scans:0,
    pred:props.prediction,
    manual:false,
    auto:false,
    time:0,
    number:0
  }
}

userChange=(e)=>{
  this.setState({
   name:e.target.value
  })
}

timeChange=(e)=>{
  this.setState({
   time:e.target.value
  })
}

scanChange=(e)=>{
  this.setState({
   number:e.target.value
  })
}
handleManualBtn=()=>{
  this.setState({
    manual:true,
    auto:false
   })

}
handleAutoBtn=()=>{
  this.setState({
    manual:false,
    auto:true
   })

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
          <div className='row'>
            <div className='col-md-6'>
            <button className='elicoBtn2' onClick={this.handleManualBtn} >Manual <img src={btnImg} className='btnImg' /></button>
             
            </div>
            <div className='col-md-6'>
            <button className='elicoBtn2' onClick={this.handleAutoBtn} >Automatic <img src={btnImg} className='btnImg' /></button>
             
            </div>

          </div>
        {this.state.manual?<div className="input-container">
         
          
          <input className="input-scan" type="text" placeholder="Sample Name" onChange={this.userChange} name="usrnm" />

      </div>:null}
      {this.state.auto?<div>
        <div className="input-container">
         
          
          <input className="input-scan" type="text" placeholder="Sample Name" onChange={this.userChange} name="usrnm" />

      </div>
      <div className="input-container">
         
          
         <input className="input-scan" type="text" placeholder="Time(sec)" onChange={this.timeChange} name="usrnm" />

     </div>
     <div className="input-container">
         
          
     <input className="input-scan" type="text" placeholder="No of scans" onChange={this.scanChange} name="usrnm" />

 </div>
     </div>:null}
 
    <p>{this.state.message}</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal"onClick={this.state.manual?()=>this.props.overlay(this.state.name):()=>this.props.auto(this.state.name,this.state.time,this.state.number)}><b>SCAN</b></button>
        <br />
        <br />
        
        <button type="button"  data-dismiss="modal" className="btn btn-primary"  onClick={this.props.close}><b>Close</b></button>



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

export default MessageBoxMulti;