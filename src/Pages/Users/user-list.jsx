import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"


const UserList = () => {
  
  const [data, setData] = useState([
    {id:1,name:"Bernardo Galaviz",image:placeholders,email:"bernardogalaviz@example.com",company:"Global Technologies",created_date:"5 Jan 2019",role:"Client"},
    {id:2,name:"Catherine Manseau",image:placeholders,email:"catherinemanseau@example.com",company:"Dreamguy's Technologies",created_date:"5 Jan 2019",role:"Admin"},
    {id:3,name:"Jeffery Lalor",image:placeholders,email:"jefferrylalorr@example.com",company:"Dreamguy's Technologies",created_date:"5 Jan 2019",role:"Employee"},
    {id:4,name:"Jeffrey Warden",image:placeholders,email:"jeffreywarden@example.com",company:"Global Technologies",created_date:"5 Jan 2019",role:"Client"},
    {id:5,name:"John Due",image:placeholders,email:"johndue@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:6,name:"John Smith",image:placeholders,email:"johnsmith@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:7,name:"Lesley Grauer",image:placeholders,email:"lesleygrauer@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:8,name:"Loren Gatlin",image:placeholders,email:"lorengatlin@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:9,name:"Mike Litorus",image:placeholders,email:"mikelitorus@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:10,name:"Richard Miles",image:placeholders,email:"richardmiles@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:11,name:"Tarah Shropshire",image:placeholders,email:"tarahshropshire@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
    {id:12,name:"Wilmer Deluna",image:placeholders,email:"wilmerdeluna@example.com",company:"Dreamguy's Technologies",created_date:"14 Jan 2019",role:"Employee"},
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
              <Link to="/app/profile/employee-profile" className="avatar"><img alt="" src={record.image} /></Link>
              <Link to="/app/profile/employee-profile">{text} <span>{record.role}</span></Link>
            </h2>
          ), 
          sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
      },

      {
        title: 'Company',
        dataIndex: 'company', 
        sorter: (a, b) => a.company.length - b.company.length,
      },
    
      {
        title: 'Created Date',
        dataIndex: 'created_date',
        sorter: (a, b) => a.created_date.length - b.created_date.length,
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
                      <h3 className="page-title">Users </h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                        <li className="breadcrumb-item active">Users</li>
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
                  <div className="col-sm-6 col-md-3">  
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" />
                      <label className="focus-label">Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3"> 
                    <div className="form-group form-focus select-focus">
                      <select className="select floating"> 
                        <option>Select Company</option>
                        <option>Global Technologies</option>
                        <option>Delta Infotech</option>
                      </select>
                      <label className="focus-label">Company</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3"> 
                    <div className="form-group form-focus select-focus">
                      <select className="select floating"> 
                        <option>Select Roll</option>
                        <option>Web Developer</option>
                        <option>Web Designer</option>
                        <option>Android Developer</option>
                        <option>Ios Developer</option>
                      </select>
                      <label className="focus-label">Role</label>
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


      </div>
        
    </>
  )
}

export default UserList