import React, { Component } from 'react';



class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
  <footer>
                  <div className = 'container-fluid conHei'>
                        <div className='row'>
                            <div className='col-md-4'></div>
                        <div className='col-md-4 colcen'>
                        <p className='logoAbb'> NIR SPectroscopy Designed By Elico</p>
                        </div>
                        </div>


                  </div>
                </footer>


            </>


         );
    }
}
 
export default Footer;