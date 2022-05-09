import React, { Component } from 'react'
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

class PlotlyScatter extends Component {
    constructor(props) {
        super(props)
   
        console.log(this.props.data)


        this.state = {
            data:[]
        }
    }
    
    lineChartData(){
        let mainData=this.props.data
        let data=[]
        let x_data=[]
        let label=this.props.label
        let bgcolor= ['#004876','#ec6607','#e20c18','#666','#844f38','#171815']
    
    let bgcolor1=bgcolor.slice(0,label.length)
        console.log(label)
        mainData.map((val,index)=>{
            x_data.push(val['Wavelength (nm)'])
           
        })
        
        label.map((value,ind)=>{
            let y_data=[]
            if (value=='Wavelength (nm)'){
                console.log('true')
            }
            else{

        mainData.map((val,index)=>{
            y_data.push(val[value])
        })
    }
        data.push({
            x:x_data.slice(this.props.xrange, this.props.yrange),
            y:y_data.slice(this.props.xrange, this.props.yrange),
            mode: 'markers',
            type:'line',
            name:value,
            //marker:{color:bgcolor1[ind]}

        })
    })
    this.setState({
        data:data
    })
    }
componentDidMount(){
    this.lineChartData()
}
componentDidUpdate(prevProps) {
       
    if ((prevProps.data !== this.props.data) || (prevProps.label !== this.props.label)) {
      this.lineChartData()
    }
   
  }
    render() {
        return (
            <Plot
            data={this.state.data}
            layout={ {width:this.props.width,height:this.props.heght,title: this.props.title,
            showlegend:this.props.legend ,
            config:{
                displaylogo:false         
               },      
               plot_bgcolor:"#fff",
        xaxis: {
            autorange: true,
            title: {
              text: this.props.xlabel,
              
                        
            },
            gridcolor: '#cecece', 
          },
          yaxis: {
            title: {
              text: this.props.ylabel,
             
             
             
            }, gridcolor: '#cecece', 
          },paper_bgcolor:"#fff",'border-radius': 10} }
          />
            
        )
    }
}

export default PlotlyScatter
