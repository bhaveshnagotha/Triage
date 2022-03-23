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
import { Toast } from 'primereact/toast';

import moment from 'moment';

let schema = yup.object().shape({
  eventtype	: yup.string().required("Please enter event type"),
});


const EventType = () => {

  const [data, setData] = useState([]);

  const [editid, setEditId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(true);

  const closeModalRefDelEventType= useRef(null);
  const closeModalRefAddEventType= useRef(null);
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

    data["createdby"] = "Bhavesh";    
    data["updatedby"] = "Bhavesh";    
    //console.log(data);
    if(isAddMode){
      data["id"] = ""      
      createEventType(data)
    }else{      
      updateEventType(data)
    }
  } 
  //console.log(errors);
  const  createEventTypeFrm = () => {
    setIsAddMode(true);
    reset();
}

  // Delete record
  const handleDeleteEventType = () => {    
    
    MasterService.deleteEventType(editid).then((res)=>{
      if(res.status === 200){          
        getAllEventTypes()
        displaySuccess(res.data.message)
        closeModalRefDelEventType.current.click();
      }
    }
    ).catch(error => {
      displayError(error)
      closeModalRefDelEventType.current.click();
    });
  }

  // Get All Record
  const getAllEventTypes = ()=>{
    MasterService.getEventTypeList().then((res)=>{
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
  const createEventType = (data) => {

  MasterService.createEventType(data).then(
    (response) => {
        if(response.status === 200) {
            reset()
            displaySuccess(response.data.message)
            closeModalRefAddEventType.current.click();
            getAllEventTypes()
            
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
  const editEventType = (id) => {

    reset();      
    setIsAddMode(false);
    MasterService.editEventType(id).then(
      (response) => {            
          //console.log(response.data.result)    
          const fields = ['eventtype', 'status', 'id'];
          fields.forEach(field => {
            //console.log(response.data.result[field])
            setValue(field, response.data.result[field])                          
          });            
      },
      (error) => {         
        //console.log(error)        
      }
  );
  }

  // Insert Record
  const updateEventType = (data) => {

    MasterService.updateEventType(data).then(
      (response) => {        
          if(response.status === 200) {
              reset()
              displaySuccess(response.data.message)
              closeModalRefAddEventType.current.click();
              getAllEventTypes()
              
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
    getAllEventTypes();
  },[]);  

    const columns = [    
      
      {
        title: 'Event Type',
        dataIndex: 'eventtype',        
        sorter: (a, b) => a.eventtype.length - b.eventtype.length,
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
                <a className="dropdown-item" href="#" onClick={() =>editEventType(record.id)} data-bs-toggle="modal" data-bs-target="#add_event"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" onClick={() =>setEditId(record.id)} data-bs-toggle="modal" data-bs-target="#delete_event"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
      },
    ]
    

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
                <h3 className="page-title">Event Type </h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/event-type">Event Type</Link></li>
                  <li className="breadcrumb-item active">List</li>
                </ul>
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" onClick={()=>createEventTypeFrm()} className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_event"><i className="fa fa-plus" /> Add Event Type</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3">  
              <div className="form-group form-focus">
                <input type="text" className="form-control floating" />
                <label className="focus-label">Event Type</label>
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
        {/* Add Event Modal */}
        <div id="add_event" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isAddMode ===true ? 'Add' : 'Edit'} Event Type</h5>
                <button type="button" className="close" ref={closeModalRefAddEventType} data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="row">
                    <input type="hidden" {...register("id")}/>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Event Type <span className="text-danger">*</span></label>
                        <input className={errors.eventtype? 'form-control is-invalid': 'form-control'} type="text" name="eventtype" {...register("eventtype")}/>
                        {errors.eventtype	 && <div className="invalid-feedback">
                          {errors.eventtype?.message}
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
        {/* /Add Event Modal */}
        {/* Delete Event Modal */}
        <div className="modal custom-modal fade" id="delete_event" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Event</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a onClick={()=>handleDeleteEventType()} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a data-bs-dismiss="modal" ref={closeModalRefDelEventType} className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Event Modal */}

      </div>
        
    </>
  )
}

export default EventType