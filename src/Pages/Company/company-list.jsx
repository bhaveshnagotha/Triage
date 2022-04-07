/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
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


import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Editor } from 'primereact/editor';

import MasterService from "../../Services/master.service";
import { Toast } from 'primereact/toast';

let schema = yup.object().shape({
  company_name: yup.string().required("Please enter company name").max(40),
  company_address: yup.string().required("Please enter company address"),
  country: yup.string().required("Please enter country").max(35),
  state: yup.string().required("Please enter state").max(35),
  city: yup.string().required("Please enter city").max(35),
  //phoneno: yup.string().required("Please enter phone no"),
  //mobileno: yup.string().required("Please enter mobile no"),
  website: yup.string().url(),  
  contact_email_client: yup.string().email("Please enter valid contact email address"),
  contact_email_company: yup.string().email("Please enter valid contact email address"),  
});

const CompanyList = () => {
  
  const [data, setData] = useState([]);  
  const [addSocialListList, setInputList] = useState([{ socialMediaLink: ""}]);
  const [isAddMode, setIsAddMode] = useState(true);
  const [editid, setEditId] = useState(null);

  const closeModalRefDelCompany= useRef(null);
  const closeModalRefAddCompany= useRef(null);
  const toastMsg = useRef(null);

  const displaySuccess = (msg) => {
      toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
  }
  const displayError = (msg) => {
      toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
  }



  // Get All Record
  const getAllCompanies = (data)=>{
    MasterService.getCompanies(data).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result.rows)
        setData(res.data.result)
      }
    }
  ).catch(error => {
    displayError(error)
  });
}


 // Insert Record
 const createCompany = (data) => {

  MasterService.createCompany(data).then(
      (response) => {
          if(response.status === 200) {
              reset()
              displaySuccess(response.data.message)
              closeModalRefAddCompany.current.click();
              getAllCompanies()
              
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
const editCompany = (id) => {
  reset();      
  setIsAddMode(false);
  MasterService.editCompany(id).then(
    (response) => {      
        const fields = [
          'company_name',
          'company_address',
          'country',
          'state',
          'city',
          'phoneno',
          'mobileno',
          'fax',
          'website',
          'social_media_links',
          'company_role',
          'status',
          'contact_name_client',
          'contact_email_client',
          'contact_phoneno_client',
          'contact_role_client',
          'contact_name_company',
          'contact_email_company',
          'contact_phoneno_company',
          'contact_role_company',
          'notes',
           'id'
          ];
        fields.forEach(field => {          
          setValue(field, response.data.result[field])                          
        });            
    },
    (error) => {         
      //console.log(error)        
    }
);
}

// Update Record
const updateCompany = (data) => {

  MasterService.updateCompany(data).then(
    (response) => {        
        if(response.status === 200) {
            reset()
            displaySuccess(response.data.message)
            closeModalRefAddCompany.current.click();
            getAllCompanies()
            
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

// Delete record
const handleDeleteCompany = () => {    
    
  MasterService.deleteCompany(editid).then((res)=>{
    if(res.status === 200){          
      getAllCompanies()
      displaySuccess(res.data.message)
      closeModalRefDelCompany.current.click();
    }
  }
  ).catch(error => {
    displayError(error)
    closeModalRefDelCompany.current.click();
  });
}


const onSubmitForm = (data) => {        

  //data["createdby"] = "Bhavesh";    
  //data["updatedby"] = "Bhavesh";    
  if(isAddMode){
    data["id"] = ""      
    createCompany(data)
  }else{      
    updateCompany(data)
  }
} 

const  createCompanyFrm = () => {
  setIsAddMode(true);
  reset();
}

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


  const { register, handleSubmit,reset,setValue, formState: { errors }} = useForm(
    {
      resolver:yupResolver(schema),
    }
  );  
  
  useEffect( ()=>{
    if($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
    getAllCompanies();
  },[]);  

    const columns = [
      
      {
        title: 'Company Name',
        dataIndex: 'company_name',        
        sorter: (a, b) => a.company_name.length - b.company_name.length,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        sorter: (a, b) => a.country.length - b.country.length,
      },
      {
        title: 'State',
        dataIndex: 'state',
        sorter: (a, b) => a.state.length - b.state.length,
      },
      {
        title: 'City',
        dataIndex: 'city', 
        sorter: (a, b) => a.city.length - b.city.length,
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
            <div className="dropdown dropdown-action text-end">
              <a href="#" className="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#" onClick={() =>editCompany(record.id)} data-bs-toggle="modal" data-bs-target="#add_company"><i className="fa fa-pencil m-r-5" /> Edit</a>
                <a className="dropdown-item" href="#" onClick={() =>setEditId(record.id)} data-bs-toggle="modal" data-bs-target="#delete_company"><i className="fa fa-trash-o m-r-5" /> Delete</a>
              </div>
            </div>
          ),
      },
    ]   

     // Search start
  const { register:searchRegister, handleSubmit:searchHandleSubmit,reset:searchReset,setValue:searchSetValue, formState: { errors:searchErrors }} = useForm();

  const onSearchBtn = (data)=>{
    console.log(data)
    getAllCompanies(data)
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
                <h3 className="page-title">Company List </h3>                
              </div>
              <div className="col-auto float-end ml-auto">
                <a href="#" onClick={()=>createCompanyFrm()} className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_company"><i className="fa fa-plus" /> Add Company</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <form onSubmit={searchHandleSubmit(onSearchBtn)}>
          <div className="row filter-row">
            <div className="col-sm-4 col-md-2">  
              <div className="form-group">
                <input type="text" className="form-control" {...searchRegister('by_company_name')} placeholder="Company Name"/>                
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
              <div className="form-group">
                <input type="text" className="form-control" {...searchRegister('by_country_name')} placeholder="Country Name"/>                
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
              <div className="form-group">
                <input type="text" className="form-control" {...searchRegister('by_state_name')} placeholder="State Name"/>                
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
              <div className="form-group">
                <input type="text" className="form-control" {...searchRegister('by_city_name')} placeholder="City Name"/>                
              </div>
            </div>
            <div className="col-sm-4 col-md-2"> 
              <div className="form-group">
                <select className="form-select" {...searchRegister('by_status')}> 
                  <option value="">Select Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>                  
                </select>                
              </div>
            </div>
            <div className="col-sm-6 col-md-2">  
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
        {/* Add Company Modal */}
        <div id="add_company" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isAddMode ===true ? 'Add' : 'Edit'} Company</h5>
                <button type="button" className="close" ref={closeModalRefAddCompany} data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">              
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company Name <span className="text-danger">*</span></label>
                        <input type="text" className={errors.company_name ? 'form-control is-invalid': 'form-control'} {...register("company_name")} maxLength="40"/>
                        {errors.company_name && <div className="invalid-feedback">
                          {errors.company_name?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company Address <span className="text-danger">*</span></label>
                        <input className={errors.company_address ? 'form-control is-invalid': 'form-control'} type="text" {...register("company_address")} />
                        {errors.company_address && <div className="invalid-feedback">
                          {errors.company_address?.message}
                        </div>}
                      </div>
                    </div> 
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Country <span className="text-danger">*</span></label>
                        <input className={errors.country ? 'form-control is-invalid': 'form-control'} type="text" {...register("country")} maxLength="35"/>
                        {errors.country && <div className="invalid-feedback">
                          {errors.country?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>State <span className="text-danger">*</span></label>
                        <input className={errors.state ? 'form-control is-invalid': 'form-control'} type="text" {...register("state")} maxLength="35"/>
                        {errors.state && <div className="invalid-feedback">
                          {errors.state?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>City <span className="text-danger">*</span></label>                        
                        <input className={errors.city ? 'form-control is-invalid': 'form-control'} type="text" {...register("city")} maxLength="35"/>
                        {errors.city && <div className="invalid-feedback">
                          {errors.city?.message}
                        </div>}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone No</label>                        
                        <input type="text" className={errors.phoneno ? 'form-control is-invalid': 'form-control'} {...register("phoneno")}/>
                        {errors.phoneno && <div className="invalid-feedback">
                          {errors.phoneno?.message}
                        </div>}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Mobile No</label>                                                                        
                        <input type="text" className={errors.mobileno ? 'form-control is-invalid': 'form-control'} {...register("mobileno")} />
                        {errors.mobileno && <div className="invalid-feedback">
                          {errors.mobileno?.message}
                        </div>}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Fax </label>                        
                        <input className="form-control" type="text" {...register("fax")}/>                        
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Website</label>                        
                        <input className={errors.website ? 'form-control is-invalid': 'form-control'} type="text" {...register("website")}/>
                        {errors.website && <div className="invalid-feedback">
                          {errors.website?.message}
                        </div>}
                      </div>
                    </div>                    

                    
                    {addSocialListList.map((x, i) => { 
                      return ( <>
                        <div className="col-sm-8" key={i}>
                          <div className="form-group">
                            <label>Social media links {i +1}</label>                        
                            <input className={errors.email ? 'form-control is-invalid': 'form-control'} type="email" {...register("email")} maxLength="25"
                            value={x.socialMediaLink}
                            onChange={e => handleInputAPChange(e, i)}/>
                            {errors.email && <div className="invalid-feedback">
                              {errors.email?.message}
                            </div>}
                          </div>   
                        </div>
                        {addSocialListList.length !== 1 && <div className="col-sm-4 mt-4" key={i}>
                        <a href="#sociallinkdelete" onClick={() => handleRemoveSLClick(i)} className="remove_ex_exp_approver btn rounded border text-danger" data-id={3}><i className="fa fa-times" aria-hidden="true" /></a>
                        </div>}
                    </>
                    );
                  })}       
                        

                  <div className="form-group">                    
                    <div className="col-lg-4">
                      <a id="add_expense_approvers" onClick={() => handleAddSLClick()} href="#addsociallink" className="add-more">+ Add More</a>
                    </div>
                  </div>
                                                            
                  
                                     

                                     

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company Role</label><br/>                        
                        <div className="form-check form-check-inline">
                          <input defaultChecked type="radio" className="form-check-input" id="mycompany" {...register("company_role")} value="mycompany"/>
                          <label className="form-check-label" htmlFor="mycompany">
                            My Company
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input type="radio" className="form-check-input" id="client" {...register("company_role")} value="client"/>
                          <label className="form-check-label" htmlFor="client">
                            Client
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input type="radio" className="form-check-input" id="others" {...register("company_role")} value="others"/>
                          <label className="form-check-label" htmlFor="others">
                            Others
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
                        <div className="status-toggle">
                          <input type="checkbox" id="status" className="check" defaultChecked {...register("status")}/>
                          <label htmlFor="status" className="checktoggle">checkbox</label>
                        </div>

                      </div>
                    </div>

                    
                    
                  </div>                   
                  <div className="row">
                    
                    <div className="col-md-12 mt-4">
                      <div className="form-group">
                        <h4>Contact Person(Of Client)</h4>                        
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" {...register("contact_name_client")}/>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Email</label>
                        <input className={errors.contact_email_client ? 'form-control is-invalid': 'form-control'} type="text" {...register("contact_email_client")}/>
                        {errors.contact_email_client && <div className="invalid-feedback">
                          {errors.contact_email_client?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Phone No</label>
                        <input type="text" className="form-control" {...register("contact_phoneno_client")}/>
                        {errors.contact_phoneno_client && <div className="invalid-feedback">
                          {errors.contact_phoneno_client?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Role</label>
                        <input className="form-control" type="text" {...register("contact_role_client")}/>
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    
                    <div className="col-md-12 mt-4">
                      <div className="form-group">
                        <h4>Contact Person(Our Company)</h4>                        
                      </div>
                    </div>

                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Name</label>
                        <input className="form-control" type="text" {...register("contact_name_company")}/>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Email</label>
                        <input className={errors.contact_email_company ? 'form-control is-invalid': 'form-control'} type="text" {...register("contact_email_company")}/>
                        {errors.contact_email_company && <div className="invalid-feedback">
                          {errors.contact_email_company?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Phone No</label>
                        <input type="text" className="form-control" {...register("contact_phoneno_company")}/>
                        {errors.contact_phoneno_company && <div className="invalid-feedback">
                          {errors.contact_phoneno_company?.message}
                        </div>}
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group">
                        <label>Role</label>
                        <input className="form-control" type="text" {...register("contact_role_company")}/>
                      </div>
                    </div>
                   

                  </div>

                  <div className="row">

                    <div className="col-sm-12">
                      <div className="form-group">
                        <label>Notes</label>                        
                        <textarea className="form-control" {...register("notes")}></textarea>
                        {/* <Editor style={{ height: '150px' }} value={text1} onTextChange={(e) => setText1(e.htmlValue)} /> */}
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
        {/* /Add Company Modal */}
        {/* Delete Company Modal */}
        <div className="modal custom-modal fade" id="delete_company" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Company</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a onClick={()=>handleDeleteCompany()} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a data-bs-dismiss="modal" ref={closeModalRefDelCompany} className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Company Modal */}

      </div>
        
    </>
  )
}

export default CompanyList