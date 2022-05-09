import React, { Component } from 'react';
import PlotlyLine from '../UIComponents/charts/plotlyLine';

class Prediction extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
                <br />

                <div className='container-fluid'>
                    <div className='col-md-2 predSec'>
                        <div className='row pred'>
                            <p className='predCount'><b>Moisture</b><br />
                            23.22%</p>

                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className='row pred'>
                            <p className='predCount'><b>Protein</b><br />
                            15%</p>

                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className='row pred'>
                            <p className='predCount'><b>Fat</b><br />
                            0%</p>

                        </div>

                    </div>
                    <div className='col-md-8'>
                    <PlotlyLine hover={true}  xrange={JSON.parse(localStorage.getItem('values'))['min']} yrange={JSON.parse(localStorage.getItem('values'))['max']} legend={true} width={900} height={200} xlabel='Wavelength (nm)' ylabel='Absorbance' data={JSON.parse(localStorage.getItem('graph'))} label={Object.keys(JSON.parse(localStorage.getItem('graph'))[0]).slice(1,)}/>

                    </div>

                </div>


            </div>


        );
    }
}
 
export default Prediction;