import './MessageBox.css';
import btnImg from './../../images/arrow.png';
import {ApiGateWay} from './../../ApiGateWay/ApiGateWay';

import React, { Component } from 'react';

class MessageBoxML extends Component {
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
    mainData:JSON.parse(localStorage.getItem('table')),
    scatterCorrection:'SNV',
    name:'',
    scans:0,
    pred:props.prediction,
    regression:false,
    classification:false,
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
handleRegressionBtn=()=>{
  this.setState({
    regression:true,
    classification:false
   })

}
handleClassificationBtn=()=>{
  this.setState({
    regression:false,
    classification:true
   })

}
modelChange=(e)=>{
  if (e.target.value == 'PLS'){


    this.setState({
      loading:true,
      scValue:e.target.value
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
            <button className='elicoBtn2' onClick={this.handleRegressionBtn} >Regression <img src={btnImg} className='btnImg' /></button>
             
            </div>
            <div className='col-md-6'>
            <button className='elicoBtn2' onClick={this.handleClassificationBtn} >Classification <img src={btnImg} className='btnImg' /></button>
             
            </div>

          </div>
        {this.state.regression?<div className="input-container">
         <br />
        <select name="pre" id="pre" onChange={this.modelChange}>
  <option value = "PLS">Select a model</option>
  <option value="PLS">PLS</option>
  <option value="SVM">SVM</option>
  <option value="DT">Decision Tree</option>
  
</select>

      </div>:null}
      {this.state.classification?<div>
      <div className="input-container">
         
          

     </div>
     <div className="input-container">
         
          

 </div>
     </div>:null}
 
    <p>{this.state.message}</p>
        </div>
        <div className="modal-footer">
        <button type="button"  data-dismiss='modal' className="btn btn-primary" onClick={this.props.mlModel}><b>Apply</b></button>
        <br />
        <br />
        <button type="button"   data-dismiss='modal' className="btn btn-primary" onClick={this.props.close}><b>Close</b></button>


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

export default MessageBoxML;