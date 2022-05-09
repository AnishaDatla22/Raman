
import React, { Component } from 'react';
import Header from '../UIComponents/Header';
import nirImg from './../images/nir.png';
import btnImg from './../images/arrow.png';
import Plotly from '../UIComponents/charts/plotly';
import MessageBoxPreTreatment from '../UIComponents/MessageBox/MessageBoxPreTreatment';
import { Redirect } from 'react-router-dom';
import PlotlyLine from '../UIComponents/charts/plotlyLine';
import Spinner from '../UIComponents/Spinner/Spinner';
import DataTable from '../UIComponents/grid/DataTable';
import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import Comparision from './Comparision';
import Footer from './Footer';
import Dropdown from '../UIComponents/Dropdown';


class ModelBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            tableVisible:false,
            parentCategory:'',
            childCategory:'',
            Poultry:false,
            Pharma:false,
            Dairy:false,
            Agri:false,
            category:true,
            message:false,
            cls:false,
            upload:false,
            compare:false,
            params:[],
            drvalues:[],
            dropDown:false
            
          }
    }

    handleParams=(drval)=>{
        let values=[]
        drval.map((val,ind) =>{
            values.push(val['name'])


        })

        this.setState({
            drvalues:values.toString(),
            upload:true
        })
    }

    
    handleBackBtn(path){
        if (path == 'categories'){
            this.props.history.push("/dashboard");

        }
        else if (path == 'Poultry'){
            this.setState({
                Poultry:false,
                category: true,
                tableVisible: false
            })

        }
        else if (path == 'Agri'){
            this.setState({
                Agri:false,
                category: true,
                tableVisible: false
            })

        }
        else if (path == 'Pharma'){
            this.setState({
                Pharma:false,
                category: true,
                tableVisible: false
            })

        }
        else if (path == 'Dairy'){
            this.setState({
                Dairy:false,
                category: true,
                tableVisible: false
            })

        }


    }
   
    handleComparision=()=>{
        this.setState({
            upload:false,
            message:false,
            compare:true,
            tableVisible:false
           
           
        })
    }

    handleParent(parent){
        
        if (parent=='Poultry'){
            this.setState({
                parentCategory:parent,
                Poultry:true,
                category:false
            })
        }
        else if (parent=='Agri'){
            this.setState({
                parentCategory:parent,
                Agri:true,
                category:false
            })

        }
        else if (parent=='Pharma'){
            this.setState({
                parentCategory:parent,
                Pharma:true,
                category:false
               
            })
            
        }
        else if (parent=='Dairy'){
            this.setState({
                parentCategory:parent,
                Dairy:true,
                category:false
            })
            
        }
    }
    handleBack=()=>{
    this.setState({
        upload:true,
        compare:false,
        tableVisible:true,
      cls:true,
      loading:false
    })
}
    handleChild=(child)=>{
        this.setState({
            childCategory:child,
            category:false,
            Poultry:false,
            Pharma:false,
            Agri: false,
            Dairy: false,
            dropDown:true
            
        })
    }
    handlePreTreatment=()=>{
        this.setState({
            message:true
        })
    }
    handleClose=()=>{
        this.setState({
            message:false
        })
    }

    handleImport=e=>{

        this.setState({ selectedFile: e.target.files[0],
        loading:true }); 
        const formData = new FormData(); 
         
        // Update the formData object 
        formData.append( 
          "file", 
          e.target.files[0], 
        ); 
       
        // Details of the uploaded file 
        console.log( formData.get('file')); 
        localStorage.setItem('formData',formData)
    
        ApiGateWay.PostFile('/uploadFile?params='+this.state.drvalues,formData).then(res=>res.json()).then(res=>{
    console.log(JSON.parse(res.graph))
    localStorage.setItem('graph',res.graph)
    localStorage.setItem('table',res.table)
    localStorage.setItem('params',res.parameters)

    localStorage.setItem('first',res.first)
    localStorage.setItem('second',res.second)
    console.log(res.params)
    
    
    this.setState({
      data:JSON.parse(res.table),
      tableVisible:true,
      cls:true,
      loading:false
    })
        })
        .catch((error) => 
        this.setState({
          
    
        })
        );
      }
    componentDidMount(){
        ApiGateWay.Get('/parameters').then(response => response.json()).then(response => {
         this.setState({
             params:JSON.parse(response)
         })
           
        })
    
         
          }
    
    render() { 
        console.log(this.state.drvalues)
        
        return (  
            <>
            {this.state.message?<MessageBoxPreTreatment close={this.handleClose} compare={this.handleComparision} parent={this.state.parentCategory} child={this.state.childCategory} />:null}
            
              <Header />

              <div className='container-fluid middleSec'>
              {this.state.category? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleParent("Agri")} >Agri <img src={btnImg} className='btnImg' /> </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleParent("Dairy")} >Dairy <img src={btnImg} className='btnImg' /></button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleParent("Poultry")} >Poultry <img src={btnImg} className='btnImg' /></button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleParent("Pharma")} >Pharma <img src={btnImg} className='btnImg' /></button>
                                </center>
                        


                            </div>
                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBackBtn("categories")} >Back <img src={btnImg} className='reverse'/></button>
                                </center>

                            </div>


                           
                            </div>:null}

                    {this.state.Poultry ? <div className='row'>
                        <div className='spacer'></div>
                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Chick")} >Chick </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Broiler")} >Broiler </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Breeder")} >Breeder </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Layer")} >Layer </button>
                            </center>
                        </div>

                        <div className='col-md-3 backBtn'>
                            <center>
                                <button className='categories' onClick={() => this.handleBackBtn("Poultry")} >Back <img src={btnImg} className='reverse' /></button>
                            </center>

                        </div>
                    </div> : null}

                    {this.state.Agri ? <div className='row'>
                        <div className='spacer'></div>
                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Grains")} >Grains </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Oils")} >Oils</button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Fruits")} >Fruits </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Vegetables")}>Vegetables </button>
                            </center>
                        </div>

                        <div className='col-md-3 backBtn'>
                            <center>
                                <button className='categories' onClick={() => this.handleBackBtn("Agri")} >Back <img src={btnImg} className='reverse' /></button>
                            </center>

                        </div>
                    </div> : null}
                    {this.state.Pharma ? <div className='row'>
                        <div className='spacer'></div>
                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Granulation")} >Granulation </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Drying")}>Drying</button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Blending")} >Blending </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Compression")}>Compression</button>
                            </center>
                        </div>

                        <div className='col-md-3 backBtn'>
                            <center>
                                <button className='categories' onClick={() => this.handleBackBtn("Pharma")} >Back <img src={btnImg} className='reverse' /></button>
                            </center>

                        </div>
                    </div> : null}
                    {this.state.Dairy ? <div className='row'>
                        <div className='spacer'></div>
                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Milk")} >Milk</button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Cheese/Butter")}>Cheese/Butter</button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Whey")} >Whey </button>
                            </center>
                        </div>

                        <div className='col-md-3'>
                            <center>
                                <button className='categories' onClick={() => this.handleChild("Cassein")}>Cassein</button>
                            </center>
                        </div>

                        <div className='col-md-3 backBtn'>
                            <center>
                                <button className='categories' onClick={() => this.handleBackBtn("Dairy")} >Back <img src={btnImg} className='reverse' /></button>
                            </center>

                        </div>
                    </div> : null}
              {this.state.loading?<Spinner />:

              <div className={this.state.cls?'modelBuild1':'modelBuild'}>
              {this.state.dropDown?<div>
              <div className='row'>
                  <div className='col-md-4'></div>
                  <div className='col-md-4'><Dropdown data={this.state.params[this.state.parentCategory]} getParams={this.handleParams} /></div>
                


              </div>
              
              {this.state.upload?<div className="custom-file-upload">
              <h1>
              Upload a file for Model Building</h1>
              <label for="file-upload" class="custom-file-upload1">
              <i class="fa fa-cloud-upload"></i> Upload
              </label>
              <input id="file-upload" type="file" onChange={this.handleImport} />
                            </div> :null}</div>: null}
                            
    
            </div>
            
    }

{this.state.tableVisible?
                      <div >
                          <div className='row'>
                             
                            <div className='col-md-12'>
                            <DataTable actions={false} tableId='dpr' head={[Object.keys(this.state.data[0])]} users={this.state.data} data={[Object.keys(this.state.data[0])]} />


                            </div>

                            <center>
                                    <button className='elicoBtn2' onClick={this.handlePreTreatment} >Pretreatment <img src={btnImg} className='btnImg' /></button>
                                </center>
                            
                                <br />

                            </div>
                          </div>
                       :null}
    {this.state.compare?<Comparision parent={this.state.parentCategory} child={this.state.childCategory} back={this.handleBack}   />:null}

              </div>

              <Footer />
         
            </>
        );
    }
}
 
export default ModelBuilding;