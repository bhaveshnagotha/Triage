import React , {useRef} from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
//import {Applogo} from '../Entryfile/imagepath.jsx'
import logo from './../../assets/img/logo2.png';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import AuthService from "../../Services/auth.service";


let schema = yup.object().shape({
    firstname: yup.string().required("Please enter first name").max(20),
    lastname: yup.string().required("Please enter last name").max(20),
    username: yup.string().required("Please enter username").max(20,'Username must be at most 25 characters'),
    email: yup.string().required("Please enter email address").email("Please enter valid email address"),
    password: yup.string().required("Please enter password").min(8,'Password must be at least 8 characters').max(15,'Password must be at most 15 characters'),          
    confirm_password: yup.string().required("Please enter confirm password").oneOf([yup.ref('password'), null], 'Passwords must match')
});


const Register = () => {

    const toastMsg = useRef(null);

    const displaySuccess = (msg) => {
        toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
    }
    const displayError = (msg) => {
        toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
    }    
    
    const { register, handleSubmit, reset,formState: { errors }} = useForm({
        resolver:yupResolver(schema),
    });
    const onSubmitForm = (data) => {         

    data["companyid"] = "1";
    data["roleId"] = "1";
    data["usertypeid"] = "1";
    data["phone"] = "9662948584";
    data["enabled"] = "true";    

    //delete data['confirm_password']; //It will return a new object
    console.log(data);

        AuthService.register(data).then(
            (response) => {
                if(response.status === 200) {
                    reset()
                    displaySuccess(response.data.message)
                }else{
                    displayError(response.data.message)
                }
                console.log(response.status)
              //setMessage(response.data.message);
              //setSuccessful(true);
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                displayError(resMessage)
                console.log(resMessage)
            //   setMessage(resMessage);
            //   setSuccessful(false);
            }
        );

        //console.log(data);
        //displaySuccess()
    } 

  return (
<>
    <Helmet>
        <title>Register</title>
        <meta name="description" content="Register page"/>					
    </Helmet>
    <div className="account-content">
        {/* <Link to="/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</Link> */}
        <div className="container">
            <Toast ref={toastMsg} /> 
            {/* Account Logo */}
            {/* <div className="account-logo">
            <Link to="/register"><img src={logo} alt="Corporate Event Management Solutions" /></Link>
            </div> */}
            {/* /Account Logo */}
            <div className="account-box">
            <div className="account-wrapper">
                <h3 className="account-title">Register</h3>
                <p className="account-subtitle">Access to our dashboard</p>
                {/* Account Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>First Name</label>
                                <input className={errors.firstname ? 'form-control is-invalid': 'form-control'} {...register("firstname")} type="text" maxLength="20"/>
                                {errors.firstname && <div className="invalid-feedback">
                                {errors.firstname?.message}
                                </div>}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input className={errors.lastname ? 'form-control is-invalid': 'form-control'} {...register("lastname")} type="text" maxLength="20"/>
                                {errors.lastname && <div className="invalid-feedback">
                                {errors.lastname?.message}
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input className={errors.username ? 'form-control is-invalid': 'form-control'} {...register("username")} type="text" maxLength="20"/>
                        {errors.username && <div className="invalid-feedback">
                        {errors.username?.message}
                        </div>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className={errors.email ? 'form-control is-invalid': 'form-control'} {...register("email")} type="text" maxLength="40"/>
                        {errors.email && <div className="invalid-feedback">
                        {errors.email?.message}
                        </div>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className={errors.password ? 'form-control is-invalid': 'form-control'} {...register("password")} type="password" maxLength="15"/>
                        {errors.password && <div className="invalid-feedback">
                        {errors.password?.message}
                        </div>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input className={errors.confirm_password ? 'form-control is-invalid': 'form-control'} {...register("confirm_password")} type="password" maxLength="15"/>
                        {errors.confirm_password && <div className="invalid-feedback">
                        {errors.confirm_password?.message}
                        </div>}
                    </div>

                    <div className="form-group text-center">                        
                        <button className="btn btn-primary account-btn" type="submit">Register</button>
                    </div>
                    <div className="account-footer">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>                
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

export default Register