import React, { Component } from 'react';
import Chartplugin from '../../UIComponents/charts/Chartplugin';
import PlotlyLine from '../../UIComponents/charts/plotlyLine';
import PlotlyScatter from '../../UIComponents/charts/plotlyScatter';



class Metrics extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            tval:1,
            graphData:JSON.parse(this.props.mlMetrics['mse']),
            loading:false,
            trainReportGraph:true,
            first:true
        }
    }

    modelTrainReportChange=(e)=>{
        this.setState({
            graph:false,
            tval:e.target.value,
            loading:true
                })
        if (e.target.value == 1){
            this.setState({
                graphData:JSON.parse(this.props.mlMetrics['mse']),
                loading:false,
                trainReportGraph:true,
                first:false
            })
        }
        else if (e.target.value == 2){
            this.setState({
                graphData:JSON.parse(this.props.mlMetrics['loadings']),
                loading:false,
                trainReportGraph:true,
                first:false


            })
        }
        else if (e.target.value == 3){
            this.setState({
                graphData:JSON.parse(this.props.mlMetrics['scores']),
                loading:false,
                trainReportGraph:true,
                first:false


            })
        }
        else if (e.target.value == 4){
            this.setState({
                graphData:JSON.parse(this.props.mlMetrics['train']),
                loading:false,
                trainReportGraph:true,
                first:false


            })
        }
    }
    render() 
    { 
        console.log(this.props.mlTrainReport)
        return ( 
            <>

{this.props.mlTrainReport?
            <div>
                <div className='container-fluid metricsContainer'>
                <div className='row'>
                    <div className='col-md-3'>
                    <b><p className='elicoMetrics'>MSE calib: {this.props.mlMetrics['MSE_calib']}</p></b>
                        </div>
                        <div className='col-md-3'>
                        <b><p className='elicoMetrics'>MSE CV: {this.props.mlMetrics['MSE_cv']}</p></b>
                        </div>
                        <div className='col-md-3'>
                        <b> <p className='elicoMetrics'>R2 calib: {this.props.mlMetrics['R2_calib']}</p></b>
                        </div>
                        <div className='col-md-3'>
                        <b><p className='elicoMetrics'>R2 CV: {this.props.mlMetrics['R2_cv']}</p></b>
                        </div>
                    </div>
                    </div>
                    <div className='row'>
                        
                    {this.props.trainReportGraph?<div><div className='row'>
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
          


            </div>
            <div className='row'>
                <div className='container-fluid'>

                {this.state.first?<div className='row'>

                <center> <PlotlyLine xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='Number' ylabel='MSE' data={this.state.graphData} label={Object.keys(this.state.graphData[0])}/>
                </center>



                </div>:null}
                        
            {this.state.tval==="1"?<div>
                <div className='row'>

                <center> <PlotlyLine xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='Number' ylabel='MSE' data={this.state.graphData} label={Object.keys(this.state.graphData[0])}/>
               </center>

             

                </div>
            </div>:null}
            {this.state.tval==="2"?<div>
                <div className='row'>

                <center> <Chartplugin  width={1050} height={200} />    </center>

            
                </div>
            </div>:null}
            {this.state.tval==="3"?<div>
                <div className='row'>

                <center> <PlotlyScatter xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='F1' ylabel='F2' data={this.state.graphData} label={Object.keys(this.state.graphData[0])}/>
               </center>

               

                </div>
            </div>:null}
            {this.state.tval==="4"?<div>
                <div className='row'>

                <center> <PlotlyScatter xrange={0} yrange={306} legend={true} width={1050} height={200} xlabel='actual' ylabel='prediction' data={this.state.graphData} label={Object.keys(this.state.graphData[0])}/>
               </center>

               

                </div>
            </div>:null}
           

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

            </>

         );
    }
}
 
export default Metrics;