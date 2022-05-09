import React, { Component } from 'react';
import Header from '../UIComponents/Header';
import MessageBoxSam from '../UIComponents/MessageBox/MessageBoxSam';
import MessageBoxMulti from '../UIComponents/MessageBox/MessageBoxMulti';

import Plotly from '../UIComponents/charts/plotly';
import { Redirect } from 'react-router-dom';
import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import Spinner from '../UIComponents/Spinner/Spinner';
import PlotlyLine from '../UIComponents/charts/plotlyLine';
import btnImg from './../images/arrow.png';

import Notifications from '../UIComponents/MessageBox/Notifications';
import Prediction from './Prediction';
import Footer from './Footer';
import MessageBoxSamRaman from '../UIComponents/MessageBox/MessageBoxSamRaman';

//this.state.tableData[0]['% Moisture Content']
//(Math.random() * (16 - 13) + 13).toFixed(1)


class Categories extends Component {
    constructor(props) {
        super(props);
        this.state={
            parentCategory:'',
            childCategory:'',
            Poultry:false,
            predRes:false,
            Pharma:false,
            Agri:false,
            category:true,
            Dairy:false,
            scan:false,
            prediction:false,
            redirect:false,
            loading:false,
            tableData:'',
            notify:false,
            message:'',
            overlay:false,
            fileName:'',
            res:0,
            sampleName:'',
            mlModels:[],
            predSection:false

           
        }
    }
   
    handlePredSec=()=>{
      

        this.setState({
            predSection:true,
            prediction:false
        })
    }


    handleScan=()=>{
      

        this.setState({
            prediction:false,
            category:true
        })
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
        else if (path == 'Dairy'){
            this.setState({
                Dairy:false,
                category:true
            })

        }


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

    handleChild=(child)=>{
        this.setState({
            childCategory:child,
            loading:true
        })
        ApiGateWay.Get('/allModels?parentName='+this.state.parentCategory+'&childName='+child).then(res=>res.json()).then(res=>{
            console.log(res)
           
            
            this.setState({
                loading:false,
                mlModels:res.Mlmodels,
                scan:true,
              
            })
                })
                .catch((error) => 
                this.setState({
                    scan:false,
                    loading:false,
                    notify:true,
                    message: 'Error in getting the models'
    
                  
            
                })
                );
    }
    

    handleoscan=()=>{
        this.setState({
           
            oscan:true
        })
    }

    handleOverlay=(name)=>{
        this.setState({
            loading:true,
            oscan:false
       
       
        })
        ApiGateWay.Get('/scanCustomOverlayMultiSpectralData?fileName='+this.state.fileName+'&parent='+this.state.parentCategory+'&child='+this.state.childCategory+'&name='+name+'&start=900&end=1700&repeat=5&&pattern=228&res='+this.state.res).then(res=>res.json()).then(res=>{
            console.log(res)
        localStorage.setItem('fileName',res.fileName)


        localStorage.setItem('graph',res.graph)
        localStorage.setItem('first',res.first)
        localStorage.setItem('second',res.second)
        
        this.setState({
            Poultry:false,
            Agri:false,
            Pharma: false,
            Dairy: false,
            loading:false,
            prediction:true,
            predSection:false,
            scan:false,
          
        })
            })
            .catch((error) => 
            this.setState({
                scan:false,
                loading:false,
                notify:true,
                message: 'Selected sample referrence not available. Please scan a referrence first'

              
        
            })
            );
}

    handleOverlayAuto=(name,time,number)=>{
    this.setState({
        loading:true,
        oscan:false
       
       
    })
    ApiGateWay.Get('/scanCustomOverlayAutoMultiSpectralData?stime='+time+'&number='+number+'&fileName='+this.state.fileName+'&parent='+this.state.parentCategory+'&child='+this.state.childCategory+'&name='+this.state.sampleName+'&start=900&end=1700&repeat=5&res='+this.state.res+'&pattern=228').then(res=>res.json()).then(res=>{
        console.log(res)
        localStorage.setItem('fileName',res.fileName)


        localStorage.setItem('graph',res.graph)
        localStorage.setItem('first',res.first)
        localStorage.setItem('second',res.second)
        
        this.setState({
            Poultry:false,
            Agri:false,
            Pharma: false,
            Dairy: false,
            loading:false,
            prediction:true,
            scan:false,
            predSection:false

          
        })
            })
            .catch((error) => 
            this.setState({
                scan:false,
                loading:false,
                notify:true,
                message: 'Selected sample referrence not available. Please scan a referrence first'

              
        
            })
            );
}

    handleClose=()=>{
    this.setState({
        scan:false,
        oscan:false
    })
}

    handlePrediction=(res,name,setting)=>{
        this.setState({
            loading:true,
            sampleName:name
           
           
        })

        ApiGateWay.Get('/scanSpectralData1?parent='+this.state.parentCategory+'&child='+this.state.childCategory+'&name='+name+'&start=900&end=1700&repeat=5&res='+res+'&pattern=228&setting='+setting).then(rest=>rest.json()).then(rest=>{
            console.log(res)
            localStorage.setItem('graph',rest.graph)
            localStorage.setItem('fileName',rest.fileName)

            localStorage.setItem('first',rest.first)
            localStorage.setItem('second',rest.second)
            
            this.setState({
                fileName:rest.fileName,
                Poultry:false,
                Agri:false,
                Pharma: false,
                Dairy: false,
                loading:false,
                prediction:true,
                scan:false,
                overlay:true,
                res:res
              
            })
                })
                .catch((error) => 
                this.setState({
                    scan:false,
                    loading:false,
                    notify:true,
                    message: 'Selected sample referrence not available. Please scan a referrence first'

                  
            
                })
                );
               {/*} ApiGateWay.Get('http://127.0.0.1:8000/pls').then(res=>res.json()).then(res=>{
                    console.log(res)
              
                    this.setState({
                        tableData:JSON.parse(res['preditedValues']),
                       
                    })
              
                    })*/}
              

      
    }


    render() {
        console.log(this.state.parentCategory)
        if (this.state.redirect == true) {
            return <Redirect to ='/categories' />
        }
        console.log(this.state.prediction)
        return (
            <>
            
             {this.state.scan?<MessageBoxSamRaman mlModels={this.state.mlModels} close={this.handleClose} prediction={this.handlePrediction} />:null}
             {this.state.notify?<Notifications close={this.handleClose} message={this.state.message} />:null}
             {this.state.oscan?<MessageBoxMulti close={this.handleClose} overlay={this.handleOverlay} auto={this.handleOverlayAuto} />:null}
               
          
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
                                <button className='categories' onClick={() => this.handleParent("Poultry")} >Poultry    <img src={btnImg} className='btnImg' /></button>
                                </center>
                            </div>
                            <div className='col-md-3'>
                                <center>
                                <button className='categories' onClick={() => this.handleParent("Pharma")} >Pharma   <img src={btnImg} className='btnImg' /></button>
                                </center>
                            </div>
                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("categories")} >Back <img src={btnImg} className='reverse' /></button>
                                </center>

                            </div>
                           
                            </div>:null}


                            {this.state.Poultry? <div className='row'>
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
                                    <button className='categories' onClick={() => this.handleBack("Poultry")} >Back <img src={btnImg} className='reverse' /></button>
                                </center>
                            </div>
                           
                            </div>:null}
                            {this.state.Dairy? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Milk")} >Milk</button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Cheese/Butter")} >Cheese/Butter </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Whey")} >Whey </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Cassein")} >Cassein </button>
                                </center>
                        


                            </div>

                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("Dairy")} >Back <img src={btnImg} className='reverse' /></button>
                                </center>

                            </div>
                           
                            </div>:null}
                            {this.state.Agri? <div className='row'>
                            <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Grains")} >Grains </button>
                                </center>
                            </div>

                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Oils")} >Oils </button>
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
                                    <button className='categories' onClick={() => this.handleBack("Agri")} >Back <img src={btnImg} className='reverse' /></button>
                                </center>

                            </div>
                            </div>:null}
                            {this.state.Pharma? <div className='row'>
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
                                    <button className='categories' onClick={() => this.handleChild("Blending")}>Blending</button>
                                </center>
                            </div>
                       
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Compression")}>Compression</button>
                                </center>
                            </div>

                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("Pharma")} >Back <img src={btnImg} className='reverse' /></button>
                                </center>

                            </div>
                           
                            </div>:null}
                            { this.state.loading?<Spinner /> :this.state.prediction?<div className='row'>
                            <div className='col-md-1'></div>
                           

                           <div className='col-md-12 '>
                               <br />
                             
                               <PlotlyLine xrange={JSON.parse(localStorage.getItem('values'))['min']} yrange={JSON.parse(localStorage.getItem('values'))['max']} legend={true} width={1250} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={JSON.parse(localStorage.getItem('graph'))} hover={true} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>


                           </div>


                     </div>:null}
                     { this.state.predSection?<Prediction />:null}


                     <br />
                           {this.state.overlay?
                           <div className='row'>
                          
                            <center>
                            <button className='categories' onClick={this.handleoscan} >Overlay </button>
                            &nbsp;<button className='categories' onClick={this.handlePredSec} >Prediction </button>
                                </center>
                            
                            </div>:null}

                            <br />
                      </div>
                <Footer />
    
            </>
        )
    }


}


export default Categories