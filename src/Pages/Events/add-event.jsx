import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import $ from 'jquery';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


let schema = yup.object().shape({
  event_title: yup.string().required("Please enter event title"),
  event_start_date: yup.string().required("Please enter start date"),
  event_end_date: yup.string().required("Please enter end date"),
  event_start_time: yup.string().required("Please enter start time"),
  event_end_time: yup.string().required("Please enter end time")
});

const AddEvent = () => {


  const { register, handleSubmit, formState: { errors }} = useForm(
    {
      resolver:yupResolver(schema),
    });
  
  const onSubmitClick = (data) => {    
    console.log(data);
  } 
  console.log(errors);

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
    // Add Multiple events start
    const [addEventList, setInputEventList] = useState([
      { 
        eventTitle: "", 
        eventDescription: "",
        eventStartDate:"", 
        eventEndDate:"",
        eventStartTime:"",
        eventEndTime:"",
        eventAddLocation:"",
        eventAddPrice:""
      }
    ]);

    // handle input change
    const handleInputAEChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...addEventList];
      list[index][name] = value;      
      setInputEventList(list);
    };


    // handle click event of the Add button
    const handleAddAEClick = () => {
      setInputEventList([...addEventList, { eventTitle: "", eventDescription: "" }]);
    };

    // handle click event of the Remove button
    const handleRemoveAEClick = index => {
      const list = [...addEventList];
      list.splice(index, 1);
      setInputEventList(list);
    };


    // Add Multiple events end


    // Additional Participants Start
    const [additionalParticipantsList, setInputList] = useState([{ hostName: "", name: "" }]);

    // handle input change
    const handleInputAPChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...additionalParticipantsList];
      list[index][name] = value;      
      setInputList(list);
    };   

    // handle click event of the Add button
    const handleAddAPClick = () => {
      setInputList([...additionalParticipantsList, { hostName: "", name: "" }]);
    };

    // handle click event of the Remove button
    const handleRemoveAPClick = index => {
      const list = [...additionalParticipantsList];
      list.splice(index, 1);
      setInputList(list);
    };

    // Additional Participants End

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

     });

     

  return (
    <div>

      <div className="page-wrapper">
             
        {/* Page Content */}
        

        <div className="content container-fluid">
        {/* Page Header */}
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
                <select className="select">                  
                  <option>Paid</option>
                  <option>Free</option>                  
                </select>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="form-group">                
                <select className="select">                  
                  <option>Single Price</option>
                  <option>Different Prices</option>                  
                </select>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="form-group">                
                <select className="select">                  
                  <option>Offline</option>
                  <option>Online</option>
                  <option>Hybrid</option>                  
                </select>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="form-group">                
                <select id="eventLocationSelect" className="select">                  
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
            <form onSubmit={handleSubmit(onSubmitClick)}>
              <div className="row">
                <div className="col-sm-4 col-md-4">
                  <div className="form-group">
                    <label>Event Title <span className="text-danger">*</span></label>
                    <input className={errors.event_title ? 'form-control is-invalid': 'form-control'} type="text" {...register("event_title")}/>
                    {errors.event_title && <div className="invalid-feedback">
                      {errors.event_title?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>Start Date <span className="text-danger">*</span></label>
                    <input className={errors.event_start_date ? 'form-control is-invalid datetimepicker': 'form-control datetimepicker'} type="date" {...register("event_start_date")}/>
                    {errors.event_start_date && <div className="invalid-feedback">
                      {errors.event_start_date?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>End Date <span className="text-danger">*</span></label>
                    <input className={errors.event_end_date ? 'form-control is-invalid datetimepicker': 'form-control datetimepicker'} type="date" {...register("event_end_date")}/>
                    {errors.event_end_date && <div className="invalid-feedback">
                      {errors.event_end_date?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>Start Time <span className="text-danger">*</span></label>
                    <input className={errors.event_start_time ? 'form-control is-invalid': 'form-control'} type="time" {...register("event_start_time")}/>
                    {errors.event_start_time && <div className="invalid-feedback">
                      {errors.event_start_time?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>End Time <span className="text-danger">*</span></label>
                    <input className={errors.event_end_time ? 'form-control is-invalid': 'form-control'} type="time" {...register("event_end_time")}/>
                    {errors.event_end_time && <div className="invalid-feedback">
                      {errors.event_end_time?.message}
                    </div>}
                  </div>
                </div>

                <div className="col-sm-12 col-md-12">
                  <div className="form-group">
                    <label>Event Description</label>                    
                    {/* <textarea className="form-control" rows="10"></textarea> */}
                    <ReactQuill modules={modules}/>
                  </div>
                </div>
               
                <div className="col-sm-6 col-md-6">
                  <div className="form-group">
                    <label>Event Instructions/Additional Information</label>                    
                    <textarea className="form-control"></textarea>
                  </div>
                </div>

                <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Add Location</label>                   
                    <div className="input-group">
                      <input className="form-control" type="text" />
                      <span className="input-group-append input-group-addon"><span className="input-group-text"><i className="fa fa-map-marker" /></span></span>
                    </div> 
                  </div>
                </div>

                <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Upload a Floor Plan</label>                    
                    <input type="file" className="form-control" />
                  </div>
                </div>

                {(eventLocationshow[0].singleEL ===true || eventLocationshow[0].multiESingleL === true) && <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Add Price</label>                    
                    <input type="text" className="form-control" placeholder='INR'/>
                  </div>
                </div>}   
                            
                                
              </div>

              
              <div className="row">
                <div className="col-md-12 col-sm-12">


                {(eventLocationshow[0].multiEL ===true || eventLocationshow[0].multiESingleL === true) && addEventList.map((x, i) => { 
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
                            name="eventTitle"                            
                            value={x.eventTitle}
                            onChange={e => handleInputAEChange(e, i)}/>
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control"
                        name="eventDescription"                            
                        value={x.eventDescription}
                        onChange={e => handleInputAEChange(e, i)}></textarea>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input className="form-control datetimepicker" type="date" name="eventStartDate"                            
                        value={x.eventStartDate}
                        onChange={e => handleInputAEChange(e, i)}/>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>End Date</label>
                        <input className="form-control datetimepicker" type="date" name="eventEndDate"                            
                        value={x.eventEndDate}
                        onChange={e => handleInputAEChange(e, i)}/>
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>Start Time</label>
                        <input className="form-control datetimepicker" type="time" name="eventStartTime"                            
                        value={x.eventStartTime}
                        onChange={e => handleInputAEChange(e, i)}/>
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>End Time</label>
                        <input className="form-control datetimepicker" type="time" name="eventEndTime"                            
                        value={x.eventEndTime}
                        onChange={e => handleInputAEChange(e, i)}/>
                      </div>
                    </div>

                    { addEventList.length !== 1 && <div className="col-sm-1">
                      <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button onClick={()=> handleRemoveAEClick(i)} className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                      </div>
                    </div>
                    }

                    {eventLocationshow[0].multiEL ===true && <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Locatoin</label>
                        <div className="input-group">
                        <input className="form-control" type="text" name="eventAddLocation"                            
                        value={x.eventAddLocation}
                        onChange={e => handleInputAEChange(e, i)}/>
                        <span className="input-group-append input-group-addon"><span className="input-group-text"><i className="fa fa-map-marker" /></span></span>
                        </div>
                      </div>
                    </div>
                    }

                    {eventLocationshow[0].multiEL ===true && <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Price</label>
                        <input className="form-control" type="text" placeholder='INR' name="eventAddPrice"                            
                        value={x.eventAddPrice}
                        onChange={e => handleInputAEChange(e, i)}/>
                      </div>
                    </div>
                    }
                    



                  </div>
                  </div>
                  )
                })}               

                  {(eventLocationshow[0].multiEL ===true || eventLocationshow[0].multiESingleL === true) && <div className="row row-sm mt-2">
                    <div className="col-sm-2 ml-auto">
                      <div className="form-group">
                        <button className="btn btn-primary btn-block" type="button" onClick={()=>handleAddAEClick()}><i className="fa fa-plus" /></button>
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

                    {additionalParticipantsList.map((x, i) => { 
                  return (
                    <div className="row row-sm" key={i}>                      
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Host(Auto Complete)</label>
                          <input className="form-control" type="text"  name="hostName"                            
                            value={x.hostName}
                            onChange={e => handleInputAPChange(e, i)}/>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Name</label>
                          <input className="form-control" type="text"  name="name"                            
                            value={x.name}
                            onChange={e => handleInputAPChange(e, i)}/>
                        </div>
                      </div>                        
                      {additionalParticipantsList.length !== 1 && <div className="col-sm-2">
                        <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button onClick={() => handleRemoveAPClick(i)} className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                        </div>
                      </div>}

                    </div>                                  

                    );
                  })}

                    <div className="row row-sm">

                      
                      <div className="col-sm-2 ml-auto">
                        <div className="form-group">
                          <button className="btn btn-primary btn-block" onClick={() => handleAddAPClick()} type="button"><i className="fa fa-plus" /></button>
                        </div>
                      </div>


                      

                    </div>
                  </div>
                                    
                </div>
              </div>
              <div className="submit-section">                
                <button className="btn btn-primary submit-btn" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>



      </div>
        
    </div>
  )
}

export default AddEvent