import React, { Component } from 'react';
import Chart  from 'chart.js';
import {Line} from 'react-chartjs-2';


class Chartplugin extends  Component  {
    constructor(props){
        super(props);
        this.state={
          labels:[],
          datasets:[]
           

        }


    }
    lineChartData(){
      let number=this.props.data.length
      let rangeData=Array.from({length: number}, (_, i) => i + 1)
      let mainData=this.props.data
      

      let data=[]
      let count=0
      let bgcolor= ['#004876','#ec6607','#e20c18','#666','#844f38','#171815']

      this.props.label.map((val,index)=>{
        console.log(val)
        let x_Data=[]
        if (val=='Wavelength (nm)'){
          console.log('true')
      }
      else{
        mainData.map((value,ind)=>{

          x_Data.push(mainData[ind][val])
        })
        if (count==0){
        data.push(
          {
            label: val,
            backgroundColor: bgcolor[index],
            borderColor: bgcolor[index],
            borderWidth: 2,
            data: x_Data,
            fill:false
            },


        )
          }
        else{
          data.push(
            {
              label: val,
              backgroundColor: bgcolor[index],
              borderColor: bgcolor[index],
              borderWidth: 1,
              data: x_Data,
              fill:false,
              hidden:true
              }
          )

        }
        
          }
        count=count+1
       
    })
    console.log(data)
    this.setState({
      labels:rangeData,
      datasets:data
  })

      {/*let label=this.props.label
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
          type:'line',
          name:value,
          //marker:{color:bgcolor1[ind]}

      })
  })
  this.setState({
      data:data
  })*/}
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
      console.log(this.props.data)
      return (
        <div>
          <Line
            data={this.state}
            width={this.props.width} 
            height={this.props.height}
            options={{maintainAspectRatio: false,
              responsive: false,
              title:{
                display:true,
                fontSize:20
              },
              elements: {
                point:{
                    radius: 0
                }
            },
              legend:{
                display:true,
                position:'top'
              }
            }}
          />
        </div>
      );
    }
  }

  export default Chartplugin;