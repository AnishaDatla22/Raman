import React, { Component } from 'react';
import PlotlyLine from '../UIComponents/charts/plotlyLine';
import PlotlyScatter from '../UIComponents/charts/plotlyScatter';

import Spinner from '../UIComponents/Spinner/Spinner';
import btnImg from './../images/arrow.png';

import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import MessageBoxML from './../UIComponents/MessageBox/MesaageBoxML';
import DataTable from './../UIComponents/grid/DataTable';
import Chartplugin from '../UIComponents/charts/Chartplugin';
import MultiChart from './trainingMetrics/MultiChart';


class Comparision extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            oval:1,
            tval:0,
            predResults:[],
            loading:false,
            mlTrainReport:false,
            mlPredReport:false,
            mainData:JSON.parse(localStorage.getItem('table')),
            graphData:[],
            graph:false,
            trainReportGraph:false,
            scatterCorrection:'SNV',
            mlModel:false,
            mlMetrics:'',
            table:false,
            graphc:false,
            data:[],
            attributes:'F1',
            factordropDown:false,
            score:'F2',
            scoredropDown:false,
            predictDropDown:false,
            predict:'moisture',
            duplicate:''
         

            
        }

    }

    close=()=>{
    this.setState({
                    
        loading:false,
        mlModel:false
        
        
       
        
      
    })
}

    mlPredReportHandle=()=>{
    this.setState({
        mlPredReport:true,
        mlTrainReport:false

    })
}

modelFactorChange=(e)=>{
    this.setState({
        attributes:e.target.value
    })
}
modelPredictChange=(e)=>{
    this.setState({
        predict:e.target.value
    })
}
modelScoreChange=(e)=>{
    this.setState({
        score:e.target.value
    })
}


handleBack=()=>{
    this.setState({
        mlPredReport:false,
        mlTrainReport:true
    })
}
    mlModel=()=>{
        this.setState({
            loading:true,
            graph:false
        })
        
        ApiGateWay.Post('/plsAlgoritm?parentName=' + this.props.parent + '&childName=' + this.props.child + '&sample=' + localStorage.getItem('model_sample_name') + '&scatterCorrection=' + this.state.scatterCorrection + '&window=' + localStorage.getItem('window') + '&ploynomial=' + localStorage.getItem('polynomial') + '&derivative=' + localStorage.getItem('derivative'), this.state.mainData).then(rest=>rest.json()).then(rest=>{
        console.log(JSON.parse(rest.prediction))      
        this.setState({
                    
                    mlMetrics:rest,
                    graphData:JSON.parse(rest['mse']),

                    predResults:JSON.parse(rest.prediction),
                    loading:false,
                    mlPredReport:false,

                    mlTrainReport:true,
                    mlModel:false,
                    trainReportGraph:true,
                    tval:"1"
                    
                    
                   
                    
                  
                })
                    })
                    .catch((error) => 
                    this.setState({
                        
                        loading:false,
                        mlModel:false,
                        mlPredReport:false,
                        trainReportGraph:false


    
                      
                
                    })
                    );
    }

    modelTrainReportChange=(e)=>{
        this.setState({
            graph:false,
            tval:e.target.value,
            loading:true
                })
        if (e.target.value == 1){
            this.setState({
                graphData:JSON.parse(this.state.mlMetrics['mse']),
                loading:false,
                trainReportGraph:true,
                factordropDown:false,
                scoredropDown:false,
                predictDropDown:false
            
            })
        }
        else if (e.target.value == 2){
            this.setState({
                graphData:JSON.parse(this.state.mlMetrics['loadings']),
                loading:false,
                trainReportGraph:true,
                factordropDown:true,
                scoredropDown:false,
                predictDropDown:false


            })
        }
        else if (e.target.value == 3){
            this.setState({
                graphData:JSON.parse(this.state.mlMetrics['scores']),
                loading:false,
                trainReportGraph:true,
                factordropDown:false,
                scoredropDown:true,
                predictDropDown:false



            })
        }
        else if (e.target.value == 4){
            this.setState({
                graphData:JSON.parse(this.state.mlMetrics['train']),
                loading:false,
                trainReportGraph:true,
                factordropDown:false,
                scoredropDown:false,
                predictDropDown:true



            })
        }
    }
    modelChange=(e)=>{
        this.setState({
            oval:e.target.value,
            loading:true
                })
        if (e.target.value == 1){
            this.setState({
                graphData:JSON.parse(localStorage.getItem('graph')),
                loading:false,
                graph:true,
                table:false,
                graphC:true
            })
        }
        else if (e.target.value == 2){
            this.setState({
                graphData:JSON.parse(localStorage.getItem('scatterCorrection')),
                loading:false,
                graph:true,
                table:false,
                graphC:true



            })
        }
        if (e.target.value == 3){
            this.setState({
                graphData:JSON.parse(localStorage.getItem('sGolay')),
                loading:false,
                graph:true,
                table:false,
                graphC:true



            })
        }
        else if (e.target.value == 4){
            this.setState({
                data:JSON.parse(localStorage.getItem('table')),
                loading:false,
                graph:true,
                table:true,
                graphC:false



            })
        }
        
        else if (e.target.value == 5){
            this.setState({
                data:JSON.parse(localStorage.getItem('scatterCorrection_table')),
                loading:false,
                graph:true,
                table:true,
                graphC:false


            })
        }
        else if (e.target.value == 6){
            this.setState({
                data:JSON.parse(localStorage.getItem('sGolay_table')),
                loading:false,
                graph:true,
                table:true,
                graphC:false


            })
        }
    }

    handleMlModel=()=>{
        this.setState({
           mlModel:true


        })
    }

componentDidMount(){
        if (!!(this.state.mlMetrics)){
            console.log('true')
        
    }
    else{
        this.setState({
            loading:true,
            graphData:JSON.parse(localStorage.getItem('graph')),
            graph:true,
            loading:false,
            graphC:true

        })
    }

    }
    
    render() { 
        console.log(this.state.tval)
        return ( 
        <>  
        {this.state.mlModel?<MessageBoxML close={this.close} mlModel={this.mlModel} /> :null}
        {this.state.loading?<Spinner />:
        <div>
            <br />


            {this.state.mlTrainReport?
            <div>
            {this.state.predictDropDown?    <div className='container-fluid metricsContainer'>
                <div className='row'>
                    <div className='col-md-3'>
                    <b><p className='elicoMetrics'>MSE calib: {this.state.mlMetrics['MSE_calib']}</p></b>
                        </div>
                        <div className='col-md-3'>
                        <b><p className='elicoMetrics'>MSE CV: {this.state.mlMetrics['MSE_cv']}</p></b>
                        </div>
                        <div className='col-md-3'>
                        <b> <p className='elicoMetrics'>R2 calib: {this.state.mlMetrics['R2_calib']}</p></b>
                        </div>
                        <div className='col-md-3'>
                        <b><p className='elicoMetrics'>R2 CV: {this.state.mlMetrics['R2_cv']}</p></b>
                        </div>
                    </div>
                    </div>:null}
                    <div className='row'>
                        
                    {this.state.trainReportGraph?<div><div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>

            <div className="input-container">


<select name="pre" id="com" value={this.state.tval} onChange={this.modelTrainReportChange} >
<option>Select a Spectra</option>

<option value="1">MSE</option>
<option value="2">Loadings</option>
<option value="3">Scores</option>
<option value="4">Actual Vs Prediction</option>

</select>
</div>

            </div>
            {this.state.factordropDown?<div className='col-md-4'>

            <div className="input-container childDropdown">


<select name="loadings"  id="com" value={this.state.attributes} onChange={this.modelFactorChange} >
<option>Select a Factor</option>

{Object.keys(this.state.graphData[0]).map((name,ind) => 


name != 'Wavelength (nm)'?<option key={name} value={name}>{name}</option>:null)}





</select>
</div>

            </div>:null}

            {this.state.scoredropDown?<div className='col-md-4'>

<div className="input-container childDropdown">


<select name="scores"  id="com" value={this.state.score} onChange={this.modelScoreChange} >

{Object.keys(this.state.graphData[0]).slice(1,).map((name,ind) => 


name != 'F1'?<option key={name} value={name}>{name}</option>:null)}





</select>
</div>

</div>:null}
{this.state.predictDropDown?<div className='col-md-4'>

<div className="input-container childDropdown">


<select name="predict"  id="com" value={this.state.predict} onChange={this.modelPredictChange} >

{Object.keys(this.state.graphData[0]).map((name,ind) => 

name != 'Wavelength (nm)'?name.includes('actual')?<option key={name} value={name.split('_')[0]}>{name.split('_')[0]}</option>:null:null)}





</select>
</div>

</div>:null}
          


            </div>
            <div className='row'>
                <div className='container-fluid'>
           
            {this.state.tval==="1"?<div>
                <div className='row'>

                <center> <Chartplugin data={this.state.graphData} label={Object.keys(this.state.graphData[0])} width={950} height={350} />
               </center>

             

                </div>
            </div>:null}
            {this.state.tval==="2"?<div>
            <center> <Chartplugin data={this.state.graphData} label={[this.state.attributes]} width={950} height={350} /> </center>
               
            </div>:null}
            {this.state.tval==="3"?<div>
                <div className='row'>

                <center> <PlotlyScatter xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='F1' ylabel={this.state.score} data={this.state.graphData} label={[this.state.score]}/>
               </center>

               

                </div>
            </div>:null}
            {this.state.tval==="4"?<div>
                <div className='row'>

                <center> <PlotlyScatter xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='actual' ylabel='prediction' data={this.state.graphData} label={[this.state.predict+'_actual',this.state.predict+'_predict']}/>
                </center> 
                </div>
            </div>:null}
                                                <center>
                                                    <button className='elicoBtn2' onClick={this.props.back} >Back <img src={btnImg} className='reverse' /></button>
                                    &nbsp;&nbsp; <button className='elicoBtn2' onClick={this.mlPredReportHandle} >Prediction <img src={btnImg} className='btnImg' /></button>
                                    &nbsp;&nbsp; <button className='elicoBtn2' onClick={this.handleMlModel} >Select a Model <img src={btnImg} className='btnImg' /></button>

                                </center>
            

            </div>
            </div>
            <br />
            <br />
            </div>:null}

            

                </div>
                <br />
                <br />

            </div>
            
            
            :null
            
        
        }
        {this.state.mlPredReport?
            <div>
                <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                    <b><p>MSE calib: {this.state.mlMetrics['MSE_calib_pred']}</p></b>
                        </div>
                       
                        <div className='col-md-3'>
                        <b> <p>R2 calib: {this.state.mlMetrics['R2_calib_pred']}</p></b>
                        </div>
                       
                    </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2'></div>
                        <div className='col-md-8'>

               <center>
                   <DataTable actions={false} tableId='dpr' head={[Object.keys(this.state.predResults[0])]} users={this.state.predResults} data={[Object.keys(this.state.predResults[0])]} />
               </center>
               </div>

               <center>
                   <button className='elicoBtn2' onClick={this.handleBack} >Back <img src={btnImg} className='reverse' /></button>
                    &nbsp;&nbsp;<button className='elicoBtn2' onClick={this.handleMlModel} >Select a Model <img src={btnImg} className='btnImg' /></button>
               </center>
                </div>
                <br />
                <br />

            </div>
            
            
            :null
            
        
        }




            {this.state.graph?<div><div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>

            <div className="input-container">


<select name="pre" id="com" value={this.state.oval} onChange={this.modelChange} >
<option>Select a Spectra</option>

<option value="1">Original (graph)</option>
<option value="2">Scatter Corrected (graph)</option>
<option value="3">Savitzky Golay (graph)</option>
<option value="4">Original (table)</option>
<option value="5">Scatter Corrected (table)</option>
<option value="6">Savitzky Golay (table)</option>

</select>
</div>

            </div>
       


            </div>
            {this.state.graphC?<div className='row'>
                <div className='container-fluid'>
           
            <div>
                <div className='row'>
                <center> <PlotlyLine hover={true}  xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={this.state.graphData} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>
                </center>

                <center>
                <button className='elicoBtn2' onClick={this.props.back} >Back <img src={btnImg} className='reverse' /></button>
                 &nbsp;&nbsp;<button className='elicoBtn2' onClick={this.handleMlModel} >Select a Model <img src={btnImg} className='btnImg' /></button>                
                </center>
                </div>

            </div>
            </div>
            </div>:null}
            {this.state.table?<div className='row'>
                <div className='container-fluid'>
           
            <div>
                <div className='row'>
                <center><DataTable actions={false} tableId='dpr' head={[Object.keys(this.state.data[0])]} users={this.state.data} data={[Object.keys(this.state.data[0])]} />
                </center>

                <center>
                    <button className='elicoBtn2' onClick={this.props.back} >Back <img src={btnImg} className='reverse' /></button>
                    &nbsp;&nbsp; <button className='elicoBtn2' onClick={this.handleMlModel} >Select a Model <img src={btnImg} className='btnImg' /></button>
                </center>

                </div>
            </div>
            

            </div>
            </div>:null}
            <br />
            <br />
            </div>:null}
            </div>
    }


        </>

         );
    }
}
 
export default Comparision;