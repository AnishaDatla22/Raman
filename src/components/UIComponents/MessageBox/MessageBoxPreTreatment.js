import './MessageBox.css';


import React, { Component } from 'react';
import {RangeSlide}  from './../RangeSlider';
import PlotlyLine from '../charts/plotlyLine';
import Spinner from './../Spinner/Spinner';
import {ApiGateWay} from './../../ApiGateWay/ApiGateWay';
import Dropdown from '../Dropdown';


class MessageBox extends Component {
constructor(props) {
  super(props);
  this.state={
    message:props.message,
    mainData:JSON.parse(localStorage.getItem('graph')),
    loading:false,
    graph:false,
    btnactivate:false,
    graphData:[],
    name:'',
    sg:false,
    scValue:'',
    scBeforeStep:true,
    scNextStep:false,
    derivative:'1',
    polynomial:'1',
    window:'5',
    sv:false,
    svdata:[]
  }
}

handleSC=()=>{
this.setState({
  scBeforeStep:false,
  graph:false,
  scNextStep:true

})

}
handleSG=()=>{
  this.setState({
    loading:true,
  
  })
  ApiGateWay.Post('/savitzkyGolay?parentName='+this.props.parent+'&childName='+this.props.child+'&sample='+this.state.name+'&derivative='+this.state.derivative+'&polynomial='+this.state.polynomial+'&window='+this.state.window,JSON.parse(this.state.svdata)).then(rest=>rest.json()).then(rest=>{
    localStorage.setItem('sGolay',rest.smoothedData)
    localStorage.setItem('sGolay_table',rest.table)
    localStorage.setItem('polynomial',this.state.polynomial)
    localStorage.setItem('derivative',this.state.derivative)
    localStorage.setItem('window',this.state.window)


  
  this.setState({
                
      loading:false,
      graphData:rest.smoothedData,
      
      graph:true
    
  })
 
})
  
  }
userChange=(e)=>{
  this.setState({
   name:e.target.value
  })
  if (this.state.name.length>4){
    this.setState({
      btnactivate:true
    })
  }
  else{
    this.setState({
      btnactivate:false
    })

  }
}
derivativeChange=(e)=>{
  this.setState({
    derivative:e.target.value

  })
}
polynomialChange=(e)=>{
  this.setState({
    polynomial:e.target.value

  })
}
windowChange=(e)=>{
  this.setState({
    window:e.target.value

  })
}
modelChange=(e)=>{
  if (e.target.value == 'SNV'){


    this.setState({
      loading:true,
      scValue:e.target.value
    })
    ApiGateWay.Post('/SNV?parentName='+this.props.parent+'&childName='+this.props.child+'&sample='+this.state.name,this.state.mainData).then(rest=>rest.json()).then(rest=>{
        console.log(JSON.parse(rest.snv))
        localStorage.setItem('scatterCorrection',rest.snv)
        localStorage.setItem('scatterCorrection_table',rest.table)

        localStorage.setItem('model_sample_name',this.state.name)
            this.setState({
                
                loading:false,
                graphData:rest.snv,
                svdata:rest.snv,
                graph:true
                
              
            })
                })
                .catch((error) => 
                this.setState({
                    
                    loading:false,
                    graph:false

                  
            
                })
                );

  }
  else if (e.target.value == 'MSC'){


    this.setState({
      loading:true,
      scValue:e.target.value
    })
    ApiGateWay.Post('/MSC?parentName='+this.props.parent+'&childName='+this.props.child+'&sample='+this.state.name,this.state.mainData).then(rest=>rest.json()).then(rest=>{
      localStorage.setItem('scatterCorrection',rest.msc)
      localStorage.setItem('scatterCorrection_table',rest.table)


            this.setState({
                
                loading:false,
                graphData:rest.msc,
                svdata:rest.msc,
                graph:true
                
              
            })
                })
                .catch((error) => 
                this.setState({
                    
                    loading:false,
                    graph:false

                  
            
                })
                );

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
            {this.state.loading?<Spinner />:null}

            <h4 className="modal-title">Pre Treatment Module</h4>
          </div>
          <div className="modal-body">
          <div className='row'>

              {this.state.scBeforeStep? <div className='col-md-12'>
          
              
               
          <div className="input-container">


   <select name="pre" id="pre" onChange={this.modelChange}>
   <option>Select Scatter Correction</option>
   <option value="SNV">SNV</option>
   <option value="MSC">MSC</option>
  
</select>
</div>
    
   </div>:<div className='col-md-12'>
       <div className="input-container">
       
         
         
          
       <input className="input-scan" type="text" value={this.state.name} placeholder="Sample Name" onChange={this.userChange} name="usrnm"  disabled/>





</div>
       <div className="input-container">


   <select name="pre" id="pre" value={this.state.scValue} onChange={this.modelChange} disabled>
   <option>Select Pretreatment</option>

  
  
</select>
</div>
    
   </div>}
  
   
 </div>
 {this.state.scNextStep?<div className='row'>
   <div className='container'>

   <h4 className="modal-title">Savitzky Golay Module</h4>

   </div>

   <div className='col-md-4'>
      <select name="sg" id="pre" value={this.state.derivative} onChange={this.derivativeChange} >
   <option>Select Derivative</option>

  <option value="1">First</option>
  <option value="2">Second</option>
  
</select>


      </div>

      <div className='col-md-4'>
      <select name="sg" id="pre" value={this.state.polynomial} onChange={this.polynomialChange} >
   <option>Select Polynomial</option>

  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>

  
</select>


      </div>
      <div className='col-md-4'>
      <select name="sg" id="pre" value={this.state.window} onChange={this.windowChange} >
   <option>Select Window</option>

  <option value="5">5</option>
  <option value="7">7</option>
  <option value="9">9</option>
  <option value="11">11</option>
  <option value="13">13</option>

  <option value="15">15</option>

  <option value="17">17</option>

  <option value="19">19</option>

  <option value="21">21</option>


  
</select>


      </div>
     

 </div>:null}
 <br />
 
        {this.state.graph?< PlotlyLine hover={false}  xrange={0} yrange={306} legend={false} width={550} height={100} xlabel='Wavelength (nm)' ylabel='Absorbance' data={JSON.parse(this.state.graphData)} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>:null}

         
      
 



 
        </div>
        <div className="modal-footer">
        {this.state.scBeforeStep?this.state.btnactivate?<button type="button" className="btn btn-primary"  onClick={this.handleSC}><b>Apply</b></button>:null:
       <div>
       <button type="button" className="btn btn-primary"  onClick={this.handleSG}><b>Apply</b></button>
       <br /><br />
        <button type="button" data-dismiss="modal" className="btn btn-primary"  onClick={this.props.compare}><b>Save</b></button>

        </div>
        }
        <br /><br />

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

export default MessageBox;