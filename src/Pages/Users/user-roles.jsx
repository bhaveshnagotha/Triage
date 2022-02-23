import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/profiles/avatar-01.jpg';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"


const UserRoles = () => {
  
  const [data, setData] = useState([
    {id:1,role_name:"Superadmin",company_name:"Ascent Infosolutions",created_by:"john doe",created_date:"23 Feb 2022",status:"Active"},
    {id:2,role_name:"Admin",company_name:"Tbz Technologies",created_by:"john doe",created_date:"23 Feb 2022",role:"Admin",status:"Inactive"},
    {id:3,role_name:"Staff",company_name:"Ascent Infosolutions",created_by:"john doe",created_date:"23 Feb 2022",status:"Active"},
    
  ]);
  useEffect( ()=>{
    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });  

    const columns = [
      
      {
        title: 'Role ID',
        dataIndex: 'id',        
        sorter: (a, b) => a.id.length - b.id.length,
      },
      {
        title: 'Role Name',
        dataIndex: 'role_name',
        render: (text, record) => (            
            <h2 className="table-avatar">              
              <Link to="/user-roles">{text}</Link>
            </h2>
          ), 
          sorter: (a, b) => a.role_name.length - b.role_name.length,
      },
      {
        title: 'For Company',
        dataIndex: 'company_name',
        sorter: (a, b) => a.company_name.length - b.company_name.length,
      },      
      {
        title: 'Created By',
        dataIndex: 'created_by',
        sorter: (a, b) => a.created_by.length - b.created_by.length,
      },    
      {
        title: 'Created On',
        dataIndex: 'created_date',
        sorter: (a, b) => a.created_date.length - b.created_date.length,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => (
          <div className="action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded" href="#">
            <i className={text === "Active" ? "fa fa-dot-circle-o text-success" 
          :"fa fa-dot-circle-o text-danger" } /> {text}
          </a>
        </div>
          ),
        sorter: (a, b) => a.status.length - b.status.length,
      },      
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_user"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
      },
    ]
    

  return (
    
    <>

      <div className="page-wrapper">           
        

        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">User Roles </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/user-list">Users</Link></li>
                  <li className="breadcrumb-item active">List</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-plus" /> Add User Role</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">  
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Role Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3"> 
              <div className="form-group form-focus select-focus">
                <select className="select floating"> 
                  <option>Select For Company</option>
                  <option>Ascent Infosolutions</option>
                  <option>Tbz Technologies</option>
                </select>
                <label className="focus-label">For Company</label>
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
              <a href="#" className="btn btn-success btn-block w-100"> Search </a>  
            </div>     
          </div>
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
              <Table className="table-striped"
                  pagination= { {total : data.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={data}
                  rowKey={record => record.id}
                  // onChange={this.handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add User Modal */}
        <div id="add_user" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User Role</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group">
                        <label>User Role Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>                    
                    <div className="col-sm-5">
                      <div className="form-group">
                        <label>For Company <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>                                                            
                    <div className="col-sm-2">  
                      <div className="form-group">                        
                        <label>Status</label>                        
                        <div className="status-toggle">
                          <input type="checkbox" id="status" className="check" defaultChecked/>
                          <label htmlFor="status" className="checktoggle">checkbox</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive m-t-15">
                    <table className="table table-striped custom-table">
                      <thead>
                        <tr>                          
                          <th>Module Access & Permission</th>
                          <th className="text-center">Create</th>
                          <th className="text-center">Edit</th>
                          <th className="text-center">View</th>
                          <th className="text-center">Delete</th>                          
                          <th> &nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>                          
                          <td>Events</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>  
                          <td>
                            <div className="status-toggle">
                              <input type="checkbox" id="events_module" className="check" defaultChecked/>
                              <label htmlFor="events_module" className="checktoggle">checkbox</label>
                            </div>
                          </td>                        
                        </tr>
                        <tr>                          
                          <td>RSVP Card</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>     
                          <td>
                            <div className="status-toggle">
                              <input type="checkbox" id="rsvpcard_module" className="check"/>
                              <label htmlFor="rsvpcard_module" className="checktoggle">checkbox</label>
                            </div>
                          </td>                     
                        </tr>
                        <tr>                          
                          <td>Post Event</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>                          
                          <td>
                            <div className="status-toggle">
                              <input type="checkbox" id="post_event_module" className="check" defaultChecked/>
                              <label htmlFor="post_event_module" className="checktoggle">checkbox</label>
                            </div>
                          </td>
                        </tr>
                        <tr>                          
                          <td>Connections</td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>                          
                          <td>
                            <div className="status-toggle">
                              <input type="checkbox" id="connections_module" className="check"/>
                              <label htmlFor="connections_module" className="checktoggle">checkbox</label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add User Modal */}
        {/* Delete User Modal */}
        <div className="modal custom-modal fade" id="delete_user" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete User</h3>
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
        {/* /Delete User Modal */}

      </div>
        
    </>
  )
}

export default UserRoles