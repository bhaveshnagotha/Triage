/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';

import ReactQuill from 'react-quill';


const RSVPForm = () => {  


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

  
  // For basic form add multiple field type start

  const [addMoreOptionsTypeListForBF, setInputOTListForBF] = useState([{ options_type: ""}]);

  // handle input change
  const handleInputOTChangeForBF = (e, index) => {
    const { name, value } = e.target;
    const list = [...addMoreOptionsTypeListForBF];
    list[index][name] = value;      
    setInputOTListForBF(list);
  };   

  // handle click event of the Add button
  const handleAddOTClickForBF = () => {
    setInputOTListForBF([...addMoreOptionsTypeListForBF, { options_type: ""}]);
  };

  // handle click event of the Remove button
  const handleRemoveOTClickForBF = index => {
    const list = [...addMoreOptionsTypeListForBF];
    list.splice(index, 1);
    setInputOTListForBF(list);
  };


  // For basic form add multiple field type end

  const [addMoreOptionsTypeList, setInputOTList] = useState([{ options_type: ""}]);

  // handle input change
  const handleInputOTChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addMoreOptionsTypeList];
    list[index][name] = value;      
    setInputOTList(list);
  };   

  // handle click event of the Add button
  const handleAddOTClick = () => {
    setInputOTList([...addMoreOptionsTypeList, { options_type: ""}]);
  };

  // handle click event of the Remove button
  const handleRemoveOTClick = index => {
    const list = [...addMoreOptionsTypeList];
    list.splice(index, 1);
    setInputOTList(list);
  };




  useEffect( ()=>{    

    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,        
        width: '100%'
      });
    }            

 });


  $(document).ready(function() {
 
    $('#smartwizard').smartWizard({      
      theme: 'arrows',
    });

    //$('#datetimepicker1').datetimepicker();
 
});

  return (
    
    <div>

      <div className="page-wrapper">

        {/* Page Content */}
      <div className="content container-fluid">
        
        {/* Page Header */}
        <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">RSVP </h3>                
              </div>              
            </div>
          </div>
          {/* /Page Header */}

        <div className="row1">

          <div id="smartwizard" className="bg-white"> 
              <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#step-1">
                    <strong>Step 1</strong> <br/>Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step-2">
                    <strong>Step 2</strong> <br/> Form Design
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step-3">
                    <strong>Step 3</strong> <br/>Email Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step-4">
                    <strong>Step 4</strong> <br/>View & Publish
                    </a>
                  </li>                  
              </ul>
          
              <div className="tab-content h-100">
                  <div id="step-1" className="tab-pane" role="tabpanel" aria-labelledby="step-1">                      
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          
                          <div className="row">
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <select className="select">                  
                                <option>Online</option>
                                <option>Offline</option>                              
                                <option>Hybrid</option>                  
                              </select>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                                <select className="select">                  
                                  <option value="">Select Event Title</option>
                                  <option>Event A</option>
                                  <option>Event B</option>                              
                                  <option>Event C</option>                  
                                </select>           
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>RSVP By</label>
                              <input className="form-control datetimepicker" id="datetimepicker1" type="text" placeholder="Select Date & Time"/>
                              </div>
                            </div>                          
                          </div>

                          <div className="row">
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>Event 1 Capacity</label>
                              <input className="form-control" type="text" placeholder="Set Max Limit" maxLength="4"/>
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>Event 2 Capacity</label>
                                <input className="form-control" type="text" placeholder="Set Max Limit" maxLength="4"/>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6 col-md-12">
                              <div className="form-group">
                              <label>Allow Guests To Do </label>                            
                              </div>
                            </div>
                            
                          </div>

                        <div className="row">
                          <div className="col-sm-6 col-md-2">
                            <div className="form-group">                            
                              <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" id="individual"/>
                                <label className="form-check-label" htmlFor="individual">
                                  Individual RSVP
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="select">                  
                                  <option value="">Set limit for plus-one guests</option>
                                  <option>10</option>                                
                                </select>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="select">                  
                                  <option value="">Allow Primary invitee to name the plus ones</option>
                                  <option>Yes</option>
                                  <option>No</option>                                
                                </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6 col-md-2">
                            <div className="form-group">                            
                              <div className="form-check form-check-inline">
                              <input type="checkbox" className="form-check-input" id="group"/>
                              <label className="form-check-label" htmlFor="group">
                                Group RSVP
                              </label>
                            </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="select">                  
                                  <option value="">Set limit for plus-one guests</option>
                                  <option>50</option>                                
                                </select>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="select">                  
                                  <option value="">Allow Primary invitee to name the group members</option>
                                  <option>Yes</option>
                                  <option>No</option>                                
                                </select>
                            </div>
                          </div>
                        </div>

                        <div className="submit-section">                
                          <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">DRAFT</button>
                          <button className="btn btn-primary submit-btn ms-1 min-w-btn-145" type="submit">SAVE</button>
                        </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div id="step-2" className="tab-pane" role="tabpanel" aria-labelledby="step-2">
                      
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-body">
                          <ul className="nav nav-tabs nav-tabs-solid nav-justified flex-column">
                            <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#basic-form">Basic Form</a></li>
                            <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#custom-form">Custom Form</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="card">
                        <div className="card-body">
                          <div className="tab-content">
                            <div id="basic-form" className="tab-pane show active">
                              <div className="card-box">
                                

                              <section className="review-section">
                              <div className="row">
                                <div className="col-md-9">
                                    <div className="review-header1 text-left">                                
                                      <h3 className="review-title">Basic Form</h3>
                                      <div className="text-muted">
                                        <div className="form-group">                            
                                          <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="basic_form_term"/>
                                            <label className="form-check-label" htmlFor="basic_form_term">
                                            I would like to use basic form for my event. <i>EVENT A</i>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_basic_form"><i className="fa fa-plus" />Create Custom Form</a>                                                                              
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="table-responsive">
                                      <table className="table table-bordered table-review review-table mb-0" id="table_alterations">
                                        <thead>
                                          <tr>                                            
                                            <th className="text-center">Field Name</th>
                                            <th className="text-center">Status</th>                                            
                                            <th>&nbsp;</th>
                                          </tr>
                                        </thead>
                                        <tbody id="table_alterations_tbody">
                                        <tr>                                            
                                            <td>
                                              <lable>Please let us know if you will be able to make it.</lable><br/>
                                              <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="addition_assignee" id="addition_no_emp" defaultValue="option1" defaultChecked />
                                                <label className="form-check-label" htmlFor="addition_no_emp">
                                                  Yes, I'll be there
                                                </label>
                                              </div>
                                              <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="addition_assignee" id="addition_all_emp" defaultValue="option2" />
                                                <label className="form-check-label" htmlFor="addition_all_emp">
                                                  No, I can't make it
                                                </label>
                                              </div>
                                            
                                            </td>
                                            <td></td>
                                            <td></td>                                            
                                          </tr>
                                          <tr>                                            
                                            <td><lable>First Name</lable></td>
                                            <td>
                                              <div className="status-toggle">
                                                <input type="checkbox" id="events_module" className="check" defaultChecked/>
                                                <label htmlFor="events_module" className="checktoggle">checkbox</label>
                                              </div>
                                            </td>    
                                            <td className="d-grid"><a href="#" data-bs-toggle="modal" data-bs-target="#delete_bf_field" className="delete-icon float-start text-center"><i className="fa fa-trash-o" /></a></td>
                                          </tr>
                                          <tr>                                            
                                            <td><lable>Last Name</lable></td>
                                            <td>
                                              <div className="status-toggle">
                                                <input type="checkbox" id="basic_form_field1" className="check" />
                                                <label htmlFor="basic_form_field1" className="checktoggle">checkbox</label>
                                              </div>
                                            </td>
                                            <td className="d-grid"><a href="#" data-bs-toggle="modal" data-bs-target="#delete_bf_field" className="delete-icon float-start text-center"><i className="fa fa-trash-o" /></a></td>
                                          </tr>
                                          <tr>                                            
                                            <td><lable>Email Address</lable></td>
                                            <td>
                                              <div className="status-toggle">
                                                <input type="checkbox" id="basic_form_field2" className="check" defaultChecked/>
                                                <label htmlFor="basic_form_field2" className="checktoggle">checkbox</label>
                                              </div>
                                            </td>
                                            <td className="d-grid"><a href="#" data-bs-toggle="modal" data-bs-target="#delete_bf_field" className="delete-icon float-start text-center"><i className="fa fa-trash-o" /></a></td>
                                          </tr>
                                          <tr>                                            
                                            <td><lable>Phone No</lable></td>
                                            <td>
                                              <div className="status-toggle">
                                                <input type="checkbox" id="basic_form_field3" className="check"/>
                                                <label htmlFor="basic_form_field3" className="checktoggle">checkbox</label>
                                              </div>
                                            </td>
                                            <td className="d-grid"><a href="#" data-bs-toggle="modal" data-bs-target="#delete_bf_field" className="delete-icon float-start text-center"><i className="fa fa-trash-o" /></a></td>
                                          </tr>
                                          <tr>                                            
                                            <td><lable>No of People Attending</lable></td>
                                            <td>
                                              <div className="status-toggle">
                                                <input type="checkbox" id="basic_form_field4" className="check" defaultChecked/>
                                                <label htmlFor="basic_form_field4" className="checktoggle">checkbox</label>
                                              </div>
                                            </td>
                                            <td className="d-grid"><a href="#" data-bs-toggle="modal" data-bs-target="#delete_bf_field" className="delete-icon float-start text-center"><i className="fa fa-trash-o" /></a></td>
                                          </tr>                                          
                                          
                                        </tbody>                                        
                                      </table>                                      
                                    </div>
                                    
                                  </div>                                  
                                </div>
                              </section>
                                <div className="submit-section">                
                                  <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">PREVIEW</button>
                                  <button className="btn btn-custom-theme submit-btn ms-1 min-w-btn-145" type="submit">DRAFT</button>
                                  <button className="btn btn-primary submit-btn ms-1 mw-100 min-w-btn-145" type="submit">SAVE</button>
                                </div>
                              </div>                              
                            </div>
                            
                            
                            
                          <div id="custom-form" className="tab-pane fade">

                          <section className="review-section">
                          <div className="row">
                              <div className="col-md-9">
                                <div className="review-header1 text-left">
                                  <h3 className="review-title">Custom Form</h3>
                                  <div className="text-muted">
                                    <div className="form-group">                            
                                      <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="custom_form_term"/>
                                        <label className="form-check-label" htmlFor="custom_form_term">
                                          I would like to use custom form for my event. <i>EVENT A</i>
                                        </label>
                                      </div>
                                    </div>
                                    </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                  <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_question"><i className="fa fa-plus" /> Add Question</a>
                              </div>
                            </div>                                                        
                            <hr/>
                              <div className="card-box">                                
                                <div className="table-responsive">
                                  <table className="table table-striped custom-table mb-0">                                  
                                    <thead>
                                      <tr>                                        
                                        <th>Question Type</th>
                                        <th>Form Type</th>
                                        <th className="text-center">Options Type</th>                                        
                                        <th>&nbsp;</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>                                        
                                        <td>Will you be able to make it?</td>
                                        <td>Radio Button</td>
                                        <td>Yead!, Maybe/Note sure, I can't</td>  
                                        <td><a href="#" className="delete-icon mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#delete_cf_question"><i className="fa fa-trash-o" /></a></td>                                                                              
                                      </tr>
                                      <tr>                                        
                                        <td>How man people are you going to bring?</td>
                                        <td>Dropdown</td>
                                        <td>Just me!</td>
                                        <td><a href="#" className="delete-icon mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#delete_cf_question"><i className="fa fa-trash-o" /></a></td>                                        
                                      </tr>
                                      <tr>                                        
                                        <td>Comments or Questions</td>
                                        <td>Textarea</td>
                                        <td>-</td>
                                        <td><a href="#" className="delete-icon mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#delete_cf_question"><i className="fa fa-trash-o" /></a></td>                                        
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              </section>                              

                              <div className="submit-section">                
                                <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">PREVIEW</button>                                
                              </div>

                            </div>                            
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Content End */}
                  </div>

                  </div>
                  <div id="step-3" className="tab-pane" role="tabpanel" aria-labelledby="step-3">
                      

                    {/* Tabs */}
                    <section className="comp-section-top" id="comp_tabs">          
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-body">                  
                              <ul className="nav nav-tabs nav-tabs-bottom">
                                <li className="nav-item"><a className="text-capitalize nav-link active" href="#default-tab" data-bs-toggle="tab">Default</a></li>
                                <li className="nav-item"><a className="nav-link" href="#Reminders-tab" data-bs-toggle="tab">Reminders</a></li>                    
                              </ul>
                              <div className="tab-content">
                                <div className="tab-pane show active" id="default-tab">

                                  <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">
                                        <label>Response Message when - </label>                                            
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 1) RSVP is</label>
                                          <select className="select">                  
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 2) Allow the primary attendee to name the plus-ones is</label>
                                          <select className="select">                  
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="Yes/No">Yes/No</option>                                                
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 3) Event is</label>
                                          <select className="select">                  
                                            <option value="Paid">Paid</option>
                                            <option value="Free">Free</option>
                                            <option value="Paid/Free">Paid/Free</option>                  
                                          </select>
                                      </div>
                                    </div>

                                    
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">                                            
                                        <ReactQuill modules={modules}/>
                                      </div>
                                    </div>
                                                                          
                                  </div>

                                  <div className="submit-section">                
                                    <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">PREVIEW</button>                                        
                                    <button className="btn btn-primary submit-btn ms-1 mw-100 min-w-btn-145" type="submit">SAVE</button>
                                  </div>

                                </div>
                                <div className="tab-pane" id="Reminders-tab">

                                    Tab 2 Content                                          

                                </div>                            
                                
                              </div>
                            </div>
                          </div>
                        </div>            
                      </div>          
                    </section>
                    {/* /Tabs */}

                  </div>
                  <div id="step-4" className="tab-pane" role="tabpanel" aria-labelledby="step-4">
                      
                  
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">Preview</h3>                
                      </div>              
                    </div>
                    
                    <div class="accordion" id="accordionExample">
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Basic Form - Prieview
                          </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div class="accordion-body">
                            
                            <div className="row">

                              <div className="card">
                                <div className="card-body"> 

                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <h2 className="h2-horizontal-line"><span>RSVP</span></h2>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <h3>Event A</h3>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <h4>March 04, 2022</h4>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-12">
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
                                  
                                

                                  <div className="h3 card-title">                        
                                    <label>CONTACT INFO</label>
                                  </div>
                                      
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <input className="form-control" type="text" placeholder="FIRST NAME"/>                                    
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <input className="form-control" type="text" placeholder="LAST NAME"/>                                    
                                    </div>
                                  </div> 

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <input className="form-control" type="text" placeholder="PHONE" />                                    
                                    </div>
                                  </div> 

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <input className="form-control" type="text" placeholder="EMAIL"/>                                    
                                    </div>
                                  </div> 

                                  <div className="col-sm-12 col-md-12">
                                      <div className="form-group">
                                        <select className="select">                  
                                          <option>NUMBER OF PEOPLE ATTENDING</option>
                                          <option>10</option>
                                          <option>20</option>                  
                                        </select>                  
                                      </div>
                                  </div>                              
                                </div>

                                <div className="col-sm-12 col-md-12"> 
                                  <div className="card">
                                      <div className="card-header">
                                        <h4 className="card-title mb-0">CHOOSE EVENTS YOU WILL PARTICIPANTS</h4>
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

                                <div className="col-sm-12 col-md-12 mt-2">
                                  <div className="form-group text-center">
                                    <label><strong>Total: 600 Rs</strong></label>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-12 mt-2">
                                  <div className="form-group text-center">
                                    <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">Pay</button>
                                  </div>
                                </div> 

                              </div>              
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Custom Form - Questions Prieview
                          </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                          <div class="accordion-body">
                            
                          <div className="row">

                              <div className="card">
                                <div className="card-body"> 
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                               
                                      <h2 className="h2-horizontal-line"><span>RSVP</span></h2>
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                               
                                      <h3>Event A</h3>
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                               
                                      <h4>March 04, 2022</h4>
                                    </div>
                                  </div>      

                                <div className="card-body">                                   
                                      
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <label><strong>Will you able to make it?</strong></label><br/>
                                      <div className="form-check form-check-inline">
                                        <input defaultChecked className="form-check-input" type="radio" name="status" id="active1" defaultValue="Active" />
                                        <label className="form-check-label" htmlFor="active1">Yeah!</label>
                                      </div><br/>
                                      <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="status" id="inactive2" defaultValue="Inactive" />
                                        <label className="form-check-label" htmlFor="inactive2">Maybe/Not sure</label>
                                      </div><br/>
                                      <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="status" id="inactive3" defaultValue="Inactive" />
                                        <label className="form-check-label" htmlFor="inactive3">I can't</label>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <label><strong>How many people are you going to bring?</strong></label><br/>
                                      <select className="select">                  
                                        <option>Just me!</option>                                        
                                      </select>
                                    </div>
                                  </div> 

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                
                                      <label><strong>Comments or Questions</strong></label><br/>
                                      <textarea className="form-control" style={{height:'100px'}}></textarea>
                                    </div>
                                  </div> 
                                                                
                                </div>


                              </div>      
                              

                              <div className="col-sm-12 col-md-12 mt-2">
                                <div className="form-group text-center">
                                  <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">Submit</button>
                                </div>
                              </div> 

                            </div>              
                            </div>

                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Email Settings - Preview 1
                          </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                          <div class="accordion-body">
                            <div className="row">

                            <div className="card">
                              <div className="card-body"> 
                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <h3><strong>Thanks for your response!</strong></h3>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <p>We received your payment!</p>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <h4 style={{color:'#B44C27'}}>Please note that we would need the name of the <strong>GUESTS</strong> <br/> accompanying you atleast by 2 <strong>WEEKS</strong> prior to the Event.</h4>
                                  </div>
                                </div>      

                                <div className="col-sm-12 col-md-12">
                                  <div className="form-group text-center">                               
                                    <p>Would you like to name your guests now?</p>
                                    <div className="form-check form-check-inline">
                                      <input defaultChecked className="form-check-input" type="radio" name="gustname" id="gustname1" defaultValue="Active" defaultChecked="checked"/>
                                      <label className="form-check-label" htmlFor="gustname1"><strong style={{color:'#B44C27'}}>YES</strong></label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="gustname" id="gustname2" defaultValue="Inactive" />
                                      <label className="form-check-label" htmlFor="gustname2"><strong style={{color:'#B44C27'}}>LATER</strong></label>
                                    </div>
                                  </div>
                                </div>


                              <div className="row">
                                <div className="col-sm-12 col-md-6">
                                  <div className="form-group text-center">                               
                                    <input className="form-control" type="text" name="firstname" placeholder="First Name"/>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                  <div className="form-group text-center">                               
                                    <input className="form-control" type="text" name="lastname" placeholder="Last Name"/>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                  <div className="form-group text-center">                               
                                    <input className="form-control" type="text" name="firstname" placeholder="First Name"/>
                                  </div>
                                </div>

                                <div className="col-sm-12 col-md-6">
                                  <div className="form-group text-center">                               
                                    <input className="form-control" type="text" name="lastname" placeholder="Last Name"/>
                                  </div>
                                </div>

                              </div>

                            </div>      


                            <div className="col-sm-12 col-md-12 mt-2">
                              <div className="form-group text-center">
                                <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">Submit</button>
                              </div>
                            </div> 

                            </div>              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFour">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                          Email Settings - Preview 2
                          </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                          <div class="accordion-body">
                          <div className="row">

                            <div className="card">
                              <div className="card-body"> 
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
                                    <h4 style={{color:'#B44C27'}}>Please note, we will send you an email on later stage 
                                    <br/>to confirm them names of the attendees</h4>
                                  </div>
                                </div>      

                            </div>      
                            

                            </div>              
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-sm-12 col-md-4">
                        <div className="form-group">                               
                          <label><strong>RSVP Link</strong></label>
                          <input className="form-control" type="text" name="rsvp_link"/>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-6 mt-3">
                        <div className="form-group">                                                         
                          <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">Generate</button>
                          <button style={{opacity:'0.3'}} className="btn btn-primary submit-btn ms-2 min-w-btn-145" type="submit">Copy</button>
                        </div>
                      </div>                      

                    </div>

                    <div className="submit-section">                                      
                      <button className="btn btn-primary submit-btn min-w-btn-145" type="submit">Publish RSVP Page</button>
                    </div>

                  </div>                  
              </div>

          </div>
        </div>
      </div>
      {/* /Page Content */}  

      {/* Add Basic Form Modal */}       
      <div id="add_basic_form" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Custom Form</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Field Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" />                    
                  </div>                  
                  <div className="form-group">
                    <label>Field Type <span className="text-danger">*</span></label>
                    <div className="add-group-btn">
                      <select className="select">
                      <option>Select Field Type</option>
                        <option value="textbox">Textbox</option>
                        <option value="textarea">Textarea</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio button</option>
                      </select>                      
                    </div>
                  </div>
                  {addMoreOptionsTypeListForBF.map((x, i) => { 
                  return (
                  <div className="form-group" key={i}>
                    <label>Field Options</label>
                    <div className="add-group-btn">
                      <input className="form-control" type="text" name="options_type" value={x.options_type}
                            onChange={e => handleInputOTChangeForBF(e, i)}/>
                      <a href="#" onClick={() => handleRemoveOTClickForBF(i)} className="delete-icon mt-2 ms-2"><i className="fa fa-trash-o" /></a>
                    </div>
                  </div>  
                  )
                  })}    
                  <div className="add-more">
                    <a href="#" onClick={() => handleAddOTClickForBF()}><i className="fa fa-plus-circle" /> Add More</a>
                  </div> 

                  <div className="form-group mt-2">                        
                    <label>Status</label>                        
                    <div className="status-toggle">
                      <input type="checkbox" id="status_for_bf" className="check" defaultChecked/>
                      <label htmlFor="status_for_bf" className="checktoggle">checkbox</label>
                    </div>
                  </div>
                              
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       </div>      
      {/* /Add Basic Form Modal */}  

      
      {/* Add Question Modal */}       
       <div id="add_question" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Question</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Type a Question <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" />                    
                  </div>                  
                  <div className="form-group">
                    <label>Select a form type <span className="text-danger">*</span></label>
                    <div className="add-group-btn">
                      <select className="select">
                      <option>Select form type</option>
                        <option value="textbox">Textbox</option>
                        <option value="textarea">Textarea</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio button</option>
                      </select>                      
                    </div>
                  </div>
                  {addMoreOptionsTypeList.map((x, i) => { 
                  return (
                  <div className="form-group" key={i}>
                    <label>Type Options</label>
                    <div className="add-group-btn">
                      <input className="form-control" type="text" name="options_type" value={x.options_type}
                            onChange={e => handleInputOTChange(e, i)}/>
                      <a href="#" onClick={() => handleRemoveOTClick(i)} className="delete-icon mt-2 ms-2"><i className="fa fa-trash-o" /></a>
                    </div>
                  </div>  
                  )
                  })}    
                  <div className="add-more">
                    <a href="#" onClick={() => handleAddOTClick()}><i className="fa fa-plus-circle" /> Add More</a>
                  </div>            
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       </div>      
      {/* /Add Question Modal */}  

      {/* Delete Basic form field Modal */}
        <div className="modal custom-modal fade" id="delete_bf_field" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete this field</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* /Delete Basic form field Modal */}

      {/* Delete custom form field Modal */}
        <div className="modal custom-modal fade" id="delete_cf_question" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete this question</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a href="" data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* /Delete custom form field Modal */} 
        
      </div>
        
    </div>
  )
}

export default RSVPForm