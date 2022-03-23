/* eslint-disable no-unused-vars */
import React,{useRef,useState,useEffect} from 'react'
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
//import {Applogo} from '../Entryfile/imagepath.jsx'
import logo from './../../assets/img/logo2.png';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Toast } from 'primereact/toast';
import AuthService from "../../Services/auth.service";

let schema = yup.object().shape({    
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),              
});

const Login = () => {

    const [userid,setUserId] = useState(null);
    const [token,setToken] = useState(null);


    const toastMsg = useRef(null);
    const navigate  = useNavigate();

    const displaySuccess = (msg) => {
        toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
    }
    const displayError = (msg) => {
        toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
    } 


    const { register, handleSubmit,reset, formState: { errors }} = useForm({
        resolver:yupResolver(schema),
    });
    const onSubmitForm = (data) => {    
        console.log(data);

        AuthService.login(data).then(
            (response) => {
                console.log(response.data.result)
                
                
                if(response.status === 200) {
                    localStorage.setItem('currentUser',JSON.stringify(response.data.result))                    
                    navigate("/dashboard");
                    window.location.reload(1)
                    reset()
                    
                }else{
                    displayError(response.data.message)
                }
                console.log(response.status)
              //setMessage(response.data.message);
              //setSuccessful(true);
            },
            (error) => {    
                if (error.response.status === 401) {
                    displayError(error.response.data.message)
                }
                if (error.response.status === 500) {
                    displayError("Username or password incorrect")
                }                         
                console.log(error)
            }
            
        );

    } 

    const getCurrentUserVal = ()=>{
        var currentUserData = AuthService.getCurrentUser();    
        //console.log(currentUserData)
        if(currentUserData){
          if(currentUserData.usertypeid && currentUserData.id_session){
            setUserId(currentUserData.usertypeid);
            setToken(currentUserData.id_session)
          }      
        }
      }

    if(userid != null && token != null){
        navigate("/dashboard");
    }

    useEffect( ()=>{    
        getCurrentUserVal()    
    },[]);

  return (
<>    
    <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page"/>					
    </Helmet>
    <div className="account-content">
        
        {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link> */}
        <div className="container">
        <Toast ref={toastMsg} />
            {/* Account Logo */}
            {/* <div className="account-logo">
            <Link to="/login"><img src={logo} alt="Corporate Event Management Solutions" /></Link>
            </div> */}
            {/* /Account Logo */}
            <div className="account-box">
            <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                {/* Account Form */}
                <div>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input className={errors.username ? 'form-control is-invalid': 'form-control'} {...register("username")} type="text" />
                        {errors.username && <div className="invalid-feedback">
                        {errors.username?.message}
                        </div>}
                    </div>
                    <div className="form-group">
                        <div className="row">
                        <div className="col">
                            <label>Password</label>
                        </div>
                        {/* <div className="col-auto">
                            <Link className="text-muted" to="/forgotpassword">
                            Forgot password?
                            </Link>
                        </div> */}
                        </div>
                        <input className={errors.password ? 'form-control is-invalid': 'form-control'} {...register("password")} type="password" />
                        {errors.password && <div className="invalid-feedback">
                        {errors.password?.message}
                        </div>}
                    </div>
                    <div className="form-group text-center">                        
                        <button className="btn btn-primary account-btn" type="submit">Login</button>
                    </div>
                    {/* <div className="account-footer">
                        <p>Don't have an account yet? <Link to="/register">Register</Link></p>
                    </div> */}
                </form>
                </div>
                {/* /Account Form */}
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Login