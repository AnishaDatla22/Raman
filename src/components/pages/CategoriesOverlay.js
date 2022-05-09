import React, { Component } from 'react';
import Header from '../UIComponents/Header';
import MessageBox from '../UIComponents/MessageBox/MessageBox';
import Plotly from '../UIComponents/charts/plotly';
import { Redirect } from 'react-router-dom';
import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import Spinner from '../UIComponents/Spinner/Spinner';
import PlotlyLine from '../UIComponents/charts/plotlyLine';
import btnImg from './../images/arrow.png';
import Notifications from '../UIComponents/MessageBox/Notifications';
import MessageBoxMulti from '../UIComponents/MessageBox/MessageBoxMulti';
import Footer from './Footer';


//this.state.tableData[0]['% Moisture Content']
//(Math.random() * (16 - 13) + 13).toFixed(1)


class CategoriesOverlay extends Component {
    constructor(props) {
        super(props);
        this.state={
            parentCategory:'',
            childCategory:'',
            Poultry:false,
            Pharma:false,
            Agri:false,
            category:true,
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
            oscan:false
        }
    }
   
    handleScan=()=>{
      

        this.setState({
            prediction:false,
            category:true
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

    handleChild=(child)=>{
        this.setState({
            childCategory:child,
            scan:true
        })
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
    ApiGateWay.Get('/scanCustomOverlayMultiSpectralData?fileName='+this.state.fileName+'&parent='+this.state.parentCategory+'&child='+this.state.childCategory+'&name='+name+'&start=900&end=1700&repeat=5&res='+this.state.res).then(res=>res.json()).then(res=>{
        console.log(res)
        localStorage.setItem('fileName',res.fileName)


        localStorage.setItem('graph',res.graph)
        localStorage.setItem('first',res.first)
        localStorage.setItem('second',res.second)
        
        this.setState({
            Poultry:false,
            Agri:false,
            Pharma:false,
            loading:false,
            prediction:true,
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

handleClose=()=>{
    this.setState({
        notify:false
    })
}
    handlePrediction=(res)=>{
        this.setState({
            loading:true
           
           
        })

        ApiGateWay.Get('/scanCustomOverlaySpectralData?parent='+this.state.parentCategory+'&child='+this.state.childCategory+'&name=Soyabean&start=900&end=1700&repeat=5&res='+res).then(res=>res.json()).then(res=>{
            console.log(res)
            localStorage.setItem('fileName',res.fileName)


            localStorage.setItem('graph',res.graph)
            localStorage.setItem('first',res.first)
            localStorage.setItem('second',res.second)
            
            this.setState({
                Poultry:false,
                overlay:true,
                Agri:false,
                Pharma:false,
                loading:false,
                prediction:true,
                scan:false,
                res:res.resolution,
                fileName:res.fileName
              
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
               {/*} ApiGateWay.Get('/pls').then(res=>res.json()).then(res=>{
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
            
             {this.state.scan?<MessageBox files={JSON.parse(localStorage.getItem('files'))} parentCategory={this.state.parentCategory} childCategory={this.state.childCategory} prediction={this.handlePrediction} />:null}
             {this.state.oscan?<MessageBoxMulti overlay={this.handleOverlay} />:null}

             {this.state.notify?<Notifications close={this.handleClose} message={this.state.message} />:null}

          
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
                            


                          
                            </div>:null}


                            {this.state.Poultry? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Sunflower")} >Sunflower </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Groundnut")} >Groundnut </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Soyabean")} >Soyabean </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' >Coconut </button>
                                </center>
                        


                            </div>
                            </div>:null}
                            {this.state.Agri? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Mango")} >Mango </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' >Banana </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={this.handleChild} >Grapes </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' >Coconut </button>
                                </center>
                        


                            </div>
                            </div>:null}
                            {this.state.Pharma? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("AnimalFeed")} >AnimalFeed </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("BirdFeed")}>BirdFeed</button>
                                </center>
                        


                            </div>
                           
                            </div>:null}
                            { this.state.loading?<Spinner /> :this.state.prediction?<div className='row'>
                            <div className='col-md-1'></div>
                           

                           <div className='col-md-12 '>
                               <br />
                             
                               <PlotlyLine xrange={JSON.parse(localStorage.getItem('values'))['min']} hover={true}  yrange={JSON.parse(localStorage.getItem('values'))['max']} legend={true} width={1250} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={JSON.parse(localStorage.getItem('graph'))} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>


                           </div>
                       

                     </div>:null}
                     <br />
                           {this.state.overlay?
                           <div className='row'>
                           <div className='col-md-4 '>
                            </div>
                            <div className='col-md-4 '>

                            <center>
                                    <button className='categories' onClick={this.handleoscan} >Overlay </button>
                                </center>
                            </div>
                            <div className='col-md-4 '>
                            </div>
                            </div>:null}

                            <br />
                      </div>
                     <Footer />
            </>
        )
    }


}


export default CategoriesOverlay