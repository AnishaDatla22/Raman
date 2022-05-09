import React, { Component } from 'react';
import nirImg from './../images/nir.png';
import { Redirect } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            login:false
        }
    }
    handleLogin=()=>{
        this.setState({
            login:true
        })
    }
    render() {
        if (this.state.login == true) {
            return <Redirect to ='/dashboard' />
        }
        return (
            <>
                 <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3 className='logo'>NIRO</h3>
                    </div>
                    <div className='col-md-4 colcen'>
                        <p className='logoAbb'> NIR SPectroscopy Designed By Elico</p>
                        </div>
                </div>
            </div>
            <br />
            <br />


            <div className='container-fluid middleSecLogin'>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
               

            <div className='row'>
                    <div className='col-md-1'>

                    </div>
                    <div className='col-md-3'>
  <h2 className='title'>Login to NIR</h2>

                        </div>
                        </div>
                <div className='row'>
                    <div className='spacer'></div>
                    <div className='col-md-1'>

                    </div>
                    <div className='col-md-3'>

                    <form >
  <div className="input-container">
    <i className="fa fa-1x fa-user-o iconl" />
    <input className="input-field" type="text" placeholder="Username" name="usrnm" />
  </div>

  <div className="input-container">
    <i className="fa fa-key iconl" />
    <input className="input-field" type="password" placeholder="Password" name="psw" />
  </div>
</form>
<div className='spacer'></div>
<h2 className='title'>New User Registration</h2>
<h2 className='title'>Forgot Username / password</h2>



                    </div>
                    <div className='col-md-1'>
                        <hr />

                    </div>
                    <div className='col-md-2'>
                    <button onClick={this.handleLogin} className='btn btn-info loginbtn'><span class="glyphicon glyphicon-flash"></span>&nbsp;&nbsp;Login</button>

                    </div>
                    <div className='col-md-2'>
                        <hr />

                    </div>
                
                    <div className='col-md-2'>
                        <img src={nirImg} alt='nir' className='nirLoginImg'/>
                    </div>

                </div>
    

            </div>
            
            </>
        );
    }
}

export default Login;