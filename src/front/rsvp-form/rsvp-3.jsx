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


const Rsvp3 = () => {

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
                <h2 className="h2-horizontal-line"><span>RSVP</span></h2>
                <h3 className="text-center">Event A</h3>
                <p className="account-subtitle">March 09, 2022</p>

                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="form-group text-center">                               
                        <h3><strong>Thanks!</strong></h3>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12">
                        <div className="form-group text-center">                               
                        <p>If you have any questions, please don't hesitate to<br/>
                        reach out to us at</p>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12">
                        <div className="form-group text-center">                               
                        <h4><strong>Mob: +91 9662948584</strong></h4>
                        <h4><strong>Email: support@xyz.com</strong></h4>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12">
                        <div className="form-group text-center">                               
                        <h4 style={{color:'#B44C27'}}>Please note, we will send you an email on later stage to confirm them names of the attendees</h4>
                        </div>
                    </div> 
                </div>                            

                
            </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Rsvp3