import React, { Component } from 'react';



class DataTable extends Component {

  componentDidMount(){
    console.log(this.props.data)
    console.log(this.props.users)


    const script=document.createElement('script');

          script.src='js/datatables.js';
          script.async=true;
  
          document.body.appendChild(script);


     
    }
    render() {
        return (
           <>
    {/* Content Header (Page header) */}
    
    {/* Main content */}
      <div className="row">
        <div className="col-xs-12">
         
          <div className="box">
            <div className="box-header">
              <h3 className="box-title"></h3>
            </div>
            {/* /.box-header */}
            <div className="box-body">
              <table id={this.props.tableId} className="table table-bordered table-striped style-2">
                <thead>
                  <tr key ='head'>
                {this.props.head[0].map((val,index)=>
            {
                return(
                                 
                      <th>{val}</th>
                      
                    )}
          
                )
            }
              </tr>

                </thead>
                <tbody>
                       
                {this.props.users.map((val,ind)=>{
                    return(
                   <tr>

                  
                      {this.props.data[0].map((value,index)=>{
                        return(
                        
                      <td>{val[value]}</td>
                        
                        )


                      })}
                    
                    
                    </tr>
                    )


                })}
               

      
                </tbody>
              
              </table>

            </div>
            {/* /.box-body */}
          </div>
          {/* /.box */}
        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    {/* /.content */}
</>

        );
    }
}

export default DataTable;