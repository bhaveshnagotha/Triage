/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = "https://localhost:3006/api/v1/";

//Common Start
const create = (data,action) =>{
  return axios.post(API_URL + action, data );
}
const edit = (id,action) =>{
  return axios.get(API_URL + action+"/"+id);
}
const update = (data,action) =>{
  return axios.post(API_URL + action+"/", data );
}
const deletes = (id,action) =>{
  return axios.get(API_URL + action+"/"+id);
}

//Common End


// Event Types Start
const getEventTypeList = () => {  
  return axios.get(API_URL + "geteventtypes");
};
const getActiveEventType = () => {  
  return axios.get(API_URL + "getactiveeventtype");
};
const createEventType = (data) => {  
  var action = 'create';  
  return create(data,action)
};
const editEventType = (id) => {
  var action = 'edit';    
  return edit(id,action)  
};
const updateEventType = (data) => {
  var action = 'update';  
  return update(data,action)  
};
const deleteEventType = (id) => {  
  var action = 'delete';
  return deletes(id,action)
};
// Event Types End


// User Types Start
const getUserTypeList = () => {  
  return axios.get(API_URL + "getusertypes");
};
const createUserType = (data) => {  
  var action = 'createusertype';  
  return create(data,action)
};
const editUserType = (id) => {
  var action = 'editusertype';  
  return edit(id,action)  
};
const updateUserType = (data) => {  
  var action = 'updateusertype';
  return update(data,action)  
};
const deleteUserType = (id) => {  
  var action = 'deleteusertype';
  return deletes(id,action)
};
// User Types End


// Company Start
const getCompanies = () => {  
  return axios.get(API_URL + "getcompanylist");
};

const getActiveCompanies = () => {  
  return axios.get(API_URL + "getactivecompany");
};


const createCompany = (data) => {  
  var action = 'createcompany';  
  return create(data,action)
};
const editCompany = (id) => {
  var action = 'editcompany';  
  return edit(id,action)  
};
const updateCompany = (data) => {  
  var action = 'updatecompany';
  return update(data,action)  
};
const deleteCompany = (id) => {  
  var action = 'deletecompany';
  return deletes(id,action)
};
// Company End


// User Role Start
const getUserRoleList = () => {  
  return axios.get(API_URL + "getuserrolelist");
};
const getActiveUserRole = () => {  
  return axios.get(API_URL + "getactiveuserrole");
};
const createUserRole = (data) => {  
  var action = 'createuserrole';  
  return create(data,action)
};
const editUserRole = (id) => {
  var action = 'edituserrole';  
  return edit(id,action)  
};
const updateUserRole = (data) => {  
  var action = 'updateuserrole';
  return update(data,action)  
};
const deleteUserRole = (id) => {  
  var action = 'deleteuserrole';
  return deletes(id,action)
};
// User Role End

export default { 
  // Event Types
  createEventType, getEventTypeList,getActiveEventType,deleteEventType,editEventType,updateEventType,

  // User Types
  createUserType, getUserTypeList,deleteUserType,editUserType,updateUserType,

  // Conpany
  getCompanies,createCompany,editCompany,updateCompany,deleteCompany,getActiveCompanies,

  // User Role
  getUserRoleList,createUserRole,editUserRole,updateUserRole,deleteUserRole,getActiveUserRole
};