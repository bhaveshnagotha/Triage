import React, {useEffect } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

const AddEvent = () => {

  

    useEffect( ()=>{
        let firstload = localStorage.getItem("firstload")
        if(firstload === "true"){
            setTimeout(function() {
              window.location.reload(1)
              localStorage.removeItem("firstload")
            },1000)
        }
     });

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
          <div className="row">
            <div className="col-sm-4">
              <h3 className="page-title">New Event</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Events</Link></li>
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
                <select className="select">                  
                  <option>Single Event, Single Location</option>
                  <option>Multiple Event, Multiple Location</option>
                  <option>Multiple Event, Single Location</option>                  
                </select>
              </div>
            </div>

            
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <form>
              <div className="row">
                <div className="col-sm-4 col-md-4">
                  <div className="form-group">
                    <label>Event Title <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" />
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>Start Date <span className="text-danger">*</span></label>
                    <input className="form-control datetimepicker" type="date" />
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>End Date <span className="text-danger">*</span></label>
                    <input className="form-control datetimepicker" type="date" />
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>Start Time <span className="text-danger">*</span></label>
                    <input className="form-control" type="time" />
                  </div>
                </div>

                <div className="col-sm-2 col-md-2">
                  <div className="form-group">
                    <label>End Time <span className="text-danger">*</span></label>
                    <input className="form-control" type="time" />
                  </div>
                </div>

                <div className="col-sm-12 col-md-12">
                  <div className="form-group">
                    <label>Event Description</label>                    
                    <textarea className="form-control" rows="10"></textarea>
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
                    <input className="form-control" type="text" />
                  </div>
                </div>

                <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Upload a Floor Plan</label>                    
                    <input type="file" className="form-control" />
                  </div>
                </div>

                <div className="col-sm-3 col-md-3">
                  <div className="form-group">
                    <label>Add Price</label>                    
                    <input type="text" className="form-control" placeholder='INR'/>
                  </div>
                </div>   
                            
                                
              </div>

              <hr/>
              <div className="row">
                <div className="col-md-12 col-sm-12">



                <div className='event-row-1 mb-2 p-3 border'>
                  <div className="h3 card-title">                        
                      <label>Event 1</label>
                  </div>
                  <div className="row row-sm">

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Event Title</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control"></textarea>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>End Date</label>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>Start Time</label>
                        <input className="form-control datetimepicker" type="time" />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>End Time</label>
                        <input className="form-control datetimepicker" type="time" />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Locatoin</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Price</label>
                        <input className="form-control" type="text" placeholder='INR'/>
                      </div>
                    </div>
                    



                  </div>
                </div>


                <div className='event-row-2 mb-2 p-3 border'>
                  <div className="h3 card-title">                        
                      <label>Event 2</label>
                  </div>
                  <div className="row row-sm">

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Event Title</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control"></textarea>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Start Date</label>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>End Date</label>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>Start Time</label>
                        <input className="form-control datetimepicker" type="time" />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                        <label>End Time</label>
                        <input className="form-control datetimepicker" type="time" />
                      </div>
                    </div>

                    <div className="col-sm-1">
                      <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Locatoin</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>

                    <div className="col-sm-2">
                      <div className="form-group">
                        <label>Add Price</label>
                        <input className="form-control" type="text" placeholder='INR'/>
                      </div>
                    </div>
                    



                  </div>
                </div>  

                  <div className="row row-sm mt-2">
                    <div className="col-sm-2 ml-auto">
                      <div className="form-group">
                        <button className="btn btn-primary btn-block" type="button"><i className="fa fa-plus" /></button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <hr/>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  
                  <div className="settings-widget">
                    <div className="h3 card-title">                        
                      <label>Additional Participants</label>
                    </div>
                    <div className="row row-sm">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Host(Autocomplete)</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>Name</label>
                          <input className="form-control" type="text" />
                        </div>
                      </div>                        
                      <div className="col-sm-2">
                        <div className="form-group">
                          <label className="d-none d-sm-block">&nbsp;</label>
                          <button className="btn btn-danger btn-block set-btn" type="button"><i className="fa fa-trash-o" /></button>
                        </div>
                      </div>
                    </div>                                          
                    <div className="row row-sm">
                      <div className="col-sm-2 ml-auto">
                        <div className="form-group">
                          <button className="btn btn-primary btn-block" type="button"><i className="fa fa-plus" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                                    
                </div>
              </div>
              <div className="submit-section">                
                <button className="btn btn-primary submit-btn">Save</button>
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