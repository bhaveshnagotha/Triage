import React , {useRef,useEffect} from 'react'
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
import $ from 'jquery';

let schema = yup.object().shape({
    firstname: yup.string().required("Please enter first name").max(20),
    lastname: yup.string().required("Please enter last name").max(20),
    phone: yup.string().required("Please enter phone number"),
    email: yup.string().required("Please enter email address").email("Please enter valid email address"),    
});


const Rsvp = () => {

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
    
    } 

    useEffect( ()=>{    

        if($('.select').length > 0) {
          $('.select').select2({
            minimumResultsForSearch: -1,        
            width: '100%'
          });
        }            
    
     });

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
                <div className="top-rsvp-heading">
                    <h2 className="h2-horizontal-line"><span>RSVP</span></h2>
                    <h3 className="text-center">Event A</h3>
                    <p className="account-subtitle">March 09, 2022</p>
                </div>    
                

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group text-center">                                
                                        
                        <label>Please let us know if you will be able to make it.</label><br/>
                        <div className="form-check form-check-inline">
                            <input defaultChecked className="form-check-input" type="radio" name="status" id="preview_active" defaultValue="Active" />
                            <label className="form-check-label" htmlFor="preview_active">Yes, I'll be there</label>
                        </div><br/>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="status" id="preview_inactive" defaultValue="Inactive" />
                            <label className="form-check-label" htmlFor="preview_inactive">No, I can't make it</label>
                        </div>

                        </div>
                    </div>
                </div>
                <div className="h3 card-title">                        
                    <label>CONTACT INFO</label>
                </div>

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
                        <label>Phone</label>
                        <input className={errors.phone ? 'form-control is-invalid': 'form-control'} {...register("phone")} type="text" maxLength="20"/>
                        {errors.phone && <div className="invalid-feedback">
                        {errors.phone?.message}
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
                        <select className="select">                  
                            <option>NUMBER OF PEOPLE ATTENDING</option>
                            <option>10</option>
                            <option>20</option>                  
                        </select>                  
                    </div>                    

                    <div className="col-sm-12 col-md-12"> 
                        <div className="card">
                            <div className="card-header">
                            <label className="card-title mb-0">CHOOSE EVENTS YOU WILL PARTICIPATE</label>
                            </div>
                            <div className="col-sm-12 col-md-12 mt-2"> 
                            <div className="card-body">
                                <div className="table-responsive">
                                <table className="table table-nowrap mb-0">
                                    
                                    <tbody>
                                    <tr>
                                    <td>
                                        <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="group" defaultChecked/>
                                        <label className="form-check-label" htmlFor="group">
                                            All
                                        </label>
                                        </div>
                                    </td>
                                    <td>600 Rs/per person</td>                                                                           
                                    </tr>
                                    <tr>
                                    <td>
                                        <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="group"/>
                                        <label className="form-check-label" htmlFor="group">
                                            Event A
                                        </label>
                                        </div>
                                    </td>
                                    <td>200 Rs/per person</td>                                        
                                    
                                    </tr>
                                    <tr>
                                    <td>
                                        <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="group"/>
                                        <label className="form-check-label" htmlFor="group">
                                            Event B
                                        </label>
                                        </div>
                                    </td>
                                    <td>200 Rs/per person</td>                                        
                                    
                                    </tr>
                                    <tr>
                                    <td>
                                        <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="group"/>
                                        <label className="form-check-label" htmlFor="group">
                                            Event C
                                        </label>
                                        </div>
                                    </td>
                                    <td>200 Rs/per person</td>                                        
                                    
                                    </tr>
                                    
                                    </tbody>
                                </table>
                                                                    
                                </div>
                            </div>
                            </div>
                        </div>    
                    </div>

                    <div className="col-sm-12 col-md-12 mb-2 text-end">
                        <label><strong>Total: Rs 600</strong></label>
                    </div>
                    <div className="text-end">                        
                        {/* <button className="btn btn-primary" type="submit">Pay Now</button> */}
                        <Link to="/rsvp-2" className="btn btn-primary">Pay Now</Link>
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

export default Rsvp