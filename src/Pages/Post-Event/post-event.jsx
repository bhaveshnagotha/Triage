/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect } from 'react';
//import { Link } from 'react-router-dom';
//import $ from 'jquery';
//import placeholders from './../../assets/img/placeholder.jpg';
import ReactQuill from 'react-quill';
import $ from 'jquery';

const PostEvent = () => {  
  useEffect( ()=>{
    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });

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
      }
    },
    history: {
      delay: 200,
      maxStack: 500,
      userOnly: true
    }
  };

  return (
    
    <div>

      <div className="page-wrapper">

        {/* Page Content */}
      <div className="content container-fluid">
        
        {/* Tabs */}
        <section className="comp-section-top" id="comp_tabs">
          <h3 className="page-title">Post Event</h3>                    
          <div className="row">

            <div className="col-md-12">
              <div className="card">
                <div className="card-body">                  

                  <div className="row">
                    <div className="col-sm-4 col-md-6">
                      <div className="form-group">
                        <select className="select">                  
                          <option>Offline</option>
                          <option>Online</option>
                          <option>Hybrid</option>                  
                        </select>                        
                      </div>
                    </div>

                    
                  </div>

                  <div className="row">
                    <div className="col-sm-4 col-md-6">
                      <div className="form-group">
                        <label>Choose Event</label>
                        <select className="select">                  
                          <option>Event A</option>
                          <option>Event B</option>
                          <option>Event C</option>                  
                        </select>
                        
                      </div>
                    </div>

                    <div className="col-sm-2 col-md-6">
                      <div className="form-group">
                        <label>Event Type</label>
                        <select className="select">                  
                          <option>Select Event Type</option>
                          <option>Seminars</option>
                          <option>Conferences</option>
                          <option>Trade Shows</option>                  
                          <option>Executive Retreats</option>
                          <option>Company Meetings</option>
                          <option>Incentive Programs</option>
                          <option>Golf Events</option>
                          <option>Appreciation Events</option>
                          <option>Company Milestones</option>
                          <option>Team-Building Events</option>
                          <option>Product Launch Events</option>
                          <option>Others</option>  
                        </select>
                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-sm-4 col-md-6">
                      <div className="form-group">
                        <label>RSVP Link</label>
                        <input type="text" className="form-control" placeholder="Link generated from RSVP Card Page" value="https://google.com/EventName"/>
                        
                      </div>
                    </div>

                    <div className="col-sm-2 col-md-6">
                      <div className="form-group">
                        <div className="form-group">                                                                                   
                            <a class="btn btn-primary mt-4" href="#"> Copy</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 col-md-12">
                      <div className="form-group">                                            
                        <label>Write Something</label>
                        <ReactQuill modules={modules}/>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                      <div className="col-sm-12 col-md-12">
                        <div className="form-group text-center">                                            
                          <button className="btn btn-primary submit-btn min-w-btn-145" type="submit">SUBMIT</button>
                        </div>
                    </div>                    
                  </div>


                </div>
              </div>
            </div>  

          </div>
        </section>  

      </div>
      {/* /Page Content */}     
        
      </div>
        
    </div>
  )
}

export default PostEvent