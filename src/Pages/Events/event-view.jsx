/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect,useState } from 'react';
import { Link,useParams  } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';
import EventService from "../../Services/event.service";
import moment from 'moment';
const EventView = () => {
    const params = useParams();
    const [parentEventData, setParentEventData] = useState([]);
    const [childEventData, setChildEventData] = useState([]);
    const [participatesEventData, setParticipatesEventData] = useState([]);

    const getEventDetail = (id)=>{      
        EventService.getEventDetail(id).then((res)=>{
          if(res.status === 200){          
            console.log(res.data.result);
            setParentEventData(res.data.result)

            if(res.data.result.id){

              // Get child event Details by id start
              EventService.getChildEventsById(res.data.result.id).then((res)=>{
                  if(res.status === 200 && res.data.success === 1){          
                    console.log(res.data.result)
                    setChildEventData(res.data.result)
                  }
                }
              ).catch(error => {
                console.log(error)
              });
              // Get child event Details by id end

              // Get Participates Details by id start
              EventService.getEventParticipatesById(res.data.result.id).then((res)=>{
                  if(res.status === 200 && res.data.success === 1){          
                    console.log(res.data.result)
                    setParticipatesEventData(res.data.result)
                  }
                }
              ).catch(error => {
                console.log(error)
              });
              // Get Participates Details by id end

              
            }
            
          }
        }
      ).catch(error => {
        console.log(error)
      });
    }
    
    useEffect( ()=>{              
        getEventDetail(params.id)
    },[]);     

     $(document).ready(function(){  
      $('.select').select2({        
        minimumResultsForSearch: -1,
        width: '100%'
      });
    })

  return (
    
    <div>

      <div className="page-wrapper">

        {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">{parentEventData.p_event_title}</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
                <li className="breadcrumb-item active">Event Details</li>
              </ul>
            </div>            
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-lg-12 col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                    <div className="col-lg-9 col-xl-9">
                      <div className="project-title">
                        <h2 className="card-title">{parentEventData.p_event_title}</h2>                  
                      </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 ">
                      <h3 className="float-end" style={{textTransform: 'uppercase'}}>
                        <span class="badge bg-success">{parentEventData.p_event_mode}</span> 
                        <span class="badge btn-warning ms-2">{parentEventData.p_event_paid_free}</span>
                      </h3>                      
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-xl-12">
                        <div
                      dangerouslySetInnerHTML={{
                        __html: parentEventData.p_event_description
                      }}></div>                
                    </div>
                </div>
                
                <div className="row mt-3">
                    <div className="col-lg-12 col-xl-12">                    
                    <table className="table table-striped table-border">
                      <tbody>
                        <tr>
                            <td>Date:  {moment(parentEventData.p_event_start_date).format('Do MMMM, YYYY')}, &nbsp;
                                        {moment(parentEventData.p_event_start_time, "HH:mm").format("hh:mm A")}
                                        <span className="ms-2">to</span><span className="ms-2"></span>
                                {moment(parentEventData.p_event_end_date).format('Do MMMM, YYYY')}, &nbsp;
                            {moment(parentEventData.p_event_end_time, "HH:mm").format("hh:mm A")}
                            </td>                            
                        </tr>
                        <tr>
                          <td>Location: {parentEventData.p_event_location}</td>                          
                        </tr>                                            
                        <tr>
                          <td>Instructions: {parentEventData.p_event_additional_info}</td>                          
                        </tr>     
                        <tr>
                          <td>
                            Floor Plan: 
                            <br/>
                            <div className="row">
                              <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                                <div className="uploaded-box">
                                  <div className="uploaded-img">
                                    <img src={placeholders} className="img-fluid" alt="" />
                                  </div>
                                  <div className="uploaded-img-name">
                                    demo.png
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </td>
                        </tr>                   
                      </tbody>
                    </table>
                    
                    </div>
                </div>


              </div>
            </div>
            
            {childEventData.map(({c_event_title,c_event_description,c_event_location,c_event_start_date,c_event_start_time,c_event_end_date,c_event_end_time,c_event_price},i)=><div className="card" key={i}>
              <div className="card-body">
                <h5 className="card-title m-b-20">Event: {c_event_title}</h5>
                        
                  <span
                dangerouslySetInnerHTML={{
                  __html: c_event_description
                }}></span>                
                
                <table className="table table-striped table-border mt-3">
                  <tbody>
                    <tr>
                        <td>Date:  {moment(c_event_start_date).format('Do MMMM, YYYY')}, &nbsp;
                                    {moment(c_event_start_time, "HH:mm").format("hh:mm A")}
                                    <span className="ms-2">to</span><span className="ms-2"></span>
                            {moment(c_event_end_date).format('Do MMMM, YYYY')}, &nbsp;
                        {moment(c_event_end_time, "HH:mm").format("hh:mm A")}
                        </td>                            
                    </tr>
                    <tr>
                      <td>Location: {c_event_location}</td>                          
                    </tr>                                                                         
                                      
                  </tbody>
                </table>
                  
              </div>
            </div>)}

             <div className="card">
              <div className="card-body">
                <h5 className="card-title m-b-20">Event Participants:</h5>
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12">
                  <table className="table table-striped table-border mt-1">
                    <tbody>
                    {participatesEventData.map(({ep_host_name,ep_name},i)=><tr key={i}>
                          <td>Participant: {ep_host_name}</td>                            
                          <td>Name: {ep_name}</td>                            
                      </tr>)}                                                                                              
                                        
                    </tbody>
                  </table>
                  </div>
                  
                </div>
              </div>
            </div> 
            
          </div>
          
        </div>
      </div>
      {/* /Page Content */}     
        
      </div>
        
    </div>
  )
}

export default EventView