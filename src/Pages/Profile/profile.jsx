/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import placeholders from './../../assets/img/placeholder.jpg';

const Profile = () => {

  return (
    <div>
      <div className="page-wrapper">


        <Helmet>
          <title>Employee Profile - HRMS admin Template</title>
          <meta name="description" content="Reactify Blank Page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">My Profile</h3>
                
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-view">
                    <div className="profile-img-wrap">
                      <div className="profile-img">
                        <a href="#"><img alt="" src={placeholders} /></a>
                      </div>
                    </div>
                    <div className="profile-basic">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="profile-info-left">
                            <h3 className="user-name m-t-0 mb-0">Bhavesh Nagotha</h3>
                            <h6 className="text-muted">Software Engineer</h6>
                            <div className="small doj text-muted">Date of Join : 1st Mar 2022</div>
                            {/* <div className="staff-msg"><Link onClick={()=>localStorage.setItem("minheight","true")} className="btn btn-custom" to="/conversation/chat">Send Message</Link></div> */}
                          </div>
                        </div>
                        <div className="col-md-7">
                          <ul className="personal-info">
                            <li>
                              <div className="title">Phone:</div>
                              <div className="text"><a href="">9662948584</a></div>
                            </li>
                            <li>
                              <div className="title">Email:</div>
                              <div className="text"><a href="">bhavesh.nagotha@ascentinfo.solutions</a></div>
                            </li>
                            <li>
                              <div className="title">Birthday:</div>
                              <div className="text">3rd February</div>
                            </li>
                            <li>
                              <div className="title">Address:</div>
                              <div className="text">1861 Bayonne Ave, Manchester Township, NJ, 08759</div>
                            </li>
                            <li>
                              <div className="title">Gender:</div>
                              <div className="text">Male</div>
                            </li>                            
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="pro-edit"><a data-bs-target="#profile_info" data-bs-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>          
          
        </div>
        {/* /Page Content */}

        {/* Profile Modal */}
        <div id="profile_info" className="modal custom-modal fade" role="dialog">
              <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Profile Information</h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="profile-img-wrap edit-img">
                            <img className="inline-block" src={placeholders} alt="user" />
                            <div className="fileupload btn">
                              <span className="btn-text">edit</span>
                              <input className="upload" type="file" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" defaultValue="John" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" defaultValue="Doe" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Birth Date</label>
                                <div>
                                  <input className="form-control datetimepicker" type="date" defaultValue="05/06/1985" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Gender</label>
                                <select className="select form-control">
                                  <option value="male selected">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input type="text" className="form-control" defaultValue="4487 Snowbird Lane" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>State</label>
                            <input type="text" className="form-control" defaultValue="New York" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" defaultValue="United States" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Pin Code</label>
                            <input type="text" className="form-control" defaultValue={10523} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" defaultValue="631-889-3206" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Department <span className="text-danger">*</span></label>
                            <select className="select">
                              <option>Select Department</option>
                              <option>Web Development</option>
                              <option>IT Management</option>
                              <option>Marketing</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Designation <span className="text-danger">*</span></label>
                            <select className="select">
                              <option>Select Designation</option>
                              <option>Web Designer</option>
                              <option>Web Developer</option>
                              <option>Android Developer</option>
                            </select>
                          </div>
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
            {/* /Profile Modal */}

          
      </div>
    </div>
  )
}

export default Profile