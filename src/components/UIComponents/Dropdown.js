
import React, { Component } from 'react';

import Multiselect from 'multiselect-react-dropdown';

class Dropdown extends Component {
constructor(props) {
  super(props);
  this.state={
    options: []
  }
}

dropDownData(){
    let mainData=this.props.data
    console.log(mainData)
    
    let x_data=[]
    
    
    mainData.map((value,ind)=>{
        
       
   
        x_data.push({name:value,id:value})

})
this.setState({
    options:x_data
})

}

onSelect=(selectedList, selectedItem)=>{
  console.log(selectedList)
  this.props.getParams(selectedList)

 

}
    
componentDidMount()
  {
    this.dropDownData()
  }




  
  render() {
    
    
    return (
      <>
<Multiselect
options={this.state.options} // Options to display in the dropdown
selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
onSelect={this.onSelect} // Function will trigger on select event
onRemove={this.onRemove} 
placeholder={"Select the parameters"}
displayValue="name" // Property name to display in the dropdown options
style={{ searchBox:{ border: "none", "border-bottom": "2px solid black", "font-family": "inherit","color":"#000","padding":"5px" } }}

/>
         
      </>
    );
  }
}

export default Dropdown;