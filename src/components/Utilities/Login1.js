import React, { Component } from 'react';
import {AuthService} from  './../services/AuthService';
import { Redirect } from 'react-router-dom';
import nirImg from './../images/nir.png';


import { ApiGateWay } from '../ApiGateWay/ApiGateWay';
import login from './../services/AuthService'


class Login1 extends Component {
  constructor(props) {

    super(props);
    localStorage.removeItem('currentUser')

    this.state={
        username:'',
        password:'',
        login:false,
        message:''


    }

}
userChange=event=>{
    this.setState({
    
        username:event.target.value
    
    
    })
}

passChange=event=>{
    this.setState({
    
        password:event.target.value
    
    
    })
}

 handleSubmit=e=>{
    e.preventDefault();
   
    
   ApiGateWay.Get('/userValidation?userName='+this.state.username+'&password='+this.state.password).then(response => response.json()).then(response => {
    localStorage.setItem('currentUser',JSON.stringify(response))
  localStorage.setItem('menu',JSON.stringify(response['moduleAccess']))
    localStorage.setItem('userName',response['userName'])
    localStorage.setItem('email',response['email'])
    localStorage.setItem('role',response['role'])
    localStorage.setItem('token',response['token'])
    localStorage.setItem('files',JSON.stringify(response['referrences']))
    localStorage.setItem('resolution',JSON.stringify(response['resolution']))


    this.setState({
      login:true
    })
   
   })
 
  }
  render() {
    console.log(this.state)
        if (this.state.login == true) {
            return <Redirect to ='/dashboard' />
        }
        const {loading,modalOpen} = this.state

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
    <input className="input-field" type="text" placeholder="Username" onChange={this.userChange} name="usrnm" />
  </div>

  <div className="input-container">
    <i className="fa fa-key iconl" />
    <input className="input-field" type="password"  onChange={this.passChange} placeholder="Password" name="psw" />
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
                    <button onClick={(e)=>this.handleSubmit(e)} className='btn btn-info loginbtn'><span className="glyphicon glyphicon-flash"></span>&nbsp;&nbsp;Login</button>

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

export default Login1;
