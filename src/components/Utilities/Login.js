import React, { Component } from 'react';
import {AuthService} from  './../services/AuthService';
import { Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import {authHeader} from './../helpers/auth-header';
import Menu from './../pages/Menu'




class Login extends Component {
constructor(props) {

    super(props);
    Cookie.remove('currentUser')
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

handleSubmit=event=>{
    event.preventDefault();
    
    if(AuthService.login(this.state.username,this.state.password)==true){
        this.setState({
          login:true

        })
        
        alert("Logged in successfully")
        console.log(authHeader())


    }
    else if(AuthService.login(this.state.username,this.state.password)==false){
      this.setState({
        login:false

      })  
      alert("Username or password is incorrect")

    }

    
}


    render() {
        if (this.state.login == true){

            return <Redirect to ='/dashboard' />
        }
        return (
         
            <>
             
            <div className="content-wrapper">

  {/* Content Header (Page header) */}
  <section className="content-header">
    <h1>
      Activity
      <small></small>
    </h1>
    <ol className="breadcrumb">
      <li><a href="#"><i className="fa fa-dashboard" /> Home</a></li>
      <li><a href="#">Forms</a></li>
      <li className="active">Activity</li>
    </ol>
  </section>
  {/* Main content */}
  <section className="content">
    <div className="row">
      {/* left column */}
      <div className="col-md-12">
        {/* general form elements */}
        <div className="box box-primary">
          <div className="box-header with-border">
            <h3 className="box-title"></h3>
          </div>
          {/* /.box-header */}
          {/* form start */}
          <form role="form" onSubmit={this.handleSubmit}>
            <div className="box-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input className="form-control" type='text' value={this.state.username} onChange={this.userChange}  />
              
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input className="form-control" type='text' value={this.state.password} onChange={this.passChange}  />
              
              </div>


             
              

             
            </div>
            {/* /.box-body */}
            <div className="box-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        {/* /.box */}
        {/* Form Element sizes */}
       
        {/* /.box */}
        
          {/* /.box-body */}
        {/* /.box */}
        {/* Input addon */}
      
            
              
            
        {/* /.box */}
      </div>
      {/*/.col (left) */}
      {/* right column */}
    
  {/* /.content */}
</div>
</section>
</div>
              
            </>
        );
    }
}

export default Login;