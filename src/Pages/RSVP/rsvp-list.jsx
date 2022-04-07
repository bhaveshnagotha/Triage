/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';

import moment from 'moment';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"

import RsvpService from "../../Services/rsvp.service";
import { Toast } from 'primereact/toast';
const RSVPList = () => { 
  

  const [actionData, setActionData] = useState([{status:null, editid:0}]);
  const [rsvpDraftListData, setRsvpDraftListData] = useState([]);
  const [rsvpCompletedtListData, setRrsvpCompletedtListData] = useState([]);
  const closeModalRefDelRsvp= useRef(null);
  const toastMsg = useRef(null);
  const displaySuccess = (msg) => {
    toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
  }
  const displayError = (msg) => {
      toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
  }

  // Get All Record
 const getRsvpLst = (status)=>{   
  
  RsvpService.getRsvpList(status).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result.rows)
        if(status === 'Pending'){
          setRsvpDraftListData(res.data.result.rows)
        }
        if(status === 'Published'){
          setRrsvpCompletedtListData(res.data.result.rows)
        }
        
      }
    }
  ).catch(error => {
    console.log(error)
  });
}

// Delete Rsvp record
const handleDeleteRsvp = () => {      

  if(actionData.editid && actionData.editid > 0){
    RsvpService.deleteRsvp(actionData.editid).then((res)=>{
      if(res.status === 200 && res.data.success === 1) {          
        getRsvpLst(actionData.status)
        displaySuccess(res.data.message)
        closeModalRefDelRsvp.current.click();
      }
    }
    ).catch(error => {
      displayError(error)
      closeModalRefDelRsvp.current.click();
    });
  }
  
}

const handleChangeListByStatus = (status)=>{
  getRsvpLst(status)
}

useEffect( ()=>{    

  const status = "Pending";
  getRsvpLst(status)
},[]);
 
  
  const columns_for_rsvp_draft = [        
    
    {
      title: '',
      dataIndex: '',  
      render: (text, record) => (
        <strong style={{color:'#B44C27'}}>Draft</strong>
      ),      
    },
    {
      title: 'Event Title',
      dataIndex: 'p_event_title',        
    },
    {
      title: 'Created On',
      dataIndex: 'createddate',   
      render: (createddate) => { 
        return (<p>                  
          {moment(createddate).format('DD-MM-YYYY')}
        </p>)
      },     
    },

    {
      title: 'Created By',
      dataIndex: 'createdby',        
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to={`/rsvp-form-edit/${record.id}`}><i className="fa fa-pencil m-r-5" /> Edit</Link>
            <a className="dropdown-item" href="#" onClick={() =>setActionData({status:record.rsvp_status,editid:record.id})} data-bs-toggle="modal" data-bs-target="#delete_rsvp_list"><i className="fa fa-trash-o m-r-5" /> Delete</a>
          </div>
        </div>
      ),
    }
  ]
   
  const columns_for_rsvp_completed = [        
    
    {
      title: 'Event Title',
      dataIndex: 'p_event_title',        
    },
    {
      title: 'Created On',
      dataIndex: 'createddate',   
      render: (createddate) => { 
        return (<p>                  
          {moment(createddate).format('DD-MM-YYYY')}
        </p>)
      },        
    },

    {
      title: 'Created By',
      dataIndex: 'createdby',        
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div className="dropdown dropdown-action text-end">
          <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to={`/rsvp-form-edit/${record.id}`}><i className="fa fa-pencil m-r-5" /> Edit</Link>
            <a className="dropdown-item" href="#" onClick={() =>setActionData({status:record.rsvp_status,editid:record.id})} data-bs-toggle="modal" data-bs-target="#delete_rsvp_list"><i className="fa fa-trash-o m-r-5" /> Delete</a>
          </div>
        </div>
      ),
    }
  ]


    const rowSelectionRsvpCompleted = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },    
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

  return (
    
    <div>

      <div className="page-wrapper">
      <Toast ref={toastMsg} />
        {/* Page Content */}
      <div className="content container-fluid">
        
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">RSVP Lists</h3>                
            </div>              
          </div>
        </div>
        {/* /Page Header */}

        {/* Tabs */}
        <section className="comp-section-top" id="comp_tabs">          
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">                  
                  <ul className="nav nav-tabs nav-tabs-bottom">
                    <li className="nav-item"><a className="text-capitalize nav-link active" onClick={()=>handleChangeListByStatus("Pending")} href="#bottom-tab1" data-bs-toggle="tab">Draft</a></li>
                    <li className="nav-item"><a className="nav-link" onClick={()=>handleChangeListByStatus("Published")} href="#bottom-tab2" data-bs-toggle="tab">Published</a></li>                    
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane show active" id="bottom-tab1">

                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                        <Table className="table-striped"
                              pagination= { {total : rsvpDraftListData.length,
                                showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                              style = {{overflowX : 'auto'}}
                              columns={columns_for_rsvp_draft}                              
                              // bordered
                              dataSource={rsvpDraftListData}
                              rowKey={record => record.key}
                              //onChange={console.log("change")}
                            />
                        </div>
                      </div>
                    </div> 


                    </div>
                    <div className="tab-pane" id="bottom-tab2">

                      {/* Page Header */}
                      {/* <div className="page-header">
                        <div className="row align-items-center">
                          <div className="col"></div>
                          <div className="col-auto float-end ml-auto">
                            <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#create_group"> Publish</a>
                          </div>
                        </div>
                      </div> */}
                      {/* /Page Header */}

                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            
                            <Table className="table-striped"
                                  pagination= { {total : rsvpCompletedtListData.length,
                                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                                  style = {{overflowX : 'auto'}}
                                  columns={columns_for_rsvp_completed}
                                  // rowSelection={{                                    
                                  //   ...rowSelectionRsvpCompleted,
                                  // }}                 
                                  // bordered
                                  dataSource={rsvpCompletedtListData}
                                  rowKey={record => record.key}
                                  //onChange={console.log("change")}
                                />
                          </div>
                        </div>
                      </div> 

                    </div>
             
                    
                  </div>
                </div>
              </div>
            </div>            
          </div>          
        </section>
        {/* /Tabs */}
        
      </div>
      {/* /Page Content */}  

      {/* Delete rsvp list Modal */}
      <div className="modal custom-modal fade" id="delete_rsvp_list" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete this record</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a onClick={()=>handleDeleteRsvp()} className="btn btn-primary continue-btn">Delete</a>
                  </div>
                  <div className="col-6">
                    <a ref={closeModalRefDelRsvp} data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Delete rsvp list Modal */}        
        
      </div>
        
    </div>
  )
}

export default RSVPList