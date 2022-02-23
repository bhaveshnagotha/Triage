import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/profiles/avatar-01.jpg';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"


const UserList = () => {
  
  const [data, setData] = useState([
    {id:1,name:"Bernardo Galaviz",image:placeholders,username:"bernardog",user_type:"Client",created_date:"5 Jan 2022",role:"Superadmin",status:"Active"},
    {id:2,name:"Catherine Manseau",image:placeholders,username:"catherine",user_type:"Employee",created_date:"5 Jan 2022",role:"Admin",status:"Inactive"},
    {id:3,name:"Jeffery Lalor",image:placeholders,username:"jefferyl",user_type:"Client",created_date:"5 Jan 2022",role:"Staff",status:"Active"},
    {id:4,name:"Jeffrey Warden",image:placeholders,username:"jeffreyw",user_type:"Employee",created_date:"5 Jan 2022",role:"Superadmin",status:"Active"},
    {id:5,name:"John Due",image:placeholders,username:"johnd",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Active"},
    {id:6,name:"John Smith",image:placeholders,username:"johns",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:7,name:"Lesley Grauer",image:placeholders,username:"lesleyg",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:8,name:"Loren Gatlin",image:placeholders,username:"loreng",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:9,name:"Mike Litorus",image:placeholders,username:"mikel",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:10,name:"Richard Miles",image:placeholders,username:"rechardm",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:11,name:"Tarah Shropshire",image:placeholders,username:"tarahs",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:12,name:"Wilmer Deluna",image:placeholders,username:"wilmerd",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
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
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => (            
            <h2 className="table-avatar">
              <Link to="/app/profile/Staff-profile" className="avatar"><img alt="" src={record.image} /></Link>
              <Link to="/app/profile/Staff-profile">{text}</Link>
            </h2>
          ), 
          sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Username',
        dataIndex: 'username',
        sorter: (a, b) => a.username.length - b.username.length,
      },

      {
        title: 'User Type',
        dataIndex: 'user_type', 
        sorter: (a, b) => a.user_type.length - b.user_type.length,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        render: (text, record) => (
            <span className={text ==="Admin" ? "badge bg-inverse-danger" :  "badge bg-inverse-success" }
           >{text}</span>
          ),
        sorter: (a, b) => a.role.length - b.role.length,
      },      
      {
        title: 'Created By',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
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
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
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
                <h3 className="page-title">User List </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/user-list">Users</Link></li>
                  <li className="breadcrumb-item active">List</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-plus" /> Add User</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-4 col-md-2">  
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Name</label>
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
              <div className="form-group form-focus select-focus">
                <select className="select floating"> 
                  <option>Select Type</option>
                  <option>Client</option>
                  <option>Employee</option>
                </select>
                <label className="focus-label">User Type</label>
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
              <div className="form-group form-focus select-focus">
                <select className="select floating"> 
                  <option>Select Roll</option>
                  <option>Superadmin</option>
                  <option>Admin</option>
                  <option>Staff</option>                  
                </select>
                <label className="focus-label">Role</label>
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
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
                <h5 className="modal-title">Add User</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Username <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>                    
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password <span className="text-danger">*</span></label>
                        <input className="form-control" type="password" />
                      </div>
                    </div>                                        
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Type <span className="text-danger">*</span></label><br/>
                        <div class="form-check form-check-inline">
                          <input defaultChecked type="checkbox" class="form-check-input" id="client"/>
                          <label class="form-check-label" for="client">
                            Client
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="employee"/>
                          <label class="form-check-label" for="employee">
                            Employee
                          </label>
                        </div>

                      </div>
                    </div>                    

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Role <span className="text-danger">*</span></label><br/>                        
                        <div class="form-check form-check-inline">
                          <input defaultChecked type="checkbox" class="form-check-input" id="superadmin"/>
                          <label class="form-check-label" for="superadmin">
                            Superadmin
                          </label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="admin"/>
                          <label class="form-check-label" for="admin">
                            Admin
                          </label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="staff"/>
                          <label class="form-check-label" for="staff">
                            Staff
                          </label>
                        </div>

                      </div>                      
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Status</label><br/>
                        <div className="form-check form-check-inline">
                          <input defaultChecked className="form-check-input" type="radio" name="status" id="active" defaultValue="Active" />
                          <label className="form-check-label" htmlFor="active">Active</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="status" id="inactive" defaultValue="Inactive" />
                          <label className="form-check-label" htmlFor="inactive">Inactive</label>
                        </div>

                      </div>
                    </div>

                    
                    
                  </div>                   
                  <div className="row">
                    
                    <div className="col-md-12 mt-4">
                      <div className="form-group">
                        <h4>Business Contact</h4>                        
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company Address</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone No</label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" />
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

export default UserList