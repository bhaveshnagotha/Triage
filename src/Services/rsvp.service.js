/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const API_URL = "https://localhost:3008/api/v1/";

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


// RSVP Start

const createRsvpSettings =(data)=>{
  var action = 'createsettings';  
  return create(data,action)
}
const updateRsvpSettings =(data)=>{
  var action = 'updatesettings';  
  return update(data,action)
}

const getRsvpSettingsById = (id)=>{
  return axios.get(API_URL + "getrsvpsettingsbyid/"+id);
}

const getFormDesignDetailId = (id)=>{
  return axios.get(API_URL + "getrsvpformdesigndetail/"+id);
}

const createRsvpCustomForm =(data)=>{
  var action = 'createcustomform';  
  return create(data,action)
}

const getBasicFormDetails = (id) => {  
  return axios.get(API_URL + "getbasicformdetails/"+id);
};

const getCustomFormDetails = (id) => {  
  return axios.get(API_URL + "getcustomformdetails/"+id);
};



// Email Settings > Default Tab Start
const saveDEmailSettings =(data)=>{
  var action = 'savedemailsettings';  
  return create(data,action)
}

const updateDEmailSettings =(data)=>{
  var action = 'updatedemailsettings';  
  return update(data,action)
}

const getDEmailSettingsDetail = (id,type) => {  
  return axios.get(API_URL + "getdEmailSettingsDetail/"+id+"/"+type);
};

const getDEmailTemplatePreview = (id,type) => {  
  return axios.get(API_URL + "getdemailtemplatepreview/"+id);
};


// Email Settings > Default Tab End


// Email Settings > Reminder Tab Start
const saveReminderEmailSettings =(data)=>{
  var action = 'savereminderemailsettings';  
  return create(data,action)
}

const updateReminderEmailSettings =(data)=>{
  var action = 'updatereminderemailsettings';  
  return update(data,action)
}

const getReminderEmailSettingsDetail = (id,type) => {  
  return axios.get(API_URL + "getReminderEmailSettingsDetail/"+id+"/"+type);
};

const getREmailTemplatePreview = (id,type) => {  
  return axios.get(API_URL + "getremailtemplatepreview/"+id);
};
// Email Settings > Reminder Tab End


// Form Design Tab Start
const saveFormDesign =(data)=>{
  var action = 'saveformdesign';  
  return create(data,action)
}

const updateFormDesign =(data)=>{
  var action = 'updateformdesign';  
  return update(data,action)
}
const getFormDesignDetail = (id,type) => {  
  return axios.get(API_URL + "getformdesigndetail/"+id);
};

// Form Design Tab End


const updateCustomFormStatus =(data)=>{
  var action = 'updatecustomformstatus';  
  return update(data,action)
}


const deleteCustomFormField = (id) => {
  var action = 'deletecustomformfield';    
  return deletes(id,action)  
};

const deleteRsvp = (id) => {
  var action = 'deletersvp';    
  return deletes(id,action)  
};



const getRsvpList = (status) => {  
  return axios.get(API_URL + "getrsvplist/"+status);
};


const getEvents = (emode) => {  
  return axios.get(API_URL + "getevents/"+emode);
};

const getCustomFormList = (id)=>{
  return axios.get(API_URL + "getcustomformlist/"+id);
}

const getBasicFormList = (id)=>{
  return axios.get(API_URL + "getbasicformlist/"+id);
}



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




export default { 
  // RSVP
  createRsvpSettings,getRsvpSettingsById,getFormDesignDetailId,updateRsvpSettings,deleteRsvp,createRsvpCustomForm,
  updateCustomFormStatus,deleteCustomFormField, getEvents,getBasicFormList,getCustomFormList,
  getRsvpList,editEvent,editAdditionalParticipates,editChildEvent,getBasicFormDetails,getCustomFormDetails,

  //Default tab
  saveDEmailSettings,updateDEmailSettings,getDEmailSettingsDetail,getDEmailTemplatePreview,  

  // Reminder tab
  saveReminderEmailSettings,updateReminderEmailSettings,getReminderEmailSettingsDetail,getREmailTemplatePreview,

  // Form Design tab
  saveFormDesign,updateFormDesign,getFormDesignDetail
};