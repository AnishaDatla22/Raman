import './MessageBox.css';


import React, { Component } from 'react';
import {RangeSlide}  from '../RangeSlider';

class MessageBoxSamRaman extends Component {
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
    res:5,
    scans:5,
    setting:'',
    pred:props.prediction,
    name:''
  }
}

resChange=(e)=>{
  this.setState({
res:e.target.value

  })
}

userChange=(e)=>{
  this.setState({
   name:e.target.value
  })
}
modelChange=(e)=>{
  this.setState({
    setting:e.target.value
  })
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
  else if (e.target.value == 'Default'){
    this.setState({
      minValue:900,
      maxValue:1650,
      minRange:0,
      maxRange:306,
      res:4,
      scans:5
    })

  }
  else{
    this.setState({
      minValue:900,
      maxValue:1650,
      minRange:0,
      maxRange:306,
      res:10,
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
    console.log(this.props.mlModels)
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
        <div className="input-container">
         
          
          <input className="input-scan" type="text" placeholder="Sample Name" onChange={this.userChange} name="usrnm" />


   


  </div>
  <div className="input-container">
         
          
         <select className="input-scan"  placeholder="" onChange={this.modelChange}>
           <option>Select a System Setting</option>
           <option value='Default'>Default</option>

           {this.props.mlModels.map((name,ind) => <option key={name} value={name}>{name}</option>)}
          

           
           


           </select> 


  

 
 </div>

 <div className="input-container">
         
          
         <input className="input-scan" type="text" placeholder="Gain" onChange={this.gain} name="usrnm" />

 </div>
 <div className="input-container">
         
          
         <input className="input-scan" type="text" placeholder="Exposure time" onChange={this.etime} name="usrnm" />

 </div>
 <div className="input-container">
         
          
         <input className="input-scan" type="text" placeholder="Offset" onChange={this.offset} name="usrnm" />

 </div>
 <div className="input-container">
         
          
         <input className="input-scan" type="text" placeholder="Line Count" onChange={this.linecount} name="usrnm" />

 </div>
 <div className="input-container">
         
          
 <input className="input-scan" type="text" placeholder="Frame Count" onChange={this.framecount} name="usrnm" />

 </div>
 <div className="input-container">
         
          
         <input className="input-scan" type="text" placeholder="Laser Temp" onChange={this.ltemp} name="usrnm" />

 </div>
 
 
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal"onClick={()=>this.props.prediction(this.state.res,this.state.name,this.state.setting)}><b>SCAN</b></button>
<br />
<br />
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

export default MessageBoxSamRaman;