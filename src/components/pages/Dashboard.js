import React, { Component } from 'react';
import Header from '../UIComponents/Header';
import nirImg from './../images/nir.png';
import btnImg from './../images/arrow.png';
import Plotly from '../UIComponents/charts/plotly';
import MessageBox from '../UIComponents/MessageBox/MessageBox';
import { Redirect } from 'react-router-dom';
import PlotlyLine from '../UIComponents/charts/plotlyLine';
import Spinner from '../UIComponents/Spinner/Spinner';
import DataTable from '../UIComponents/grid/DataTable';

import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import Footer from './Footer';




class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            prediction:false,
            intro:true,
            scan:false,
            categories:false,
            refCategories:false,
            info:false,
            loading:false,
            categoriesOverlay:false,
            sensorTest:false
        }
    }
   
    handleBtn=()=>{
        this.setState({
            categories:true
        })
    }
    handleRefBtn=()=>{
        this.setState({
            refcategories:true
        })

    }
    handleInfo=()=>{
        this.setState({
            intro:false,
            info:true,
            prediction:false

        })
    }
    handleOverlayBtn=()=>{
        this.setState({
            categoriesOverlay:true
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
    
        ApiGateWay.PostFile('/uploadFile',formData).then(res=>res.json()).then(res=>{
    console.log(res)
    localStorage.setItem('graph',res.graph)
    localStorage.setItem('first',res.first)
    localStorage.setItem('second',res.second)
    
    
    this.setState({
      data:JSON.parse(res.table),
      tableVisible:true,
      intro:false,
      scanVisible:false,
      loading:false,
      prediction:true
    })
        })
        .catch((error) => 
        this.setState({
          
    
        })
        );
      }
    componentDidMount(){
        ApiGateWay.Get('/sensorTest').then(response => response.json()).then(response => {
            
            this.setState({
              sensorTest:true
            })
        
           })
  
           .catch((error) => 
        this.setState({
            sensorTest:false
          
    
        })
        );
    }
    render() {
        console.log(this.state.data)
        if (this.state.refcategories == true) {
            return <Redirect to ='/refcategories' />
        }
        if (this.state.categories == true) {
            return <Redirect to ='/categories' />
        }
        if (this.state.categoriesOverlay == true) {
            return <Redirect to ='/categoriesOverlay' />
        }
        
        return (
            <>
            {this.state.scan?<MessageBox />:null}
            
                  <Header />


                  <div className='container-fluid middleSec'>
                      {this.state.info?
                      <div >
                          <div className='row'>
                             
                            <div className='col-md-12'>
                            <DataTable actions={false} tableId='dpr' head={[Object.keys(this.state.data[0])]} users={this.state.data} data={[Object.keys(this.state.data[0])]} />


                            </div>

                            </div>
                          </div>
                       :null}
                      {/*<div>
                      <div className='row info'>
                          <h3>Reference:</h3>
<p>Use this tab to scan the reference sample.</p>
<p>
Select the required type of sample. If your product is not available select ‘other’.</p>
<p>Select either the default system settings given or you can customize the system settings using the custom option.
Once the settings are selected, make sure your sample is on the sensor and press scan.</p>
                          </div>
                          <div className='row info'>
                          <h3>Sample Analysis:</h3>

<p>If you already scanned the reference sample, the app will automatically use that for the unknown samples.
Similar to a reference scan, select the product category, system settings and then press scan.</p>
<p>Once scanned the data is stored in the system folder and the absorption graph is displayed.</p>
<p>Next the prediction tab can be used to get the moisture, fat or protein analysis.</p>
</div>
<div className='row info'>
                          <h3>Overlay:</h3>

<p>Similar to sample analysis, but multiple samples can be scanned at once and the data from all the scans will be displayed on the graph.
</p>
</div>


                      </div> */}  
                   
                  {this.state.intro? <div className='row'>
                            <div className='col-md-4'>
                                <center>
                                    <button className='elicoBtn' onClick={this.handleBtn} >Sample Analysis <img src={btnImg} className='btnImg' /></button>
                                </center>

                               
                                <center>
                                </center>


                            </div>
                            <div className='col-md-4'>
                           <center> <img src={nirImg} className='introImg' />
                           <br />
                           <br />
                           
                            {this.state.sensorTest?<p className='connected'>Connected</p>:<p className='notconnected'>Not Connected</p>}
                           </center>

                                
                            </div>
                            <div className='col-md-4'>
                                <center>
                                <button className='elicoBtn' onClick={this.handleRefBtn} >Reference <img src={btnImg} className='btnImg' /></button>
                                </center>
                                <center>
                                </center>



                            </div>

                      </div>:null}
                      { this.state.loading?<Spinner /> :this.state.prediction?<div className='row'>
                          

                            <div className='col-md-12 '>
                                <br />
                                <br />
                              
                                <PlotlyLine xrange={0} yrange={306} legend={true} width={1250} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={JSON.parse(localStorage.getItem('graph'))} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>


                            </div>


                      </div>:null}




                  </div>
<Footer />


            </>
        );
    }
}

export default Dashboard;
