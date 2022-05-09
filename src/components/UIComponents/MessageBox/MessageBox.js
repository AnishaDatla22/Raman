import './MessageBox.css';


import React, { Component } from 'react';
import {RangeSlide}  from './../RangeSlider';

class MessageBox extends Component {
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
      maxRange:378,
      res:3.51,
      scans:5
    })

  }
  
}

componentDidMount(){
  const script=document.createElement('script');

  script.src='assets/js/modal.js';
  script.async=true;
  
  document.body.appendChild(script);
  console.log(this.props.files)
  console.log(this.props.childCategory,this.props.parentCategory)


}

  
  render() {
    localStorage.setItem('values',JSON.stringify({'min':this.state.minRange,'max':this.state.maxRange}))
    localStorage.setItem('res',JSON.stringify({'res':this.state.res}))


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
        <p className='files'>Referrence files Available:</p>

           {this.props.files.map((val,index)=>
          {
            if (val.parent == this.props.parentCategory){
            return(
              val.child.map((value,ind)=>{
                if (value.childFolder==this.props.childCategory){
                return(
                  value.Files.map((values,indes)=>{
                      return(
                        <div className='col-md-4 files'>
                          {values}
                          </div>
                      )
                  })
                
                 
                 
                  
                 

                )}
              })
            
             
            
            )}
            }
          )}
          <hr></hr>
          <br />
         
        <div className="input-container">
       
         
         
          
          <input className="input-scan" type="text" placeholder="Sample Name" onChange={this.userChange} name="usrnm" />


   

  
  </div>
  <div className="input-container">
         
          
         <select className="input-scan"  placeholder="" onChange={this.modelChange}>
           <option>Select a System Setting</option>
           <option value='m1'>M1</option>
           <option value='m2'> M2</option>
           <option value='m3'>M3</option>
           <option value='m4'>M4</option>


           </select> 


  

 
 </div>
 <div className="input-container">
   <div className='row'>
     <div className='col-md-8'>
     <p className='rangeLabel'>Start Wavelength(nm):</p>
     </div>
     <div className='col-md-4'>
     <p><RangeSlide value={this.state.minValue} /></p>
     </div>
   </div>
  
   
 </div>
 <div className="input-container">
   <div className='row'>
     <div className='col-md-8'>
     <p className='rangeLabel'>End Wavelength(nm):</p>
     </div>
     <div className='col-md-4'>
     <p><RangeSlide value={this.state.maxValue} /></p>
     </div>
   </div>
  
   
 </div>
 <hr />
 <div className="input-container">
 <div className='row'>
     <div className='col-md-9'>
     <p className='rangeLabel'>Digital Resolution(nm):</p>
     </div>
     <div className='col-md-3'>
    <p className='rangeLabel'>{this.state.res}</p>
     </div>
   </div>

 </div>
 <div className="input-container">
 <div className='row'>
     <div className='col-md-8'>
     <p className='rangeLabel'>Average Scans:</p>
     </div>
     <div className='col-md-4'>
    <p className='rangeLabel'>{this.state.scans}</p>
     </div>
   </div>

 </div>
    <p>{this.state.message}</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>this.props.prediction(this.state.res)}><b>SCAN</b></button>
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

export default MessageBox;
