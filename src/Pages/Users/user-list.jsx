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
    {id:1,name:"Bernardo Galaviz",image:placeholders,username:"bernardog",company:"Tbz Technologies",created_date:"5 Jan 2022",role:"Superadmin",status:"Active"},
    {id:2,name:"Catherine Manseau",image:placeholders,username:"catherine",company:"Ascent Solutions",created_date:"5 Jan 2022",role:"Admin",status:"Inactive"},
    {id:3,name:"Jeffery Lalor",image:placeholders,username:"jefferyl",company:"Ascent Solutions",created_date:"5 Jan 2022",role:"Staff",status:"Active"},
    {id:4,name:"Jeffrey Warden",image:placeholders,username:"jeffreyw",company:"Tbz Technologies",created_date:"5 Jan 2022",role:"Superadmin",status:"Active"},
    {id:5,name:"John Due",image:placeholders,username:"johnd",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Active"},
    {id:6,name:"John Smith",image:placeholders,username:"johns",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:7,name:"Lesley Grauer",image:placeholders,username:"lesleyg",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:8,name:"Loren Gatlin",image:placeholders,username:"loreng",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:9,name:"Mike Litorus",image:placeholders,username:"mikel",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:10,name:"Richard Miles",image:placeholders,username:"rechardm",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:11,name:"Tarah Shropshire",image:placeholders,username:"tarahs",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:12,name:"Wilmer Deluna",image:placeholders,username:"wilmerd",company:"Ascent Solutions",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
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
        title: 'Company',
        dataIndex: 'company', 
        sorter: (a, b) => a.company.length - b.company.length,
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
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => (
            <span className={text ==="Inactive" ? "badge bg-inverse-danger" :  "badge bg-inverse-success" }
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
                  <li className="breadcrumb-item active">User List</li>
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
                  <option>Select Company</option>
                  <option>Tbz Technologies</option>
                  <option>Ascent Solutions</option>
                </select>
                <label className="focus-label">Company</label>
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
                        <label>Last Name</label>
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
                        <label>Email <span className="text-danger">*</span></label>
                        <input className="form-control" type="email" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" type="password" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input className="form-control" type="password" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone </label>
                        <input className="form-control" type="text" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Role</label>
                        <select className="select">
                          <option>Admin</option>
                          <option>Client</option>
                          <option>Employee</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company</label>
                        <select className="select">
                          <option>Global Technologies</option>
                          <option>Delta Infotech</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">  
                      <div className="form-group">
                        <label>Employee ID <span className="text-danger">*</span></label>
                        <input type="text" className="form-control floating" />
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive m-t-15">
                    <table className="table table-striped custom-table">
                      <thead>
                        <tr>
                          <th>Module Permission</th>
                          <th className="text-center">Read</th>
                          <th className="text-center">Write</th>
                          <th className="text-center">Create</th>
                          <th className="text-center">Delete</th>
                          <th className="text-center">Import</th>
                          <th className="text-center">Export</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Employee</td>
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
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Holidays</td>
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
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Leaves</td>
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
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                        </tr>
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
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
                          </td>
                          <td className="text-center">
                            <input defaultChecked type="checkbox" />
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

export default UserList