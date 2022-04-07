/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React , {useRef,useEffect,useState} from 'react'
import { Helmet } from "react-helmet";
import { Link,useParams } from 'react-router-dom';
//import {Applogo} from '../Entryfile/imagepath.jsx'
import logo from './../../assets/img/logo2.png';

import { useForm,useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import AuthService from "../../Services/auth.service";
import RsvpService from "../../Services/rsvp.service";
import EventService from "../../Services/event.service";

import moment from 'moment';

import $ from 'jquery';

// let schema = yup.object().shape({
//     firstname: yup.string().required("Please enter first name").max(20),
//     lastname: yup.string().required("Please enter last name").max(20),
//     phone: yup.string().required("Please enter phone number"),
//     email: yup.string().required("Please enter email address").email("Please enter valid email address"),    
// });


const RsvpAttendee = () => {

    const toastMsg = useRef(null);
    const params = useParams();

    const [rsvpFormDesign, setRsvpFormDesign] = useState([]);
    const [rsvpSettingsDetails, setRsvpSettingsDetails] = useState([]); 
    const [eventDetailByID, setEventDetailByID] = useState([]); 

    const [chooseParentEventParticipate, setChooseParentEventParticipate] = useState([]);
    const [chooseChildEventParticipate, setChooseChildEventParticipate] = useState([]);  

    const [totalAmountSum, setTotalAmountSum] = useState(0);  

    const [addMoreBtn, setAddMoreBtn] = useState(true);  


    

    const displaySuccess = (msg) => {
        toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
    }
    const displayError = (msg) => {
        toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
    }    
    
    const {control,register, handleSubmit, watch,reset,formState: { errors }} = useForm();

    const { fields:apfields, append:apappend, remove:apremove } = useFieldArray({ name: 'ap', control });

    const onSubmitForm = (data) => {         
    
        console.log(data)
    } 

    const addMoreAP = ()=>{ apappend()  }
    const removeAPremove = (i)=>{ 
        apremove(i) 
        setAddMoreBtn(true)
    }
    


var editid = params.id;

useEffect( ()=>{    

    if($('.select').length > 0) {
        $('.select').select2({
        minimumResultsForSearch: -1,        
        width: '100%'
        });
    }     
    
    // Get RSVP Settings Details By ID
    getRsvpSettingsById(editid)

    // Get RSVP Form Design Form
    getFormDesignDetailId(editid)   
    addMoreAP() 
},[]);

useEffect(() => {    
    const guestLimit = parseInt(rsvpSettingsDetails.rsvp_individual_set_guest_limit) ? parseInt(rsvpSettingsDetails.rsvp_individual_set_guest_limit) : parseInt(rsvpSettingsDetails.rsvp_group_set_guest_limit)    
    if (apfields.length === guestLimit) {        
        setAddMoreBtn(false)        
    }
  }, [apfields])
 
// Get RSVP Settings Details By ID  Start
const getRsvpSettingsById = (sid)=>{
    RsvpService.getRsvpSettingsById(sid).then((response)=>{      
        if(response.status === 200 && response.data.success ===1){                                                       
        //console.log(response.data.data[0]['rsvp_event_id'])            
        setRsvpSettingsDetails(response.data.data[0])
          
        // Get Events by id
          if(response.data.data[0]['rsvp_event_id']){
            getEventDetailById(response.data.data[0]['rsvp_event_id'])
            getChildEventsById(response.data.data[0]['rsvp_event_id'])
          }

        }
    }
    ).catch(error => {
        console.log(error)
    });      
}
// Get RSVP Settings Details By ID  End


//Get Event Details by ID Start
const getEventDetailById = (id,flag=null)=>{      
    EventService.getEventDetail(id).then((res)=>{
      if(res.status === 200){                
        //console.log(res.data.result)
        setEventDetailByID(res.data.result)     
        
        if(flag ===1){
            const resArr = [res.data.result]  
            setChooseParentEventParticipate(resArr)
            const getTotalSum = res.data.result.p_event_price
            setTotalAmountSum(parseInt(getTotalSum))
        }        
      }
    }
  ).catch(error => {
    console.log(error)
  });
  }

  // Get Child Events by ID
 const getChildEventsById = (peventid)=>{      
    EventService.getChildEventsById(peventid).then((res)=>{
      //console.log(res.data.result)      

      if(res.data.result.length > 0){
        if(res.status === 200 && res.data.success === 1){                  

        let getTotalSum = 0;
        for (let i = 0; i < res.data.result.length; i += 1) {
            //console.log(res.data.result[i].c_event_price);    
            getTotalSum += parseInt(res.data.result[i].c_event_price);
        }        
        setTotalAmountSum(getTotalSum)
        setChooseChildEventParticipate(res.data.result)
          //setCEventCapacity(res.data.result)
        }
      }else{
        getEventDetailById(peventid,1)
      }
        
      }
    ).catch(error => {
      console.log(error)
    });
  }

  //Get Event Details by ID End

// Get Form design details by ID Start
const getFormDesignDetailId = (sid)=>{     

    RsvpService.getFormDesignDetailId(sid).then((res)=>{
        if(res.status === 200 && res.data.success === 1){      
          //console.log(res.data.result[0])        
  
          if(res.data.result[0]['rsvp_basic_form'] === true){
            //console.log("Basic Form")       
            getRsvpBasicForm() 
          }
  
          if(res.data.result[0]['rsvp_custom_form'] === true){
            //console.log("Custom Form")
            getRsvpCustomForm()
            //getRsvpSById()
          }
        }
      }
    ).catch(error => {
      console.log(error)
    });
  
  } 
    
const getRsvpBasicForm = ()=>{     

    if(editid && editid > 0 && editid !=''){  
      // Get RSVP Custom Form Details Start
        RsvpService.getBasicFormDetails(editid).then((res)=>{
            if(res.status === 200){          
              //console.log(res.data.result)
              setRsvpFormDesign(res.data.result)
            }
          }
        ).catch(error => {
          displayError(error)
      });
      // Get RSVP Custom Form Details End
      //getRsvpSById()        
    }
  
  }
  // Get Basic Form Preview End

     // Get Custom Form Preview Start
const getRsvpCustomForm = ()=>{ 

    if(editid && editid > 0 && editid !=''){

        // Get RSVP Custom Form Details Start
        RsvpService.getCustomFormDetails(editid).then((res)=>{
            if(res.status === 200){          
                //console.log(res.data.result)
                setRsvpFormDesign(res.data.result)
            }
            }
        ).catch(error => {
            displayError(error)
        });
        // Get RSVP Custom Form Details End
        //getRsvpSById()        
    }
}

// Get Form design details by ID End

const getVal = (val)=>{
    // console.log(val.target.value)
    // console.log(totalAmountSum)
    if(val.target.checked === true){
        setTotalAmountSum(parseInt(totalAmountSum)+parseInt(val.target.value))
    }else{
        setTotalAmountSum(parseInt(totalAmountSum)-parseInt(val.target.value))
    }
    
}

//const abc = watch("selectAll")

//console.log({errors})


// const handlechange = (e)=>{
//  const {name,checked} = e.target
// console.log(checked)
//  if(name === "allSelect"){
//     let tempdata = chooseChildEventParticipate.map(data => { return { ...data,isChecked : checked} })
//     setChooseChildEventParticipate(tempdata)

//  }else{
//     //let tempdata = chooseChildEventParticipate.map((data) =>data.id !== name ? console.log("OK") : console.log(data.id))
//  let tempdata = chooseChildEventParticipate.map(data => data.id === name ? {...data,isChecked : checked } : data)
//  console.log(tempdata)
//  setChooseChildEventParticipate(tempdata)
//  }
// }

  return (
<>    
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
                     <h3 className="text-center"> {eventDetailByID.p_event_title} </h3> 
                    <p className="account-subtitle">
                        {moment(rsvpSettingsDetails.rsvp_by_date).format('MMMM Do, YYYY')} &nbsp;
                        {moment(rsvpSettingsDetails.rsvp_by_time, "HH:mm").format("hh:mm A")}
                    </p>
                </div>    
                               
                <div className="h5 card-title">                        
                    <label>Would you like to name your guests now?</label>
                </div>

                {/* Account Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmitForm)}>

                    {apfields.map((x, i) => { 
                  return (
                    <div className="row" key={i}>
                        <div className="col-sm-5">
                            <div className="form-group">
                                <label>First Name</label>
                                <input className={errors.firstname ? 'form-control is-invalid': 'form-control'} {...register(`ap.${i}.firstname`)} type="text" maxLength="20"/>
                                
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input className={errors.lastname ? 'form-control is-invalid': 'form-control'} {...register(`ap.${i}.lastname`)} type="text" maxLength="20"/>
                                {errors.lastname && <div className="invalid-feedback">
                                {errors.lastname?.message}
                                </div>}
                            </div>
                        </div>   
                        {apfields.length !== 1 && <div className="col-sm-2">
                        <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button onClick={() => removeAPremove(i)} className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                        </div>
                      </div>}                     
                    </div>);
                  })}
                    {addMoreBtn ===true && <div className="row row-sm">
                      
                      <div className="col-sm-2 ml-auto">
                        <div className="form-group">
                          <button className="btn btn-primary btn-block" 
                          onClick={() => addMoreAP()}
                          type="button"><i className="fa fa-plus" /></button>
                        </div>
                      </div>
                    </div> }

                    <div className="row">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="later" />
                            <label className="form-check-label" htmlFor="later">I will do on later</label>
                        </div>
                    </div>

                    <div className="text-center">                        
                        <button className="btn btn-primary" type="submit">Submit</button>
                        {/* <Link to="/rsvp-2" className="btn btn-primary">Pay Now</Link> */}
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

export default RsvpAttendee