/* eslint-disable eqeqeq */
import React , {useRef,useEffect,useState} from 'react'
import { Helmet } from "react-helmet";
import { Link,useParams,useNavigate } from 'react-router-dom';
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


const Rsvp = () => {

    const toastMsg = useRef(null);
    const params = useParams();

    const [rsvpFormDesign, setRsvpFormDesign] = useState([]);
    const [rsvpSettingsDetails, setRsvpSettingsDetails] = useState([]); 
    const [eventDetailByID, setEventDetailByID] = useState([]); 

    const [chooseParentEventParticipate, setChooseParentEventParticipate] = useState([]);
    const [chooseChildEventParticipate, setChooseChildEventParticipate] = useState([]);  

    const [totalAmountSum, setTotalAmountSum] = useState(0);  


    const navigate  = useNavigate();
    var editid = params.id;
    const displaySuccess = (msg) => {
        toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
    }
    const displayError = (msg) => {
        toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
    }    
    
    const { register, handleSubmit, watch, reset,formState: { errors }} = useForm(
    //     {
    //     resolver:yupResolver(schema),
    // }
    );
    const onSubmitForm = (data) => {         
    
        console.log(data)
        console.log(totalAmountSum)
        navigate("/rsvp-attendee-form/"+editid);

        // RsvpService.getRsvpSettingsById(sid).then((response)=>{      
        //     if(response.status === 200 && response.data.success ===1){                                                       
        //     //console.log(response.data.data[0]['rsvp_event_id'])            
        //     setRsvpSettingsDetails(response.data.data[0])
              
        //     // Get Events by id
        //       if(response.data.data[0]['rsvp_event_id']){
        //         getEventDetailById(response.data.data[0]['rsvp_event_id'])
        //         getChildEventsById(response.data.data[0]['rsvp_event_id'])
        //       }
    
        //     }
        // }
        // ).catch(error => {
        //     console.log(error)
        // });

        
    } 



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
},[]);

 
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
      console.log(res.data.result)      

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
                console.log(res.data.result)
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


                    {rsvpFormDesign.map(({id,rsvp_field_name,rsvp_field_type,rsvp_field_options},index)=><div className="col-sm-12 col-md-12">
                        {rsvp_field_type && rsvp_field_type =='textbox' && <div className="form-group">
                        <input className="form-control" type={rsvp_field_type} placeholder={rsvp_field_name}
                        {...register(`textboxval.${rsvp_field_name}`,{
                            required: {
                                value:true,
                                message:'This field is required'
                            },
                        })}
                        required
                        />                                                    
                        {/* {errors && <div className="invalid-feedback" id={errors.textboxvalidate?.message}>                           
                           {errors.textboxvalidate+index?.message}
                        </div>} */}
                        </div>} 

                        

                        {rsvp_field_type && rsvp_field_type =='radio' && <div className="form-group">
                        <label>{rsvp_field_name}</label><br/>
                            {rsvp_field_options.map(item=><div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio"  id={item}
                            {...register("radioval",{
                                required: {
                                    value:true,
                                    message:'This field is required'
                                },
                            })}
                            value={item}
                            required />
                            <label className="form-check-label" htmlFor={item}>{item}</label>
                            </div>)}                          
                        </div>}     
                        {rsvp_field_type && rsvp_field_type =='dropdown' && <div className="form-group">                        
                        <select className="form-select"  {...register("selectval",{
                                required: {
                                    value:true,
                                    message:'This field is required'
                                },
                            })}
                            required>          
                            <option value="">{rsvp_field_name}</option>                
                            {rsvp_field_options.map(item=><option value={item}>{item}</option>)}                                 
                        </select>
                        </div>}     
                        {rsvp_field_type && rsvp_field_type =='checkbox' && <div className="form-group">
                        <label>{rsvp_field_name}</label><br/>
                            {rsvp_field_options.map(item=><div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id={item} 
                            {...register("checkboxval",{
                                required: {
                                    value:false,
                                    message:'This field is required'
                                },
                            })}
                            value={item}
                            />
                            <label className="form-check-label" htmlFor={item}>{item}</label>
                            </div>)}                          
                        </div>} 
                        {rsvp_field_type && rsvp_field_type =='textarea' && <div className="form-group">                        
                        <textarea className="form-control" placeholder={rsvp_field_name}
                        {...register("textareval",{
                            required: {
                                value:false,
                                message:'This field is required'
                            },
                        })}
                        required></textarea>
                        </div>}      
                    </div>)}

                    {/* <div className="row">
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
                    </div>                     */}

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
                                    {/* <tr>
                                    <td>
                                        <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="group" 
                                        //onChange={(e)=>handlechange(e)}
                                        //checked={chooseChildEventParticipate.filter((data)=>data?.isChecked !== true).length < 1 || false}
                                        name="allSelect"                                                                                 
                                        />
                                        <label className="form-check-label" htmlFor="group">
                                            All
                                        </label>
                                        </div>
                                    </td>
                                    <td>{totalAmountSum} Rs/per person</td>                                                                           
                                    </tr> */}
                                    {chooseParentEventParticipate.map(({p_event_title,p_event_price},i)=><tr key={i}>
                                        <td>
                                            <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="group"
                                            value={p_event_price}                                            
                                            defaultChecked
                                            // name={id}
                                            // checked={isChecked || false}                                            
                                            // onChange={handlechange}
                                             onClick={(e)=>getVal(e)}
                                            {...register("event_price_list",{
                                                required: {
                                                    value:true,
                                                    message:'Choose events you will participats'
                                                },
                                            })}
                                            />
                                            <label className="form-check-label" htmlFor="group">
                                                {p_event_title}
                                            </label>
                                            </div>
                                        </td>
                                        <td>{p_event_price} Rs/per person</td>                                        
                                        
                                        </tr>)}

                                        {chooseChildEventParticipate.map(({isChecked,id,c_event_title,c_event_price},i)=><tr key={i}>
                                        <td>
                                            <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id={id} 
                                            value={c_event_price}                                            
                                            defaultChecked
                                            // name={id}
                                            // checked={isChecked || false}                                            
                                            // onChange={handlechange}
                                             onClick={(e)=>getVal(e)}
                                            {...register("event_price_list",{
                                                required: {
                                                    value:true,
                                                    message:'Choose events you will participats'
                                                },
                                            })}
                                            />
                                            
                                            <label className="form-check-label" htmlFor={id}>
                                                {c_event_title}
                                            </label>
                                            </div>
                                        </td>
                                        <td>{c_event_price} Rs/per person</td>                                        
                                        
                                        </tr>)}
                                        {errors.event_price_list && <div className="invalid-feedback">
                                        {errors.event_price_list?.message}
                                        </div>}
                                    
                                    </tbody>
                                </table>
                                                                    
                                </div>
                            </div>
                            </div>
                        </div>    
                    </div>

                    <div className="col-sm-12 col-md-12 mb-2 text-end">
                        <label><strong>Total: Rs {totalAmountSum}</strong></label>
                    </div>
                    <div className="text-end">                        
                        <button className="btn btn-primary" type="submit">Pay Now</button>
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

export default Rsvp