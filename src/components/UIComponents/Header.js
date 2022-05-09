import logoImg from '../images/Logo.png';
import React, { Component } from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Header extends Component {
    render() {
        return (
            <>
            <div className='container-fluid'>
              <br />
              <br />
            </div>
            <nav className="navbar navbar-default" role="navigation">
                        <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"> <h5 className='mainLogo'>SprectraTreats</h5></a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active"><Link to="/dashboard"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;Home</Link></li>
                                <li><Link to='/categories'><span class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;Analysis</Link></li>
                                <li><Link to="/plots"><span class="glyphicon glyphicon-signal"></span>&nbsp;&nbsp;Plots</Link></li>
                                <li><Link to="/predictionTab"><span class="glyphicon glyphicon-scale"></span>&nbsp;&nbsp;Prediction</Link></li>
                                <li><Link to="/modelBuild"><span class="glyphicon glyphicon-th"></span>&nbsp;&nbsp;Model Building</Link></li>
                                <li><Link to="/info"><span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;Info</Link></li>
                            </ul> 
                        </div>{/* /.navbar-collapse */}
                        </div>{/* /.container-fluid */}
            </nav>

                
            </>
        );
    }
}

export default Header;
