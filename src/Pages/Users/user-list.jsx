/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/profiles/avatar-01.jpg';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


let schema = yup.object().shape({
  firstname: yup.string().required("Please enter first name").max(25),
  lastname: yup.string().required("Please enter last name").max(25),
  username: yup.string().required("Please enter username").max(25),
  email: yup.string().required("Please enter email address").email("Please enter valid email address"),
  password: yup.string().required("Please enter password").min(8).max(15),  
  user_type:yup.array().required("Must choose at least one user type.").nullable()
      .of(
        yup.object().shape({
          user_type: yup.boolean()
        })
      )
      .min(1, "Must choose at least one user type."),
  user_role:yup.array().required("Must choose at least one user role.").nullable()
    .of(
      yup.object().shape({
        user_type: yup.boolean()
      })
    )
    .min(1, "Must choose at least one user role."),
  business_email: yup.string().email("Please enter valid email address"),
  business_phone_no: yup.string().max(10),
});

const UserList = () => {

  const { register, handleSubmit, formState: { errors }} = useForm(
    {
      resolver:yupResolver(schema),
    }
  );

  const onSubmitClick = (data) => {    
    console.log(data);
  } 
  console.log(errors);


  
  const [data, setData] = useState([
    {id:1,name:"Bernardo Galaviz",email:"Bernardo@gmail.com",image:placeholders,username:"bernardog",user_type:"Client",created_date:"5 Jan 2022",role:"Superadmin",status:"Active"},
    {id:2,name:"Catherine Manseau",email:"Catherine@gmail.com",image:placeholders,username:"catherine",user_type:"Employee",created_date:"5 Jan 2022",role:"Admin",status:"Inactive"},
    {id:3,name:"Jeffery Lalor",email:"Jeffery@gmail.com",image:placeholders,username:"jefferyl",user_type:"Client",created_date:"5 Jan 2022",role:"Staff",status:"Active"},
    {id:4,name:"Jeffrey Warden",email:"Jeffrey@gmail.com",image:placeholders,username:"jeffreyw",user_type:"Employee",created_date:"5 Jan 2022",role:"Superadmin",status:"Active"},
    {id:5,name:"John Due",email:"John@gmail.com",image:placeholders,username:"johnd",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Active"},
    {id:6,name:"John Smith",email:"John@gmail.com",image:placeholders,username:"johns",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:7,name:"Lesley Grauer",email:"Lesley@gmail.com",image:placeholders,username:"lesleyg",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:8,name:"Loren Gatlin",email:"Loren@gmail.com",image:placeholders,username:"loreng",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:9,name:"Mike Litorus",email:"Mike@gmail.com",image:placeholders,username:"mikel",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:10,name:"Richard Miles",email:"Richard@gmail.com",image:placeholders,username:"rechardm",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:11,name:"Tarah Shropshire",email:"Tarah@gmail.com",image:placeholders,username:"tarahs",user_type:"Client",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
    {id:12,name:"Wilmer Deluna",email:"Wilmer@gmail.com",image:placeholders,username:"wilmerd",user_type:"Employee",created_date:"14 Jan 2022",role:"Staff",status:"Inactive"},
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
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
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
                  <option>Select Role</option>
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
                <form onSubmit={handleSubmit(onSubmitClick)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>First Name <span className="text-danger">*</span></label>
                        <input className={errors.firstname ? 'form-control is-invalid': 'form-control'} type="text" {...register("firstname")} maxlength="25"/>
                        {errors.firstname && <div className="invalid-feedback">
                          {errors.firstname?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Last Name <span className="text-danger">*</span></label>
                        <input className={errors.lastname ? 'form-control is-invalid': 'form-control'} type="text" {...register("lastname")} maxlength="25"/>
                        {errors.lastname && <div className="invalid-feedback">
                          {errors.lastname?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Username <span className="text-danger">*</span></label>
                        <input className={errors.username ? 'form-control is-invalid': 'form-control'} type="text" {...register("username")} maxlength="25"/>
                        {errors.username && <div className="invalid-feedback">
                          {errors.username?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email <span className="text-danger">*</span></label>                        
                        <input className={errors.email ? 'form-control is-invalid': 'form-control'} type="email" {...register("email")} maxlength="25"/>
                        {errors.email && <div className="invalid-feedback">
                          {errors.email?.message}
                        </div>}
                      </div>
                    </div>                    
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password <span className="text-danger">*</span></label>
                        <input className={errors.password ? 'form-control is-invalid': 'form-control'} type="password" {...register("password")} minlength="0"/>
                        {errors.password && <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>}
                      </div>
                    </div>                                        
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Type <span className="text-danger">*</span></label><br/>
                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="client" {...register("user_type")}/>
                          <label class="form-check-label" for="client">
                            Client
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="employee" {...register("user_type")}/>
                          <label class="form-check-label" for="employee">
                            Employee
                          </label>
                        </div>
                        {errors.user_type && <div className="invalid-feedback">
                          {errors.user_type?.message}
                        </div>}

                      </div>
                    </div>                    

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Role <span className="text-danger">*</span></label><br/>                        
                        <div class="form-check form-check-inline">
                          <input defaultChecked type="checkbox" class="form-check-input" id="superadmin" {...register("user_role")}/>
                          <label class="form-check-label" for="superadmin">
                            Superadmin
                          </label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="admin" {...register("user_role")}/>
                          <label class="form-check-label" for="admin">
                            Admin
                          </label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input type="checkbox" class="form-check-input" id="staff" {...register("user_role")}/>
                          <label class="form-check-label" for="staff">
                            Staff
                          </label>
                        </div>

                        {errors.user_role && <div className="invalid-feedback">
                          {errors.user_role?.message}
                        </div>}

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
                        <input className="form-control" type="text" {...register("business_phone_no")}/>
                        {errors.business_phone_no && <div className="invalid-feedback">
                          {errors.business_phone_no?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" {...register("business_email")}/>
                        {errors.business_email && <div className="invalid-feedback">
                          {errors.business_email?.message}
                        </div>}
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