import React, { Component } from 'react';
import { ApiGateWay } from '../../ApiGateWay/ApiGateWay';
import DataTable from '../../UIComponents/grid/DataTable';
import btnImg from './../../images/arrow.png';





class MultiPrediction extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            upload:true,
            oval:'',
            selectedFile:'',
            tableVisible:false
         }
    }
modelChange=(e)=>{
    this.setState({
        oval:e.target.value
    })

}
handleImport=e=>{
        const formData = new FormData(); 
         
        // Update the formData object 
        formData.append( 
          "file", 
          e.target.files[0], 
        ); 
        this.setState({
            selectedFile:formData
        })

}

    handleMultiPred=()=>{
       
        ApiGateWay.PostFile('/uploadFilePred?parent='+this.props.parent+'&child='+this.props.child+'&model='+this.state.oval,this.state.selectedFile).then(res=>res.json()).then(res=>{
            console.log(res)
           
            
            this.setState({
                predResults:JSON.parse(res.prediction),
                loading:false,
                tableVisible:true,
                
              
            })
                })
                .catch((error) => 
                this.setState({
                    scan:false,
                    loading:false,
                    notify:true,
                    message: 'Error in getting the models'
    
                  
            
                })
                );
    
    }

    render() {
        console.log(this.state.oval) 
        return (  
                <>
{this.state.upload?
<div className='container-fluid'>


<div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>

            <div className="input-container">


<select name="pre" id="com" value={this.state.oval} onChange={this.modelChange} required>
<option>Select a Model</option>

{this.props.mlModels.map((name,ind) => <option key={name} value={name}>{name}</option>)}

</select>
</div>

            </div>
       


            </div>

    <center>
<div class="custom-file-upload">
   
<label for="file-upload" class="custom-file-upload1">
    <i class="fa fa-cloud-upload"></i> Upload a file
</label>
<input id="file-upload" type="file" onChange={this.handleImport}/>
</div>

<button className='elicoBtn2' onClick={this.handleMultiPred} type='submit' value='submit'>Predict<img src={btnImg} className='btnImg' /></button> 

</center>

<center>
    <div className='row'>
        <div className='col-md-2'>


        </div>
        <div className='col-md-8'>
        {this.state.tableVisible? <DataTable actions={false} tableId='dpr' head={[Object.keys(this.state.predResults[0])]} users={this.state.predResults} data={[Object.keys(this.state.predResults[0])]} />
                :null}

        </div>


    </div>
                 
               </center>

</div>
:null}
    
            
            
    




                </>


        );
    }
}
 
export default MultiPrediction;