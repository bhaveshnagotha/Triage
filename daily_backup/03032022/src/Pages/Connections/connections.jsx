import React, {useState,useEffect } from 'react';
//import { Link } from 'react-router-dom';
import $ from 'jquery';
//import placeholders from './../../assets/img/placeholder.jpg';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../Components/Common/paginationfunction"
import "../../Components/Common/antdstyle.css"


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = [
//   "image/jpg",
//   "image/jpeg",
//   "image/gif",
//   "image/png"
// ];


let schema = yup.object().shape({
  firstname: yup.string().required("Please enter first name").max(25),
  lastname: yup.string().required("Please enter last name").max(25),
  email: yup.string().required("Please enter email address").email("Please enter valid email address"),
  phone_number: yup.string().required("Please enter phone number").min(10,"Phone number must be at least 10 characters").max(10).matches(phoneRegExp, 'Phone number is not valid'),
  website: yup.string().url(),
  // profileImg: yup
  //         .mixed()
  //         .required("A file is required")
          // .test(
          //   "fileSize",
          //   "File too large",
          //   value => value && value.size <= FILE_SIZE
          // )
          // .test(
          //   "fileFormat",
          //   "Unsupported Format",
          //   value => value && SUPPORTED_FORMATS.includes(value.type)
          // )
});

let schemaForCreateGroup = yup.object().shape({
  group_name: yup.string().required("Please enter group name").max(25),  
});


const Connections = () => {  
    


  const columns_sub = [
    { title: "Group Name", dataIndex: "group_name", key: "group_name" },
    { title: "Event Name", dataIndex: "event_name", key: "event_name" },    
    { title: "", dataIndex: "membercounts", key: "membercounts" },    
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_user"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
    }
  ];

  const columns_sub_1 = [
    { title: "Member Name", dataIndex: "member_name", key: "member_name" },
    
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
            <div className="dropdown dropdown-action text-end">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">                
                <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_user"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
    }
  ];
  
  const data_sub = [
    {
      key: 1,
      group_name: "John Brown",
      event_name: "Event A",      
      membercounts:"(3)"      
    },
    {
      key: 2,
      group_name: "Jim Green",
      event_name: "Event B",           
      membercounts:"(3)"       
    },
    {
      key: 3,
      group_name: "Joe Black",
      event_name: "Event C",
      membercounts:"(3)"      
    }
  ];
  

  const data_sub_1 = [
    {
      key: 1,
      member_name: "John Brown",         
    },
    {
      key: 2,
      member_name: "Jim Green",      
    },
    {
      key: 3,
      member_name: "Joe Black",      
    }
  ];  


  const expandedRow = row => {
    console.log(row);
    let inTable = data_sub_1;
    //let inTable = row.key == 1 ? data1 : row.key == 2 ? data2 : data_sub;
    return <Table columns={columns_sub_1} dataSource={inTable} pagination={false} />;
  };

   const { register, handleSubmit, formState: { errors }} = useForm(
    {
      resolver:yupResolver(schema),
    }
   );

   const { register: registerCGroup, handleSubmit: handleSubmitCGroup, formState: { errors:errorsCGroup }} = useForm(
    {
      resolver:yupResolver(schemaForCreateGroup),
    }
   );

   
   //const onError = (errors, e) => console.log(errors, e);
   
  //  useEffect(() => {
  //   if (formState.errors.firstname) {
  //     // do the your logic here
  //   }    
  // },[formState]);
  

  const onSubmitCreateGroup = (data) => {    
    console.log(data);
  } 
  console.log(errorsCGroup);
  
  
  const onSubmitClick = (datasss) => {    
    console.log(datasss);
  } 
  console.log(errors);

  const [selectionType, setSelectionType] = useState('checkbox');


  

  const [data] = useState([
    {key: '1',name:"Bhavesh Nagotha",email:'bhavesh@test.com',phone_no:"+91 9662948584"},
    {key: '2',name:"Ramya nair",email:'Ramya@test.com',phone_no:"+91 9662948584"},
    {key: '3',name:"Aanal Desai",email:'Aanal@test.com',phone_no:"+91 9662948584"},
    {key: '4',name:"Ayushi Parmar",email:'Ayushi@test.com',phone_no:"+91 9662948584"},
    {key: '5',name:"Chintan Katira",email:'Chintan@test.com',phone_no:"+91 9662948584"},
    {key: '6',name:"Mukesh Goyal",email:'Mukesh@test.com',phone_no:"+91 9662948584"},
    {key: '7',name:"Sachin Modh",email:'Sachin@test.com',phone_no:"+91 9662948584"},
  ]);
  
    const columns = [        
     
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
      },

      {
        title: 'Phone No',
        dataIndex: 'phone_no',
        sorter: (a, b) => a.phone_no.length - b.phone_no.length,
      },
      
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (text, record) => (
              <div className="dropdown dropdown-action text-end">
                <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#add_user"><i className="fa fa-pencil m-r-5" /> Edit</a>
                  <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_user"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                </div>
              </div>
            ),
      }
    ]


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },    
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

  const [addSocialListList, setInputList] = useState([{ socialMediaLink: ""}]);

  // handle input change
  const handleInputAPChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...addSocialListList];
    list[index][name] = value;      
    setInputList(list);
  };   

  // handle click event of the Add button
  const handleAddSLClick = () => {
    setInputList([...addSocialListList, { socialMediaLink: "" }]);
  };

  // handle click event of the Remove button
  const handleRemoveSLClick = index => {
    const list = [...addSocialListList];
    list.splice(index, 1);
    setInputList(list);
  };

  return (
    
    <div>

      <div className="page-wrapper">

        {/* Page Content */}
      <div className="content container-fluid">        
        
        {/* Tabs */}
        <section className="comp-section-top" id="comp_tabs">
          <h3 className="page-title">Connections</h3>                    
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">                  
                  <ul className="nav nav-tabs nav-tabs-bottom">
                    <li className="nav-item"><a className="text-capitalize nav-link active" href="#bottom-tab1" data-bs-toggle="tab">Single</a></li>
                    <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-bs-toggle="tab">Multiple</a></li>
                    <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-bs-toggle="tab">Directory</a></li>
                    <li className="nav-item"><a className="nav-link" href="#bottom-tab4" data-bs-toggle="tab">Group</a></li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane show active" id="bottom-tab1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmitClick)}>
                              <div className="row">
                                <div className="col-xl-6">
                                  <h4 className="card-title">Create Contact</h4>
                                  <div className="form-group row">
                                    <label className="col-lg-4 col-form-label">First Name <span className="text-danger">*</span></label>
                                    <div className="col-lg-8">
                                      <input type="text" className={errors.firstname ? 'form-control is-invalid': 'form-control'} name="firstname" {...register("firstname")} maxlength="25"/>                                      
                                      {errors.firstname && <div className="invalid-feedback">
                                        {errors.firstname?.message}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-lg-4 col-form-label">Last Name <span className="text-danger">*</span></label>
                                    <div className="col-lg-8">
                                      <input type="text" className={errors.lastname ? 'form-control is-invalid': 'form-control'} name="lastname" {...register("lastname")} maxlength="25"/>
                                      {errors.lastname && <div className="invalid-feedback">
                                        {errors.lastname?.message}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-lg-4 col-form-label">Email <span className="text-danger">*</span></label>
                                    <div className="col-lg-8">
                                      <input type="text" className={errors.email ? 'form-control is-invalid': 'form-control'} {...register("email")} maxlength="30"/>
                                      {errors.email && <div className="invalid-feedback">
                                        {errors.email?.message}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="form-group row">
                                    <label className="col-lg-4 col-form-label">Phone No <span className="text-danger">*</span></label>
                                    <div className="col-lg-8">
                                      <input type="text" className={errors.phone_number ? 'form-control is-invalid': 'form-control'} {...register("phone_number")} maxlength="10"/>
                                      {errors.phone_number && <div className="invalid-feedback">
                                        {errors.phone_number?.message}
                                      </div>}
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label className="col-lg-4 col-form-label">Website</label>
                                    <div className="col-lg-8">
                                      <input type="text" className={errors.website ? 'form-control is-invalid': 'form-control'} {...register("website")}/>
                                      {errors.website && <div className="invalid-feedback">
                                        {errors.website?.message}
                                      </div>}
                                    </div>
                                  </div>
                                  
                                  
                                </div>
                                <div className="col-xl-6">
                                  <h4 className="card-title">&nbsp;</h4>
                                  <div className="form-group files-upload-ui">
                                    <label className="col-lg-3 col-form-label">Profile Image</label>                                    
                                    <div className="col-lg-12">
                                      <input type="file" className="form-control"/>                                      
                                    </div>
                                  </div>
                                  
                                </div>
                              </div>    

                              
                              <div className="col-xl-12">
                              {addSocialListList.map((x, i) => { 
                                  return ( 
                                  <div key={i}>
                                  <div className="form-group row">
                                  {addSocialListList.length === 1 && <label className="col-lg-2 col-form-label">Add Social Media Link</label>}
                                  {addSocialListList.length !== 1 && <label className="col-lg-2 col-form-label">Add Social Media Link</label>}                                    
                                    <div className="col-lg-4">
                                      <input type="text" className="form-control" name="socialMediaLink"                            
                                      value={x.socialMediaLink}
                                      onChange={e => handleInputAPChange(e, i)}/>
                                    </div>
                                    {addSocialListList.length !== 1 && <div className="col-lg-6 mt-1" key={i}>
                                      <a href="#sociallinkdelete" onClick={() => handleRemoveSLClick(i)} className="remove_ex_exp_approver btn rounded border text-danger" data-id={3}><i className="fa fa-times" aria-hidden="true" /></a>
                                    </div>}
                                    
                                  </div>

                                  </div>
                                  );
                                })}
                                  <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">&nbsp;</label>
                                    <div className="col-lg-4">
                                      <a id="add_expense_approvers" onClick={() => handleAddSLClick()} href="#addsociallink" className="add-more">+ Add More</a>
                                    </div>
                                  </div>

                                  <div className="form-group row">
                                    <label className="col-lg-2 col-form-label">About</label>
                                    <div className="col-lg-10">
                                      <textarea rows={6} cols={5} className="form-control" style={{height:'100%'}}  defaultValue={""} />
                                    </div>
                                  </div>  

                                </div>                      
                              <div className="text-end">
                                <button type="submit" className="btn btn-primary">Submit</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="tab-pane" id="bottom-tab2">
                        <div className="row">
                            <div className="col-md-12">
                              <div className="card-body">
                                <h4 className="card-title">Create Multiple Contacts</h4>
                                <p>To Import multiple contacts, please upload a CSV file.</p>
                                <a href="#">Download a sample CSV format</a>
                                <div className="row mt-3">
                                  <div className="col-md-4">
                                    <input type="file" className="form-control"/>    
                                  </div>
                                  <div className="col-md-4">
                                    <button type="button" className="btn btn-primary"> Upload</button>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="bottom-tab3">                     
                      {/* Page Header */}
                      <div className="page-header">
                        <div className="row align-items-center">
                          <div className="col"></div>
                          <div className="col-auto float-end ml-auto">
                            <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#create_group"><i className="fa fa-plus" /> Create Group</a>
                          </div>
                        </div>
                      </div>
                      {/* /Page Header */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            
                            <Table className="table-striped"
                                  pagination= { {total : data.length,
                                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                                  style = {{overflowX : 'auto'}}
                                  columns={columns}
                                  rowSelection={{                                    
                                    ...rowSelection,
                                  }}                 
                                  // bordered
                                  dataSource={data}
                                  rowKey={record => record.key}
                                  //onChange={console.log("change")}
                                />
                          </div>
                        </div>
                      </div> 

                    </div>
                    <div className="tab-pane" id="bottom-tab4">
                      
                    <Table columns={columns_sub} expandedRowRender={expandedRow} dataSource={data_sub} pagination={false}/>

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
        
      </div>

      {/* Create Group Modal Start */}
      <div id="create_group" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Group</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitCGroup(onSubmitCreateGroup)}>
                <div className="form-group">
                  <label>Group Name <span className="text-danger">*</span></label>                  
                  <input type="text" className={errorsCGroup.group_name ? 'form-control is-invalid': 'form-control'} name="group_name" {...registerCGroup("group_name")} maxlength="25"/>                                      
                  {errorsCGroup.group_name && <div className="invalid-feedback">
                    {errorsCGroup.group_name?.message}
                  </div>}
                </div>                
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Create Group Modal End */}                            

        
    </div>
    
  )
}

export default Connections