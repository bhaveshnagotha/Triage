/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';


import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"


const RSVPList = () => {  

  const [datafordraft] = useState([
    {key: '1',name:"Event A",created_on:'03-03-2022',created_by:"Bhavesh N"},
    {key: '2',name:"Event B",created_on:'03-03-2022',created_by:"Bhavesh N"},
    {key: '3',name:"Event C",created_on:'03-03-2022',created_by:"Bhavesh N"},    
  ]);
  
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
        dataIndex: 'name',        
      },
      {
        title: 'Created On',
        dataIndex: 'created_on',        
      },

      {
        title: 'Created By',
        dataIndex: 'created_by',        
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
          <div className="dropdown dropdown-action text-end">
            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/rsvp-form"><i className="fa fa-pencil m-r-5" /> Edit</Link>
              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_rsvp_list"><i className="fa fa-trash-o m-r-5" /> Delete</a>
            </div>
          </div>
        ),
      }
    ]
    

  
  
  const [dataforCompleted] = useState([
    {key: '1',name:"Event A",created_on:'03-03-2022',created_by:"Bhavesh N",status:"Not Published"},
    {key: '2',name:"Event B",created_on:'03-03-2022',created_by:"Bhavesh N",status:"Not Published"},
    {key: '3',name:"Event C",created_on:'03-03-2022',created_by:"Bhavesh N",status:"Not Published"},
    {key: '4',name:"Event D",created_on:'03-03-2022',created_by:"Bhavesh N",status:"Not Published"},    
  ]);
  
    const columns_for_rsvp_completed = [        
     
      {
        title: 'Event Title',
        dataIndex: 'name',        
      },
      {
        title: 'Created On',
        dataIndex: 'created_on',        
      },

      {
        title: 'Created By',
        dataIndex: 'created_by',        
      },
      {
        title: 'Status',
        dataIndex: 'status',        
        render: (text, record) => (
          <span class="badge bg-inverse-danger">{text}</span>
        ),
      },
      
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
          <div className="dropdown dropdown-action text-end">
            <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to="/rsvp-form"><i className="fa fa-pencil m-r-5" /> Edit</Link>
              <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_rsvp_list"><i className="fa fa-trash-o m-r-5" /> Delete</a>
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
                    <li className="nav-item"><a className="text-capitalize nav-link active" href="#bottom-tab1" data-bs-toggle="tab">Draft</a></li>
                    <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-bs-toggle="tab">Completed</a></li>                    
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane show active" id="bottom-tab1">

                    <div className="row">
                      <div className="col-md-12">
                        <div className="table-responsive">
                        <Table className="table-striped"
                              pagination= { {total : datafordraft.length,
                                showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                              style = {{overflowX : 'auto'}}
                              columns={columns_for_rsvp_draft}                              
                              // bordered
                              dataSource={datafordraft}
                              rowKey={record => record.key}
                              //onChange={console.log("change")}
                            />
                        </div>
                      </div>
                    </div> 


                    </div>
                    <div className="tab-pane" id="bottom-tab2">

                      {/* Page Header */}
                      <div className="page-header">
                        <div className="row align-items-center">
                          <div className="col"></div>
                          <div className="col-auto float-end ml-auto">
                            <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#create_group"> Publish</a>
                          </div>
                        </div>
                      </div>
                      {/* /Page Header */}

                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            
                            <Table className="table-striped"
                                  pagination= { {total : dataforCompleted.length,
                                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                                  style = {{overflowX : 'auto'}}
                                  columns={columns_for_rsvp_completed}
                                  rowSelection={{                                    
                                    ...rowSelectionRsvpCompleted,
                                  }}                 
                                  // bordered
                                  dataSource={dataforCompleted}
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
                <h3>Delete this form</h3>
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
      {/* /Delete rsvp list Modal */}        
        
      </div>
        
    </div>
  )
}

export default RSVPList