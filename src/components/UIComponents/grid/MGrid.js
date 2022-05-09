import DataTable from 'react-data-table-component';
import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';


const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

class MGrid extends Component {
constructor(props) {
  super(props);
  this.state={
    columns:[{name:"Wavelength",selector:"Wavelength",sortable:true},{name:"902.0",selector:"902.0",sortable:true}],
    rows:[{Wavelength:"Abs without water",902.0:0.600049}],
    loading:false

  }
}

handleColumns(){
  
  
  let mainData=this.props.label
  let ylabel=[]
  console.log('mamam',mainData)
  mainData.map((val,index)=>{

    ylabel.push(
      {
        
          name: val,
          selector: val,
          sortable: true,
        
      }
    )
    
    })
    console.log('ylabel',JSON.stringify(ylabel))
    this.setState({
      loading:false
        })

}

componentDidMount(){
  this.setState({
    loading:true
  })
  this.handleColumns()
}

  render() {


    return (
<div>
      {this.state.loading?<Spinner />:<DataTable
        title="Imported Data"
        columns={this.state.columns}
        data={this.state.rows}
      />
      }
      </div>
    )
  
};
}

export default MGrid;