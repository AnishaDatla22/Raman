import React, { Component } from 'react';
import { ApiGateWay } from '../../ApiGateWay/ApiGateWay';
import DataTable from '../../UIComponents/grid/DataTable';
import Metrics from '../trainingMetrics/Metrics';
import btnImg from './../../images/arrow.png';
import Spinner from './../../UIComponents/Spinner/Spinner';





class MultiPlots extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            upload:true,
            oval:'',
            selectedFile:'',
            tableVisible:false,
            graph:false
         }
    }
modelChange=(e)=>{
    this.setState({
        oval:e.target.value
    })
    ApiGateWay.Get('/metrics?parentName='+this.props.parent+'&childName='+this.props.child+'&model='+e.target.value).then(res=>res.json()).then(res=>{
        console.log(res)
       
        
        this.setState({
            loading:false,
            metrics:res.metrics,
            scan:true,
            MultiPrediction:true,
            Poultry:false,
            Agri:false,
            Pharma: false,
            Dairy: false,
            graph:true
          
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
        console.log(this.state.graph) 
        return (  
                <>
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



</center>

<center>
    <div className='row'>
       
        {this.state.graph? <Metrics trainReportGraph={true} mlTrainReport={true} mlMetrics={this.state.metrics} />
                :null}

       </div>
                 
               </center>

</div>
    
            
            
    




                </>


        );
    }
}
 
export default MultiPlots;