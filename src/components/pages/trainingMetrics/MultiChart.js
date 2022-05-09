import React, { Component } from 'react';
import Chart  from 'chart.js';
import {Line} from 'react-chartjs-2';
import Chartplugin from '../../UIComponents/charts/Chartplugin';


class MultiChart extends  Component  {
    constructor(props){
        super(props);
        this.state={
         attributes:'F1'
           

        }


    }
    modelChange=(e)=>{
        this.setState({
            attributes:e.target.value
        })
    }
   
  
    render() {
      return (
        <div>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>

                    <div className="input-container">


                    <select name="pre" id="com" value={this.state.attributes} onChange={this.modelChange} >
                    <option>Select a Factor</option>

                    {this.props.label.map((name,ind) => 
                    
                    
                    name != 'Wavelength (nm)'?<option key={name} value={name}>{name}</option>:null)}

       
                   
                    

                    </select>
                    </div>

                </div>
            </div>
            <center>
            <Chartplugin data={this.props.graphData} label={[this.state.attributes]} width={950} height={350} /> </center>
        </div>
      );
    }
  }

  export default MultiChart;