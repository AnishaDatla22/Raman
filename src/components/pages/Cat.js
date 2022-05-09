import React, { Component } from 'react';



class Cat extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

   
    render() { 
        return ( 
            <>
                <Header />
                <div className='container-fluid middleSec'>
                {this.state.category ? <div className='row'>
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
                </div> : null}
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
                            <button className='categories' onClick={() => this.handleBack("Poultry")} >Back <img src={btnImg} className='reverse' /></button>
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
                            <button className='categories' onClick={() => this.handleBack("Agri")} >Back <img src={btnImg} className='reverse' /></button>
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
                            <button className='categories' onClick={() => this.handleBack("Pharma")} >Back <img src={btnImg} className='reverse' /></button>
                        </center>

                    </div>

                </div> : null}
                    {this.state.MultiPrediction ?
                        <MultiPlots parent={this.state.parentCategory} child={this.state.childCategory} mlModels={this.state.mlModels} /> : null}
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
 
export default Cat;