/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/profiles/avatar-01.jpg';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import MasterService from "../../Services/master.service";
import AuthService from "../../Services/auth.service";
import { Toast } from 'primereact/toast';
import * as yup from 'yup';

import moment from 'moment';


let schema = yup.object().shape({
  rolename: yup.string().required("Please enter user role name").max(35),
  companyid: yup.string().required("Please enter for company").max(35)  
});


const UserRoles = () => {


  const [activeCompanyList, setActiveCompanyList] = useState([]);

  const [data, setData] = useState([]);

  const [editid, setEditId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(true);

  const closeModalRefDelUserRole= useRef(null);
  const closeModalRefAddUserRole= useRef(null);
  const toastMsg = useRef(null);



  const displaySuccess = (msg) => {
      toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
  }
  const displayError = (msg) => {
      toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
  }


  const { register, handleSubmit,reset,setValue, formState: { errors }} = useForm(
    {
      resolver:yupResolver(schema),
    }
  );

const onSubmitForm = (data) => {

  var currentUserFullname = AuthService.getUserFullname();        
    data["createdby"] = currentUserFullname;    
    data["updatedby"] = currentUserFullname;
    
    if(isAddMode){
      data["id"] = ""      
      createUserRole(data)
    }else{      
      updateUserRole(data)
    }
  } 
  //console.log(errors);
  const  createUserRoleFrm = () => {
    setIsAddMode(true);
    reset();
} 

// Delete record
const handleDeleteUserRole = () => {    
    
  MasterService.deleteUserRole(editid).then((res)=>{
    if(res.status === 200){          
      getAllUserRoles()
      displaySuccess(res.data.message)
      closeModalRefDelUserRole.current.click();
    }
  }
  ).catch(error => {
    displayError(error)
    closeModalRefDelUserRole.current.click();
  });
}

  // Get Active Companies
  const getActiveCompanies = ()=>{

    
    MasterService.getActiveCompanies().then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result)
        setActiveCompanyList(res.data.result)
      }
    }
  ).catch(error => {
    console.log(error)
  });
}  


  // Get All Record
  const getAllUserRoles = (data)=>{
    MasterService.getUserRoleList(data).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result.rows)
        setData(res.data.result.rows)
      }
    }
  ).catch(error => {
    displayError(error)
  });
}

  // Insert Record
  const createUserRole = (data) => {

  MasterService.createUserRole(data).then(
    (response) => {
        if(response.status === 200) {
            reset()
            displaySuccess(response.data.message)
            closeModalRefAddUserRole.current.click();
            getAllUserRoles()
            
        }else{
            displayError(response.data.message)
        }      
      
    },
    (error) => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        displayError(resMessage)
        //console.log(resMessage)      
    }
);

}

// Edit Record
  const editUserRole = (id) => {

    reset();      
    setIsAddMode(false);
    MasterService.editUserRole(id).then(
      (response) => {            
          //console.log(response.data.result.rows[0])    
          const fields = ['rolename','companyid', 'status', 'id'];
          fields.forEach(field => {
            //console.log(response.data.result.rows[0][field])
            setValue(field, response.data.result[field])                          
          });            
      },
      (error) => {         
        //console.log(error)        
      }
  );
  }

  // Update Record
  const updateUserRole = (data) => {

    MasterService.updateUserRole(data).then(
      (response) => {        
          if(response.status === 200) {
              reset()
              displaySuccess(response.data.message)
              closeModalRefAddUserRole.current.click();
              getAllUserRoles()
              
          }else{
              displayError(response.data.message)
          }
          
        
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          displayError(resMessage)
          //console.log(resMessage)      
      }
  );
  
  }

  useEffect( ()=>{
    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
    getActiveCompanies()
    getAllUserRoles()
  },[]);  

    const columns = [     
      
      {
        title: 'Role Name',
        dataIndex: 'rolename',
        render: (text, record) => (            
            <h2 className="table-avatar">              
              <Link to="/user-roles">{text}</Link>
            </h2>
          ), 
          sorter: (a, b) => a.rolename.length - b.rolename.length,
      },
      {
        title: 'For Company',
        dataIndex: 'company_name',
        sorter: (a, b) => a.company_name.length - b.company_name.length,
      },      
      {
        title: 'Created By',
        dataIndex: 'createdby',
        sorter: (a, b) => a.createdby.length - b.createdby.length,
      },    
      {
        title: 'Created On',
        dataIndex: 'createddate',
        sorter: (a, b) => a.createddate.length - b.createddate.length,
        render: (createddate) => { 
          return (<p>                  
            {moment(createddate).format('DD-MM-YYYY')}
          </p>)
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => (
          <div className="action-label text-center">
          <a className="btn btn-white btn-sm btn-rounded" href="#">
            <i className={text === true ? "fa fa-dot-circle-o text-success" 
          :"fa fa-dot-circle-o text-danger" } /> {text === true ? "Active" : "Inactive"}
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
                <a className="dropdown-item" href="#" onClick={() =>editUserRole(record.id)} data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" onClick={() =>setEditId(record.id)} data-bs-toggle="modal" data-bs-target="#delete_user"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
      },
    ]
  // Search start
  const { register:searchRegister, handleSubmit:searchHandleSubmit,reset:searchReset,setValue:searchSetValue, formState: { errors:searchErrors }} = useForm();

  const onSearchBtn = (data)=>{
    console.log(data)
    getAllUserRoles(data)
  }
  // Search end  

  return (
    
    <>

      <div className="page-wrapper">   
       <Toast ref={toastMsg} />

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
                <a href="#" onClick={()=>createUserRoleFrm()} className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-plus" /> Add User Role</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <form onSubmit={searchHandleSubmit(onSearchBtn)}>
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">  
              <div className="form-group">
                <input type="text" className="form-control" {...searchRegister('by_name')} placeholder="Role Name"/>                
              </div>
            </div>
            <div className="col-sm-6 col-md-3"> 
              <div className="form-group">
                <select className="form-select" {...searchRegister('by_company')}> 
                  <option value="">Select For Company</option>
                  {activeCompanyList.map(({ id, company_name }, index) => <option value={id}>{company_name}</option>)}                  
                </select>                
              </div>
            </div>            
            <div className="col-sm-6 col-md-3"> 
              <div className="form-group">
                <select className="form-select" {...searchRegister('by_status')}> 
                  <option value="">Select Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>                  
                </select>                
              </div>
            </div>
            <div className="col-sm-6 col-md-3">  
              <input type="submit" className="btn btn-success btn-block w-100" value="Search" />
            </div>     
          </div>
          </form>
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
                <h5 className="modal-title">{isAddMode ===true ? 'Add' : 'Edit'} User Role</h5>
                <button type="button" className="close" ref={closeModalRefAddUserRole} data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group">
                        <label>User Role Name <span className="text-danger">*</span></label>
                        <input className={errors.rolename ? 'form-control is-invalid': 'form-control'} type="text" name="rolename" {...register("rolename")}/>
                        {errors.rolename && <div className="invalid-feedback">
                          {errors.rolename?.message}
                        </div>}
                      </div>
                    </div>                    
                    <div className="col-sm-5">
                      <div className="form-group">
                        <label>For Company <span className="text-danger">*</span></label>
                        {/* select floating  */}
                        <select className={errors.companyid ? 'form-select is-invalid': 'form-select'} {...register("companyid")}> 
                          <option value="">Select For Company</option>
                          {activeCompanyList.map(({ id, company_name }, index) => <option value={id}>{company_name}</option>)}                  
                        </select>
                        
                        {errors.companyid && <div className="invalid-feedback">
                          {errors.companyid?.message}
                        </div>}
                      </div>
                    </div>                                                            
                    <div className="col-sm-2">  
                      <div className="form-group">                        
                        <label>Status</label>                        
                        <div className="status-toggle">
                          <input type="checkbox" id="status" className="check" defaultChecked {...register("status")}/>
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
                    <button className="btn btn-primary submit-btn" type="submit">SUBMIT</button>
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
                  <h3>Delete User Role</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a onClick={()=>handleDeleteUserRole()} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a ref={closeModalRefDelUserRole}  data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
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