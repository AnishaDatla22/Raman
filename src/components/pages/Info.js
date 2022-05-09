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

//this.state.tableData[0]['% Moisture Content']
//(Math.random() * (16 - 13) + 13).toFixed(1)


class Info extends Component {
    constructor(props) {
        super(props);
        this.state={
            

           
        }
    }
   
    

    render() {
        
        return (
            <>
            
          
                  <Header />
                  
                  <div className='container-fluid middleSec'>
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


                      </div>

                            <br />
                <Footer />
    
            </>
        )
    }


}


export default Info