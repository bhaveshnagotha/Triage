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

import * as yup from 'yup';

import MasterService from "../../Services/master.service";
import AuthService from "../../Services/auth.service";
import { Toast } from 'primereact/toast';

import moment from 'moment';

let schema = yup.object().shape({
  usertype : yup.string().required("Please enter user type"),
});


const UserType = () => {

  const [data, setData] = useState([]);

  const [editid, setEditId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(true);

  const closeModalRefDelUserType= useRef(null);
  const closeModalRefAddUserType= useRef(null);
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

    //console.log(data);
    if(isAddMode){
      data["id"] = ""      
      createUserType(data)
    }else{      
      updateUserType(data)
    }
  } 
  //console.log(errors);
  const  createUserTypeFrm = () => {
    setIsAddMode(true);
    reset();
}

  // Delete record
  const handleDeleteUserType = () => {    
    
    MasterService.deleteUserType(editid).then((res)=>{
      if(res.status === 200){          
        getAllUserTypes()
        displaySuccess(res.data.message)
        closeModalRefDelUserType.current.click();
      }
    }
    ).catch(error => {
      displayError(error)
      closeModalRefDelUserType.current.click();
    });
  }

  // Get All Record
  const getAllUserTypes = (data)=>{
    MasterService.getUserTypeList(data).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result)
        setData(res.data.result)
      }
    }
  ).catch(error => {
    displayError(error)
  });
}

  // Insert Record
  const createUserType = (data) => {

  MasterService.createUserType(data).then(
    (response) => {
        if(response.status === 200) {
            reset()
            displaySuccess(response.data.message)
            closeModalRefAddUserType.current.click();
            getAllUserTypes()
            
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
  const editUserType = (id) => {

    reset();      
    setIsAddMode(false);
    MasterService.editUserType(id).then(
      (response) => {            
          //console.log(response.data.result.rows[0])    
          const fields = ['usertype', 'status', 'id'];
          fields.forEach(field => {
            //console.log(response.data.result)
            setValue(field, response.data.result[field])                          
          });            
      },
      (error) => {         
        //console.log(error)        
      }
  );
  }

  // Update Record
  const updateUserType = (data) => {

    MasterService.updateUserType(data).then(
      (response) => {        
          if(response.status === 200) {
              reset()
              displaySuccess(response.data.message)
              closeModalRefAddUserType.current.click();
              getAllUserTypes()
              
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
    getAllUserTypes()
  },[]);  

    const columns = [    
      
      {
        title: 'User Type',
        dataIndex: 'usertype',        
        sorter: (a, b) => a.usertype.length - b.usertype.length,
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
          <div className="action-label text-left">
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
            <div className="dropdown dropdown-action text-center">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" onClick={() =>editUserType(record.id)} data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
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
  getAllUserTypes(data)
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
                <h3 className="page-title">User Type </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/user-type">User Type</Link></li>
                  <li className="breadcrumb-item active">List</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" onClick={()=>createUserTypeFrm()} className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-plus" /> Add User Type</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <form onSubmit={searchHandleSubmit(onSearchBtn)}>
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">  
              <div className="form-group">
                <input type="text" className="form-control" {...searchRegister('by_name')} placeholder="User Type"/>                
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
                <h5 className="modal-title">{isAddMode ===true ? 'Add' : 'Edit'} User Type</h5>
                <button type="button" className="close" ref={closeModalRefAddUserType} data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="row">
                    <input type="hidden" {...register("id")}/>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>User Type <span className="text-danger">*</span></label>
                        <input className={errors.usertype ? 'form-control is-invalid': 'form-control'} type="text" name="usertype" {...register("usertype")}/>
                        {errors.usertype && <div className="invalid-feedback">
                          {errors.usertype?.message}
                        </div>}
                      </div>
                    </div>    
                    <div className="col-sm-6">  
                      <div className="form-group">                        
                        <label>Status</label>                        
                        <div className="status-toggle">
                          <input type="checkbox" id="status" className="check" defaultChecked {...register("status")}/>
                          <label htmlFor="status" className="checktoggle">checkbox</label>
                        </div>
                      </div>
                    </div>                
                    
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
                  <h3>Delete User Type</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a onClick={()=>handleDeleteUserType()} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a data-bs-dismiss="modal" ref={closeModalRefDelUserType} className="btn btn-primary cancel-btn">Cancel</a>
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

export default UserType