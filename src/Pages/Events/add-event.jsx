import React, {useEffect, useState, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import $ from 'jquery';

import { useForm,useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import MasterService from "../../Services/master.service";
import EventService from "../../Services/event.service";
import AuthService from "../../Services/auth.service";

import { Toast } from 'primereact/toast';

let schema = yup.object().shape({
  p_eventtypeid: yup.string().required("Please select event type"),
  p_event_title: yup.string().required("Please enter event title"),
  p_event_start_date: yup.string().required("Please enter start date"),
  p_event_end_date: yup.string().required("Please enter end date"),
  p_event_start_time: yup.string().required("Please enter start time"),
  p_event_end_time: yup.string().required("Please enter end time")
});

const AddEvent = () => { 

  const navigate  = useNavigate();

  const [activeEventTypeList, setActiveEventTypeList] = useState([]);
  const [activeParticipantList, setActiveParticipantList] = useState([]);

  const {setValue, getValues, control, watch,register, handleSubmit,reset, formState: { errors }} = useForm(
  {
    resolver:yupResolver(schema),
  });  

  const { fields:apfields, append:apappend, remove:apremove } = useFieldArray({ name: 'ap', control });
  const { fields:childeventfields, append:childeventappend, remove:childeventremove } = useFieldArray({ name: 'child_event', control });
  
  // Additional Participants Start
  const addMoreAP = ()=>{ apappend()  }
  const removeAPremove = (i)=>{ apremove(i) }
  // Additional Participants End

  // Add Child Event Start
  const addMoreChildEvent = ()=>{ childeventappend()  }
  const removeChildEvent = (i)=>{ childeventremove(i) }
  // Add Child Event End

  const toastMsg = useRef(null);
  const displaySuccess = (msg) => {
      toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
  }
  const displayError = (msg) => {
      toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
  }

    const onSubmitForm = (data) => {       
      
      var currentUserFullname = AuthService.getUserFullname();        
      data["createdby"] = currentUserFullname;    
      data["updatedby"] = currentUserFullname;                  
      createEvent(data)
    }     
  
  // Insert Record
  const createEvent = (data) => {

    EventService.createEvent(data).then(
      (response) => {
          if(response.status === 200) {               
              displaySuccess(response.data.message)
              reset()           
              addMoreAP()
              navigate("/events");
          }else{
              displayError(response.data.message)
          }
          
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          displayError(resMessage)
          //console.log(resMessage)      
      }
  );
  
  }

  const [eventLocationshow, setEventLocationshow] = useState([
    { 
      singleEL: true,
      multiEL: false,
      multiESingleL: false,
    }
  ]);
  const handleELChange = (val) => {   
    
     if(val === "SingleEL"){      
      setEventLocationshow([{
        singleEL: true,
        multiEL: false,
        multiESingleL: false,
      }])
     }else if(val === "MultiEL"){      
      setEventLocationshow([{
        singleEL: false,
        multiEL: true,
        multiESingleL: false,
      }])
     }else if(val === "MultiESingleL"){
      setEventLocationshow([{
        singleEL: false,
        multiEL: false,
        multiESingleL: true,
      }])
     }
     return false
  }; 
  
  let mainRef = React.createRef();

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', 'large', 'huge'] }],  // custom dropdown
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],        
        [
          {'list': 'ordered'},
          {'list': 'bullet'}
        ],
        ['link'],
        ['image'],
        [{ 'color': [] }, { 'background': [] }], 
        
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button    
      ],
      handlers: {
        'undo': () => {
          let myEditor = mainRef?.current?.getEditor();
          return myEditor?.history?.undo();
        },
        'redo': function () {
          let myEditor = mainRef?.current?.getEditor();
          return myEditor?.history?.redo();
        }
      }
    },
    history: {
      delay: 200,
      maxStack: 500,
      userOnly: true
    }
  };       

    useEffect( ()=>{

        let firstload = localStorage.getItem("firstload")
        if(firstload === "true"){          
            setTimeout(function() {
              window.location.reload(1)
              localStorage.removeItem("firstload")
            },1000)
        }

        if($('.select').length > 0) {
          $('.select').select2({
            minimumResultsForSearch: -1,
            width: '100%'
          });
        }        

        $("#eventLocationSelect").on("change", function () {         
          handleELChange($(this).val())
        });

        getActiveEventType()
        addMoreAP()        
        getActiveParticipant()

     },[]);

   // Get Active Companies
   const getActiveEventType = ()=>{
    MasterService.getActiveEventType().then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result)
        setActiveEventTypeList(res.data.result)
      }
    }
  ).catch(error => {
    console.log(error)
  });
}

// Get Active Participant
const getActiveParticipant = ()=>{
  MasterService.getActiveParticipant().then((res)=>{
    if(res.status === 200){          
      //console.log(res.data.result)
      setActiveParticipantList(res.data.result)
    }
  }
).catch(error => {
  console.log(error)
});
}

const onEventDescriptionChange = (state) => {  
  console.log(state)
  setValue("p_event_description", state);
};

  return (
    <div>

      <div className="page-wrapper">
      <Toast ref={toastMsg} />       
        {/* Page Content */}
        

      
        <div className="content container-fluid">        
        {/* Page Header */}
        <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="page-header">
          <div className="row">
            <div className="col-sm-4">
              <h3 className="page-title">New Event</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
                <li className="breadcrumb-item active">New Event</li>
              </ul>
            </div>
            <div className="col-sm-2">
              <div className="form-group">                
                <select className={errors.p_eventtypeid ? 'form-select is-invalid': 'form-select'} {...register("p_eventtypeid")}>                  
                  <option value="">Select Event Type</option>
                  {activeEventTypeList.map(({ id, eventtype }, index) => <option value={id}>{eventtype}</option>)}  
                </select>
                {errors.p_eventtypeid && <div className="invalid-feedback">
                  {errors.p_eventtypeid?.message}
                </div>}
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">                
                <select className="form-select" {...register("p_event_paid_free")}>                  
                  <option value="paid">Paid</option>
                  <option value="free">Free</option>                  
                </select>
              </div>
            </div>

            {/* <div className="col-sm-2">
              <div className="form-group">                
                <select className="form-select" {...register("p_event_price_type")}>                  
                  <option value="sprice">Single Price</option>
                  {/* <option value="dprice">Different Prices</option>                   */}
               {/* </select>
              </div>
            </div> */}

            <div className="col-sm-2">
              <div className="form-group">                
                <select className="form-select" {...register("p_event_mode")}>                  
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>                  
                </select>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="form-group">                
                <select id="eventLocationSelect" className="form-select" {...register("p_event_single_multiple")}>                  
                  <option value="SingleEL">Single Event, Single Location</option>
                  <option value="MultiEL">Multiple Event, Multiple Location</option>
                  <option value="MultiESingleL">Multiple Event, Single Location</option>                  
                </select>
              </div>
            </div>

            
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            
              <div className="row">
                <div className="col-sm-4 col-md-4">
                  <div className="form-group">
                    <label>Event Title <span className="text-danger">*</span></label>
                    <input className={errors.p_event_title ? 'form-control is-invalid': 'form-control'} type="text" {...register("p_event_title")}/>
                    {errors.p_event_title && <div className="invalid-feedback">
                      {errors.p_event_title?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>Start Date <span className="text-danger">*</span></label>
                    <input className={errors.p_event_start_date ? 'form-control is-invalid': 'form-control'} type="date" {...register("p_event_start_date")}/>
                    {errors.p_event_start_date && <div className="invalid-feedback">
                      {errors.p_event_start_date?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>End Date <span className="text-danger">*</span></label>
                    <input className={errors.p_event_end_date ? 'form-control is-invalid ': 'form-control'} type="date" {...register("p_event_end_date")}/>
                    {errors.p_event_end_date && <div className="invalid-feedback">
                      {errors.p_event_end_date?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>Start Time <span className="text-danger">*</span></label>
                    <input className={errors.p_event_start_time ? 'form-control is-invalid': 'form-control'} type="time" {...register("p_event_start_time")}/>
                    {errors.p_event_start_time && <div className="invalid-feedback">
                      {errors.p_event_start_time?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>End Time <span className="text-danger">*</span></label>
                    <input className={errors.p_event_end_time ? 'form-control is-invalid': 'form-control'} type="time" {...register("p_event_end_time")}/>
                    {errors.p_event_end_time && <div className="invalid-feedback">
                      {errors.p_event_end_time?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-12 col-md-12">
                  <div className="form-group">
                    <label>Event Description</label>                    
                    {/* <textarea className="form-control" rows="10"></textarea> */}
                    <ReactQuill onChange={(e)=>onEventDescriptionChange(e)}/>
                    {/* <textarea className="form-control" style={{height:'150px'}} {...register("p_event_description")}/>   */}
                  </div>
                </div>
               
                <div className="col-sm-6 col-md-6">
                  <div className="form-group">
                    <label>Event Instructions/Additional Information</label>                    
                    <textarea className="form-control" {...register("p_event_additional_info")}></textarea>
                  </div>
                </div>

                {(eventLocationshow[0].singleEL ===true || eventLocationshow[0].multiESingleL === true) && <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Add Location</label>                   
                    <div className="input-group">
                      <input className="form-control" type="text" {...register("p_event_location")}/>
                      <span className="input-group-append input-group-addon"><span className="input-group-text"><i className="fa fa-map-marker" /></span></span>
                    </div> 
                  </div>
                </div>}

                <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Upload a Floor Plan</label>                    
                    <input type="file" className="form-control" {...register("p_event_floor_plan")}/>
                  </div>
                </div>

                {(eventLocationshow[0].singleEL ===true) && <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Add Price</label>                    
                    <input type="text" className="form-control" placeholder='INR' {...register("p_event_price")}/>
                  </div>
                </div>}   
                            
                                
              </div>

              
              <div className="row">
                <div className="col-md-12 col-sm-12">


                {(eventLocationshow[0].multiEL ===true || eventLocationshow[0].multiESingleL === true) && childeventfields.map((x, i) => { 
                return (  
                  <div className='event-row-1 mb-2 p-3 border' key={i}>
                  <div className="h3 card-title">                        
                      <label>Event {i+1}</label>
                  </div>
                  <div className="row row-sm">

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Event Title</label>
                        <input className="form-control" type="text" 
                            name="c_event_title"                            
                            {...register(`child_event.${i}.c_event_title`)}
                            />
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control"                        
                        name="c_event_description"                            
                        {...register(`child_event.${i}.c_event_description`)}
                            ></textarea>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input className="form-control datetimepicker" type="date"
                        name="c_event_start_date"                            
                        {...register(`child_event.${i}.c_event_start_date`)}/>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>End Date</label>
                        <input className="form-control datetimepicker" type="date" 
                        name="c_event_end_date"                            
                        {...register(`child_event.${i}.c_event_end_date`)}/>
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>Start Time</label>
                        <input className="form-control datetimepicker" type="time" 
                        name="c_event_start_time"                            
                        {...register(`child_event.${i}.c_event_start_time`)}/>
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>End Time</label>
                        <input className="form-control datetimepicker" type="time" 
                        name="c_event_end_time"                            
                        {...register(`child_event.${i}.c_event_end_time`)}/>
                      </div>
                    </div>

                    { childeventfields.length !== 1 && <div className="col-sm-1">
                      <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button onClick={()=> removeChildEvent(i)} className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                      </div>
                    </div>
                    }

                    {eventLocationshow[0].multiEL ===true && <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Locatoin</label>
                        <div className="input-group">
                        <input className="form-control" type="text" 
                        name="c_event_location"                            
                        {...register(`child_event.${i}.c_event_location`)}/>
                        <span className="input-group-append input-group-addon"><span className="input-group-text"><i className="fa fa-map-marker" /></span></span>
                        </div>
                      </div>
                    </div>
                    }
                    {(eventLocationshow[0].multiEL ===true || eventLocationshow[0].multiESingleL === true) && <div className="col-sm-2">
                      <div className="form-group">                 
                      <label>&nbsp;</label>
                        <div className="form-check mt-2">      
                          <input className="form-check-input" ref={register(`child_event.${i}.paid_check_1`)} type="checkbox" id={`${i}`} {...register(`child_event.${i}.paid_check`)}/>
                          <label className="form-check-label" htmlFor={`${i}`}>Paid?</label>
                        </div>                        
                      </div>                      
                    </div>
                    }

                    {(eventLocationshow[0].multiEL ===true || eventLocationshow[0].multiESingleL === true) && <div className="col-sm-2">                      
                      <div className="form-group">
                        <label>Add Price</label>
                        <input className="form-control" ref={register(`child_event.${i}.paid_check_1`)} type="text" placeholder='INR'                            
                        name="c_event_price"                            
                        {...register(`child_event.${i}.c_event_price`)} disabled={!watch(`child_event.${i}.paid_check`)}/>
                      </div>
                    </div>
                    }
                    



                  </div>
                  </div>
                  )
                })}               

                {(eventLocationshow[0].multiEL ===true || eventLocationshow[0].multiESingleL === true) &&
                   <div className="row row-sm mt-2">
                    <div className="col-sm-2 ml-auto">
                      <div className="form-group">
                        <button className="btn btn-primary btn-block" type="button" onClick={()=>addMoreChildEvent()}><i className="fa fa-plus" /></button>
                      </div>
                    </div>
                  </div>
              }

                </div>

              </div>

              
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  
                  <div className="settings-widget">
                    <div className="h3 card-title">                        
                      <label>Additional Participants</label>
                    </div>

                    {apfields.map((x, i) => { 
                  return (
                    <div className="row row-sm" key={i}>                      
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Participant</label>
                          <select className="form-select" {...register(`ap.${i}.ep_host_name`)}>                  
                            <option value="">Select Participant</option>
                            {activeParticipantList.map(({ id, name }, index) => <option value={name}>{name}</option>)}  
                          </select>                          
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Name</label>
                          <input className="form-control" type="text"  name="ep_name"                            
                            defaultValue={x.value} 
                            {...register(`ap.${i}.ep_name`)} />
                        </div>
                      </div>                        
                      {apfields.length !== 1 && <div className="col-sm-2">
                        <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button onClick={() => removeAPremove(i)} className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                        </div>
                      </div>}

                    </div>                                  

                    );
                  })}

                    <div className="row row-sm">
                      
                      <div className="col-sm-2 ml-auto">
                        <div className="form-group">
                          <button className="btn btn-primary btn-block" 
                          onClick={() => addMoreAP()}
                          type="button"><i className="fa fa-plus" /></button>
                        </div>
                      </div>
                      

                    </div>
                  </div>
                                    
                </div>
              </div>
              <div className="submit-section">                
                <button className="btn btn-primary submit-btn" type="submit">SUBMIT</button>
              </div>
            
            </div>          
          </div>
        </form>
      </div>



      </div>
        
    </div>
  )
}

export default AddEvent