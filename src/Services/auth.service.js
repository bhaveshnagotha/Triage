/* eslint-disable import/first */
/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = "https://localhost:3001/api/v1/";
import authHeader from "./auth-header";

const getList = () => {  
  return axios.get(API_URL + "users");
};

const register = (data) => {  
  return axios.post(API_URL + "register", data );
};

const updateUser = (data) => {  
  return axios.post(API_URL + "update", data );
};



const login = (data) => {  
  return axios.post(API_URL + "login", data );
};

const editUser = (id) => {  
  return axios.get(API_URL + "edit/"+id, { headers: authHeader() });
};

const deleteUser = (id) => {  
  return axios.get(API_URL + "deleteuser/"+id);
};
const logout = () => {
  localStorage.removeItem("currentUser");  
  localStorage.clear();
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

const getUserFullname = () => {
  return JSON.parse(localStorage.getItem("currentUser")).firstname+' '+JSON.parse(localStorage.getItem("currentUser")).lastname ;
};
export default { register,updateUser,login,logout, getList,getCurrentUser,deleteUser,editUser,getUserFullname};