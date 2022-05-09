import React, { Component } from 'react';
import Header from '../UIComponents/Header';
import Footer from './Footer';
import btnImg from './../images/arrow.png';
import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import MultiPrediction from './Prediction/MultiPrediction';



class PredictionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            category:true,
            MultiPrediction:false

        }


    }

    handleBack(path){
        if (path == 'categories'){
            this.props.history.push("/dashboard");

        }
        else if (path == 'Poultry'){
            this.setState({
                Poultry:false,
                category: true,
                MultiPrediction: false
            })

        }
        else if (path == 'Agri'){
            this.setState({
                Agri:false,
                category: true,
                MultiPrediction: false
            })

        }
        else if (path == 'Pharma'){
            this.setState({
                Pharma:false,
                category: true,
                MultiPrediction: false
            })

        }
        else if (path == 'Dairy'){
            this.setState({
                Dairy:false,
                category: true,
                MultiPrediction: false
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
        else if (parent == 'Dairy') {
            this.setState({
                parentCategory: parent,
                Dairy: true,
                category: false
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
                MultiPrediction:true,
                Poultry:false,
                Agri:false,
                Pharma: false,
                Dairy: false
              
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
   

    render() { 
        return ( 
            <>
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
                                    <button className='categories' onClick={() => this.handleBack("categories")} >Back <img src={btnImg} className='reverse' /></button>
                             </center>

                            </div>
                            </div>:null}
                    {this.state.Poultry? <div className='row'>
                      <div className='spacer'></div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Chick")} >Chick</button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Broiler")} >Broiler </button>
                                </center>
                        


                            </div>
                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Breeder")} >Breeder</button>
                                </center>
                            </div>

                            <div className='col-md-3'>
                                <center>
                                    <button className='categories' onClick={() => this.handleChild("Layer")} >Layer</button>
                                </center>
                            </div>


                            <div className='col-md-3 backBtn'>
                            <center>
                                    <button className='categories' onClick={() => this.handleBack("Poultry")} >Back <img src={btnImg} className='reverse' /></button>
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
                                    <button className='categories' onClick={() => this.handleChild("Oils")} >Oils</button>
                                </center>
                            </div>

                            <div className='col-md-3'>
                                <center>
                                <button className='categories' onClick={() =>this.handleChild("Fruits")} >fruits </button>
                                </center>
                            </div>

                            <div className='col-md-3'>
                                <center>
                                <button className='categories' onClick={() =>this.handleChild("Vegetables")}>Vegetables </button>
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
                                    <button className='categories' onClick={() => this.handleBack("Pharma")} >Back <img src={btnImg} className='reverse' /></button>
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
                                <button className='categories' onClick={() => this.handleBack("Dairy")} >Back <img src={btnImg} className='reverse' /></button>
                            </center>

                        </div>
                        </div> : null}
                    {this.state.MultiPrediction?
                        <MultiPrediction parent={this.state.parentCategory} child={this.state.childCategory} mlModels={this.state.mlModels}/>:null}
                        <div className='col-md-3 backBtn'>
                            <center>
                                <button className='categories' onClick={() => this.handleBack(this.state.parentCategory)} >Back <img src={btnImg} className='reverse' /></button>
                            </center>
                        </div>
                </div>
                <Footer />

            </>
        );
    }
}
 
export default PredictionTab;