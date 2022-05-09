import React, { Component } from 'react';
import Header from '../UIComponents/Header';
import MessageBox from '../UIComponents/MessageBox/MessageBox';
import Plotly from '../UIComponents/charts/plotly';
import { Redirect } from 'react-router-dom';
import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import Spinner from '../UIComponents/Spinner/Spinner';
import PlotlyLine from '../UIComponents/charts/plotlyLine';
import btnImg from './../images/arrow.png';
import Footer from './Footer';


//this.state.tableData[0]['% Moisture Content']
//(Math.random() * (16 - 13) + 13).toFixed(1)


class refCategories extends Component {
    constructor(props) {
        super(props);
        this.state={
            parentCategory:'',
            childCategory:'',
            Poultry:false,
            Pharma:false,
            Agri: false,
            Dairy: false,
            category:true,
            scan:false,
            prediction:false,
            graph:'',
            chart:false,
            redirect:false,
            loading:false,
            tableData:'',
            scanBtn:false,
            sensorTest:false
           
        }
    }

    handleBack(path){
        if (path == 'categories'){
            this.props.history.push("/dashboard");

        }
        else if (path == 'Poultry'){
            this.setState({
                Poultry:false,
                category:true
            })

        }
        else if (path == 'Agri'){
            this.setState({
                Agri:false,
                category:true
            })

        }
        else if (path == 'Pharma'){
            this.setState({
                Pharma:false,
                category:true
            })

        }
        else if (path == 'Dairy') {
            this.setState({
                Dairy: false,
                category: true
            })

        }


    }
   
    handleClose=()=>{
        this.setState({
            scan:false
                })

    }
    handleScan=()=>{
      

        this.setState({
            prediction:false,
            category:true
        })
    }
    handlePoultry(parent){
        
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
        else if (parent == 'Dairy') {
            this.setState({
                parentCategory: parent,
                Dairy: true,
                category: false
            })

        }
    }
    handleSoyaBean=(child)=>{
        this.setState({
            childCategory:child,
            scan:true
        })
    }

    handlePrediction=(res)=>{
        this.setState({
            loading:true,
            scanBtn:false
           
           
        })

        ApiGateWay.Get('/scanReferrenceData?name=ref&start=900&end=1700&repeat=5').then(res=>res.json()).then(res=>{
            console.log(res)
            localStorage.setItem('graph',)
            
            
            
            this.setState({
                graph:res.graph
               
              
            })
                })
                .catch((error) => 
                this.setState({
                    scanBtn:true
            
                })
                );
               {/*} ApiGateWay.Get('/pls').then(res=>res.json()).then(res=>{
                    console.log(res)
              
                    this.setState({
                        tableData:JSON.parse(res['preditedValues']),
                       
                    })
              
                    })*/}
              

      
    }

    handleScanRef=()=>{
        this.setState({
            loading:true,
            scanBtn:false
           
           
        })

        ApiGateWay.Get('/scanReferrenceData?name=ref&start=900&end=1700&repeat=5').then(res=>res.json()).then(res=>{
            console.log(res)
            
            
            
            this.setState({
                graph:JSON.parse(res.table),
                chart:true,
                loading:false

               
              
            })
                })
                .catch((error) => 
                this.setState({
                  loading:false,
                  scanBtn:true
            
                })
                );
      

      
    }

    componentDidMount(){
        ApiGateWay.Get('/sensorTest').then(response => response.json()).then(response => {
            
            this.setState({
              sensorTest:true,
              scanBtn:true
            })
        
           })
  
           .catch((error) => 
        this.setState({
            sensorTest:false
          
    
        })
        );
    }
    render() {
        if (this.state.redirect == true) {
            return <Redirect to ='/refcategories' />
        }
        console.log(this.state.graph)
        return (
            <>
             {this.state.scan?<MessageBox close={this.handleClose} files={JSON.parse(localStorage.getItem('files'))} parentCategory={this.state.parentCategory} childCategory={this.state.childCategory} prediction={this.handlePrediction} />:null}
          
                  <Header />
                  
                  <div className='container-fluid middleSec'>
                  { this.state.loading?<p className='centerAlign'> Scanning Please wait ........</p>:null}
                  

                                  {this.state.sensorTest?this.state.scanBtn?  <button className='categories centerAlign' onClick={() => this.handleScanRef()} >Scan <img src={btnImg} className='btnImg' /> </button>:null:<p className='centerAlign'>sensor not connected</p>}
                   <br />
                   <br />
                   {this.state.chart?<h3>Referrences</h3>:null}
                   {this.state.chart?
                   
                   <PlotlyLine xrange={0} yrange={306} legend={true} width={1250} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={this.state.graph} hover={true} label={Object.keys(this.state.graph[0]).slice(1,)}/>:null}
                        
                 {/*{this.state.category? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handlePoultry("Agri")} >Agri <img src={btnImg} className='btnImg' /> </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handlePoultry("Dairy")} >Dairy <img src={btnImg} className='btnImg' /></button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handlePoultry("Poultry")} >Poultry <img src={btnImg} className='btnImg' /></button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handlePoultry("Pharma")} >Pharma <img src={btnImg} className='btnImg' /></button>
                                </center>
                        


                            </div>
                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("categories")} >Back <img src={btnImg} className='btnImg reverse' /></button>
                                </center>

                            </div>
                            


                            </div>:null}


                            {this.state.Poultry? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleSoyaBean("Sunflower")} >Sunflower </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleSoyaBean("Groundnut")} >Groundnut </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleSoyaBean("Soyabean")} >Soyabean </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' >Coconut </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("Poultry")} >Back <img src={btnImg} className='btnImg reverse' /></button>
                                </center>

                            </div>
                            </div>:null}
                            {this.state.Agri? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleSoyaBean("Mango")} >Mango </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' >Banana </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={this.handleSoyaBean} >Grapes </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' >Coconut </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("Agri")} >Back <img src={btnImg} className='btnImg reverse' /></button>
                                </center>

                            </div>
                            </div>:null}
                            {this.state.Pharma? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleSoyaBean("AnimalFeed")} >AnimalFeed </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleSoyaBean("BirdFeed")}>BirdFeed</button>
                                </center>
                        


                            </div>
                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("Pharma")} >Back <img src={btnImg} className='btnImg reverse' /></button>
                                </center>

                            </div>
                           
                            </div>:null}
                            { this.state.loading?<Spinner /> :this.state.prediction?<div className='row'>
                      <div className='col-md-1'></div>
                           

                            <div className='col-md-12 '>
                                <br />
                              
                                <PlotlyLine  hover={true} xrange={JSON.parse(localStorage.getItem('values'))['min']} yrange={JSON.parse(localStorage.getItem('values'))['max']} legend={true} width={1250} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={JSON.parse(localStorage.getItem('graph'))} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>


                            </div>


        </div>:null} */}

                      </div>
               <Footer />
    
            </>
        )
    }


}


export default refCategories