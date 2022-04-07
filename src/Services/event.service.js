/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = "https://localhost:3007/api/v1/";

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


// Events Start
const getEvents = (emode) => {  
  return axios.get(API_URL + "getevents/"+emode);
};

const getEventDetail = (id) => {  
  return axios.get(API_URL + "geteventdetail/"+id);
};

const getChildEventsById = (peid)=>{
  return axios.get(API_URL + "getchildeventsbyid/"+peid);
}

const getEventParticipatesById = (peid)=>{
  return axios.get(API_URL + "geteventparticipatesbyid/"+peid);
}



const createEvent = (data) => {  
  var action = 'create';  
  return create(data,action)
};
const editEvent = (id) => {
  var action = 'edit';    
  return edit(id,action)  
};

const editAdditionalParticipates = (id) => {
  var action = 'editadditionalparticipates';    
  return edit(id,action)  
};

const editChildEvent = (id) => {
  var action = 'editchildevent';    
  return edit(id,action)  
};



const updateEvent = (data) => {
  var action = 'update';  
  return update(data,action)  
};

const updateChildEvent = (data) => {
  var action = 'updatechildevent';  
  return update(data,action)  
};

const updateAdditonalParticipants = (data) => {
  var action = 'updateadditionalparticipants';  
  return update(data,action)  
};




const deleteEventP = (id) => {  
  var action = 'deleteeventp';
  return deletes(id,action)
};
const deleteEventC = (id) => {  
  var action = 'deleteeventc';
  return deletes(id,action)
};
const deleteEventParticipates = (id) => {  
  var action = 'deleteeventparticipates';
  return deletes(id,action)
};
// Events End



export default { 
  // Events
  createEvent, getEvents,getChildEventsById,getEventDetail,getEventParticipatesById,deleteEventP,deleteEventC,deleteEventParticipates,
  editEvent,editAdditionalParticipates,editChildEvent,updateEvent,updateChildEvent,updateAdditonalParticipants

};