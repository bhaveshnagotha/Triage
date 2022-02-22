import React, {useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';

const EventList = () => {
  
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

          {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Events</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
                <li className="breadcrumb-item active">List</li>
              </ul>
            </div>
            <div className="col-auto float-end ml-auto">
              <Link to="/add-event" className="btn add-btn"><i className="fa fa-plus" /> Create Event</Link>              
            </div>
          </div>
        </div>
        {/* /Page Header */}

        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">  
            <div className="form-group form-focus">
              <input type="text" className="form-control floating" />
              <label className="focus-label">Event Name</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">  
            <div className="form-group form-focus select-focus">
              <select className="select floating"> 
                <option>Select Status</option>
                <option>Active</option>
                <option>Inactive</option>                
              </select>
              <label className="focus-label">Status</label>
            </div>
          </div>          
          <div className="col-sm-6 col-md-3"> 
            <div className="form-group form-focus select-focus">
              <select className="select floating"> 
                <option>Select Event Type</option>
                <option>Paid</option>
                <option>FREE</option>
              </select>
              <label className="focus-label">Event Type</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">  
            <a href="#" className="btn btn-success btn-block w-100"> Search </a>  
          </div>     
        </div>
        {/* Search Filter */}

        <div className="row">
          <div className="col-lg-12 col-xl-12">           
            
            
            <div className="project-task">
              <ul className="nav nav-tabs nav-tabs-top nav-justified mb-0">
                <li className="nav-item"><a className="nav-link active" href="#all_tasks" data-bs-toggle="tab" aria-expanded="true">Online</a></li>
                <li className="nav-item"><a className="nav-link" href="#pending_tasks" data-bs-toggle="tab" aria-expanded="false">Offline</a></li>
                <li className="nav-item"><a className="nav-link" href="#completed_tasks" data-bs-toggle="tab" aria-expanded="false">Hybrid</a></li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane show active" id="all_tasks">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">

                      <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>

                    
                  </div>
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                </div>
                <div className="tab-pane" id="pending_tasks" >

                <div className="row">
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                  <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                  </div>                
                </div>
    
                </div>
                <div className="tab-pane" id="completed_tasks"  >

                  <div className="row">
                    <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                    <div className="card">
                        <div className="card-body">
                        <div className="dropdown dropdown-action profile-action">
                          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_project"><i className="fa fa-pencil m-r-5" /> Edit</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_project"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                          </div>
                        </div>
                        <Link to="/event-view"><h6 className="card-title m-b-15">Event Name</h6></Link>
                        <img src={placeholders} style={{width:'-webkit-fill-available'}}/>
                        <table className="table table-striped table-border mt-2">
                          <tbody>
                            <tr>
                              <td>Date:</td>
                              <td className="text-end">21 February, 2022 </td>
                            </tr>
                            <tr>
                              <td>Location:</td>
                              <td className="text-end">Ahmedabad</td>
                            </tr>
                            <tr>
                              <td>Tickets:</td>
                              <td className="text-end">Sold 40/100</td>
                            </tr>                        
                            <tr>
                              <td>Event Type:</td>
                              <td className="text-end">FREE</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                        <div className="progress progress-xs mb-0">
                          <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                        </div>
                      </div>
                    </div>
                    </div>                  
                  </div>

                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      {/* /Page Content */}
      {/* Create Project Modal */}
      <div id="create_project" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Project</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Project Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Client</label>
                      <select className="select">
                        <option>Global Technologies</option>
                        <option>Delta Infotech</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <div>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>End Date</label>
                      <div>
                        <input className="form-control datetimepicker" type="date" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>Rate</label>
                      <input placeholder="$50" className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <select className="select">
                        <option>Hourly</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Priority</label>
                      <select className="select">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Add Project Leader</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Team Leader</label>
                      <div className="project-members">
                        <a href="#" data-bs-toggle="tooltip" title="Jeffery Lalor" className="avatar">
                          <img src="" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Add Team</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Team Members</label>
                      <div className="project-members">
                        <a href="#" data-bs-toggle="tooltip" title="John Doe" className="avatar">
                          <img src="" alt="" />
                        </a>
                        
                        <span className="all-team">+2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  {/* <ReactSummernote
                      value="Default value"
                      options={{
                        lang: 'ru-RU',
                        height: 350,
                        dialogsInBody: true,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear']],
                          ['fontname', ['fontname']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']],
                          ['insert', ['link', 'picture', 'video']],
                          ['view', ['fullscreen', 'codeview']]
                        ]
                      }}
                      // onChange={this.onChange}
                      onImageUpload={onImageUpload}
                    /> */}
                  {/* <textarea rows={4} className="form-control summernote" placeholder="Enter your message here" defaultValue={""} /> */}
                </div>
                <div className="form-group">
                  <label>Upload Files</label>
                  <input className="form-control" type="file" />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* /Create Project Modal */}
        </div>
      </div>
        
    </div>
  )
}

export default EventList