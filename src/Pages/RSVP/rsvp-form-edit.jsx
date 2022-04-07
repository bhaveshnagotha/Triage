/* eslint-disable eqeqeq */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {useState,useEffect,useRef } from 'react';
import { Link,useParams,useLocation,useNavigate } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';
import EventService from "../../Services/event.service";
import AuthService from "../../Services/auth.service";
import RsvpService from "../../Services/rsvp.service";

import { useForm,useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import { Toast } from 'primereact/toast';

import ReactQuill from 'react-quill';


let schema = yup.object().shape({
  rsvp_event_mode: yup.string().required("Please select event mode"),
  rsvp_event_id: yup.string().required("Please select event title"),  
  rsvp_by_date: yup.string().required("Please select rsvp by date"),  
  rsvp_by_time: yup.string().required("Please select rsvp by time"),    
  rsvp_event_capacity: yup.string().required("Please enter event capacity"),      
  // event_capacity: yup.array().of(
  //   yup.object().shape({
  //     rsvp_event_capacity: yup.string()
  //           .required('Event capacity is required')                    
  //   })
  // ),
  //rsvp_individual: yup.bool().oneOf([true], 'Please select individual rsvp')  
  
});

let schemaForCustomForm = yup.object().shape({
  c_rsvp_field_name: yup.string().required("Please enter type of questions"),
  c_rsvp_field_type: yup.string().required("Please select form type"),      
  // rsvpfo: yup.array().of(
  //   yup.object().shape({
  //     c_rsvp_field_options: yup.string()
  //           .required('Please enter type options')                    
  //   })
  // ),
  
  
});


const RSVPEditForm = () => {  

  const navigate  = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [typeOptionVal, setTypeOptionVal] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [pEventCapacity, setPEventCapacity] = useState([]);
  //const [cEventCapacity, setCEventCapacity] = useState([]);
  const [isAddMode, setIsAddMode] = useState(true);  

  const [customformfieldid, setCustomformfieldid] = useState(null);


  const [basicFormList, setBasicFormList] = useState([]);
  const [customFormList, setCustomFormList] = useState([]); 
  const [formDesignPreview, setFormDesignPreview] = useState([]); 
  const [rsvpSettingsPreview, setRsvpSettingsPreview] = useState([]); 

  const [dEmailTemplatePreview, setDEmailTemplatePreview] = useState([]);
  const [rEmailTemplatePreview, setREmailTemplatePreview] = useState([]); 

  
  
  const [eventDetailByID, setEventDetailByID] = useState([]); 
  const [eventName, setEventName] = useState(null); 

  const [formDesingTitleName, setFormDesingTitleName] = useState(null);  
  
  const [visibleNextBtnStep1, setVisibleNextBtnStep1] = useState([]); 
  const [valueGenereatedLink, setValueGenereatedLink] = useState("");

  // Step 4 Start
  const [chooseParentEventParticipate, setChooseParentEventParticipate] = useState([]);
  const [chooseChildEventParticipate, setChooseChildEventParticipate] = useState([]);  
  // Step 4 End

  


  const {setValue, getValues, watch:settingFormWatch,register:settingsRegister,handleSubmit:handleSettingsSubmitForm,reset, formState: { errors }} = useForm(
  {
    resolver:yupResolver(schema),
  });
  
  const {control,setValue:customFormSetValue, watch:customFormWatch,register:customFormRegister,handleSubmit:handleCustomSubmitForm,reset:customFormReset,formState: { errors:errorsCustomForm }} = useForm(
    {
      resolver:yupResolver(schemaForCustomForm),
    });


  const closeModalRefDelCForm= useRef(null);
  const closeModalRefAddCForm= useRef(null);
  const toastMsg = useRef(null);

  const displaySuccess = (msg) => {
      toastMsg.current.show({severity: 'success', summary: 'Success', detail: msg});   
  }
  const displayError = (msg) => {
      toastMsg.current.show({severity: 'error', summary: 'Error', detail: msg});   
  }

    
  var editid = params.id;
    
  
  const currentSettingsId = editid
  //console.log(currentSettingsId);

  const onSubmitCustomForm = (data) => {       
    //var currentUserFullname = AuthService.getUserFullname();                      
    if(isAddMode){      
      if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !="" && currentSettingsId !=null){
        data["rsvp_settings_id"] = currentSettingsId;   
        data["rsvp_field_status"] = true;         
        createRsvpCustomForm(data)
      }
      
    }   
  }

  // Settings Tab > Create RSVP Settings 
  const onSubmitForm = (data) => {             
    var currentUserFullname = AuthService.getUserFullname();         
    if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !="" && currentSettingsId !=null){
      data["id"] = currentSettingsId;
      data["updatedby"] = currentUserFullname;
      updateRsvpSettings(data)
    }else{
                            
      data["createdby"] = currentUserFullname;
      data["rsvp_status"] = 'Pending';   
      createRsvpSettings(data)
    }    
  }     

  
  //console.log(editRsvpSettings)
  
  const createRsvpSettings = (data) => {  
    //console.log(data);

    if(data['rsvp_allow_individual_guests'] == "on" || data['rsvp_allow_individual_guests'] === true){
      data['rsvp_individual'] = true
      data['rsvp_group'] = false
      data['rsvp_group_set_guest_limit'] = ""
      data['rsvp_group_allow_invitee_to_name'] = ""
    }

    if(data['rsvp_allow_group_guests'] == "on" || data['rsvp_allow_group_guests'] === true){
      data['rsvp_group'] = true
      data['rsvp_individual'] = false      
      data['rsvp_individual_set_guest_limit'] = ""
      data['rsvp_individual_allow_invitee_to_name'] = ""
    }

    RsvpService.createRsvpSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {              
              displaySuccess(response.data.message)                            
              //sessionStorage.setItem('currentRsvpSettings',JSON.stringify(response.data.data.id));                            
          }else{
              displayError(response.data.message)
          }
          console.log(response.status)
        
      },
      (error) => {
        displayError(error.response.data.message)        
      }
    );

  }

  const updateRsvpSettings = (data) => {  
    

    if(data['rsvp_allow_individual_guests'] == "on" || data['rsvp_allow_individual_guests'] === true){
      data['rsvp_individual'] = true
      data['rsvp_group'] = false
      data['rsvp_group_set_guest_limit'] = ""
      data['rsvp_group_allow_invitee_to_name'] = ""
    }

    if(data['rsvp_allow_group_guests'] == "on" || data['rsvp_allow_group_guests'] === true){
      data['rsvp_group'] = true
      data['rsvp_individual'] = false      
      data['rsvp_individual_set_guest_limit'] = ""
      data['rsvp_individual_allow_invitee_to_name'] = ""
    }
//console.log(data);
    RsvpService.updateRsvpSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {              
              displaySuccess(response.data.message)                       
              getRsvpSettingsById(currentSettingsId)              
          }else{
              displayError(response.data.message)
          }
          console.log(response.status)
        
      },
      (error) => {
        displayError(error.response.data.message)        
      }
    );

  }

  
  

  const createRsvpCustomForm = (data) => {
    RsvpService.createRsvpCustomForm(data).then(
      (response) => {
          if(response.status === 200) {              
              handleCustomFormTab()
              displaySuccess(response.data.message)  
              closeModalRefAddCForm.current.click();                 
              customFormSetValue("c_rsvp_field_name", '')
              customFormSetValue("c_rsvp_field_type", '')
          }else{
              displayError(response.data.message)
          }
          console.log(response.status)
        
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          displayError(resMessage)
          console.log(resMessage)      
      }
  );

  }


  const { fields:apfields, append:apappend, remove:apremove } = useFieldArray({ name: 'rsvpfo', control });

  // Add more options Start
  const addMoreQuestionOption = ()=>{ apappend()  }
  const removeQuestionOption = (i)=>{ apremove(i) }
  // Add more options End

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'size': ['small', 'large', 'huge'] }],  // custom dropdown
        [{ 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],        
        [
          {'list': 'ordered'},
          {'list': 'bullet'}
        ],
        ['link'],
        ['image'],
        [{ 'color': [] }, { 'background': [] }], 
        
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button    
      ],
      handlers: {        
      }
    },
    history: {
      delay: 200,
      maxStack: 500,
      userOnly: true
    }
  };

  
  // For basic form add multiple field type start

  const [addMoreOptionsTypeListForBF, setInputOTListForBF] = useState([{ options_type: ""}]);

  // handle input change
  const handleInputOTChangeForBF = (e, index) => {
    const { name, value } = e.target;
    const list = [...addMoreOptionsTypeListForBF];
    list[index][name] = value;      
    setInputOTListForBF(list);
  };   

  // handle click event of the Add button
  const handleAddOTClickForBF = () => {
    setInputOTListForBF([...addMoreOptionsTypeListForBF, { options_type: ""}]);
  };

  // handle click event of the Remove button
  const handleRemoveOTClickForBF = index => {
    const list = [...addMoreOptionsTypeListForBF];
    list.splice(index, 1);
    setInputOTListForBF(list);
  };


  const editSettingsTab = (currentSettingsId)=>{    
    
    
    getRsvpSettingsById(currentSettingsId)
    // const getCurrentSettingVal = JSON.parse(sessionStorage.getItem('currentSettingsval'))           
    // console.log(getCurrentSettingVal)
    // if(getCurrentSettingVal != null){

    //   if(getCurrentSettingVal.rsvp_event_mode){
    //     getAllEvents(getCurrentSettingVal.rsvp_event_mode)
    //   }
  
    //   const fields = ['rsvp_event_mode','rsvp_event_id','rsvp_by_date','rsvp_by_time',
    //     'rsvp_event_capacity','rsvp_individual','rsvp_individual_set_guest_limit',
    //     'rsvp_individual_allow_invitee_to_name','rsvp_group','rsvp_group_set_guest_limit',
    //     'rsvp_group_allow_invitee_to_name','id'];
    //     const timer = setTimeout(() => {            
    //         fields.forEach(field => {
    //         //console.log(currentSettings[field])
    //         setValue(field, getCurrentSettingVal[field])                          
    //         });
    //     }, 400);
    //     return () => clearTimeout(timer);

    // }
    

    
  }
  useEffect( ()=>{       
    
    
    // if(!editid){
    //   console.log("calling......")
    //   sessionStorage.removeItem("currentRsvpSettings")
    //   sessionStorage.removeItem("currentSettingsval")      
    // }    

    const currentSettingsId = editid
    // if($('.select').length > 0) {
    //   $('.select').select2({
    //     minimumResultsForSearch: -1,        
    //     width: '100%'
    //   });
    // }     
    
    //$(".sw-btn-next").prop('disabled', true);    
    $('#smartwizard').smartWizard({      
      theme: 'arrows',   
      selected: 0,      
      transitionEffect:'fade',
      showStepURLhash: false,
      contentCache: true,   
      enableURLhash: false, 
      keyboardSettings: {
          keyNavigation: false, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
      },           
    });
    const currentSettingsEditId = editid     
    if(currentSettingsEditId && currentSettingsEditId > 0 && currentSettingsEditId !='' && currentSettingsEditId !== 0 && currentSettingsEditId !=null)
    { 
        editSettingsTab(currentSettingsEditId)
    }
    $("#smartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {    
  
      
      const stepNumbers = stepDirection+1;             
      if(stepNumbers === 1){        
        
        
        if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId !== 0 && currentSettingsId !=null)
        {          
          editSettingsTab(currentSettingsId)

        }
        
      }else if(stepNumbers === 2){          
        
        //console.log(editRsvpSettings)
        handleBasicFormTab()   
        
        // Form Desing tab
        // if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId != 0 && currentSettingsId !=null){
        //   getFormDesign(currentSettingsId)     
        // }

       }else if(stepNumbers === 3){           
         
        //console.log(currentSettingsId)

       if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId !== 0 && currentSettingsId !=null){

        // Email Settings >  Default Tab
        getDEmailSettings(currentSettingsId,"RSVPYES");
        getDEmailSettings(currentSettingsId,"RSVPNO");

         // Email Settings >  Reminder Tab
        getReminderEmailSettings(currentSettingsId,"PNAMEOFATTENDEES1");
        getReminderEmailSettings(currentSettingsId,"PNAMEOFATTENDEES2");
        getReminderEmailSettings(currentSettingsId,"REGICLOSEDEMAIL");
        getReminderEmailSettings(currentSettingsId,"REMEMAILPRIORTOEVENT");        
        
       }

        

       }else if(stepNumbers === 4){        
        if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId !== 0 && currentSettingsId !=null)
        { 
          getFormDesignDetailId(currentSettingsId)  
                  
        }
      }
    });

 },[]); 

// Get Form design details by ID
const getFormDesignDetailId = (sid)=>{     

  RsvpService.getFormDesignDetailId(sid).then((res)=>{
      if(res.status === 200 && res.data.success === 1){      
        //console.log(res.data.result[0])        

        if(res.data.result[0]['rsvp_basic_form'] === true){
          //console.log("Basic Form")       
          getBasicFormPreview() 
        }

        if(res.data.result[0]['rsvp_custom_form'] === true){
          //console.log("Custom Form")
          getCustomFormPreview()
          //getRsvpSById()
        }
      }
    }
  ).catch(error => {
    console.log(error)
  });

}


 const getRsvpSettingsById = (id) => {     
  RsvpService.getRsvpSettingsById(id).then((response)=>{      
      if(response.status === 200 && response.data.success ===1){                                               
        const ssss = sessionStorage.setItem('currentSettingsval',JSON.stringify(response.data.data[0]));

        const getCurrentSettingVal = JSON.parse(sessionStorage.getItem('currentSettingsval'))           
        //console.log(getCurrentSettingVal)
        if(getCurrentSettingVal != null){

          if(getCurrentSettingVal.rsvp_event_mode){
            getAllEvents(getCurrentSettingVal.rsvp_event_mode)
          }
      
          const fields = ['rsvp_event_mode','rsvp_event_id','rsvp_by_date','rsvp_by_time',
            'rsvp_event_capacity','rsvp_individual','rsvp_individual_set_guest_limit',
            'rsvp_individual_allow_invitee_to_name','rsvp_group','rsvp_group_set_guest_limit',
            'rsvp_group_allow_invitee_to_name','id','rsvp_allow_group_guests','rsvp_allow_individual_guests'];
            const timer = setTimeout(() => {            

              
            
                fields.forEach(field => {
                //console.log(currentSettings[field])
                setValue(field, getCurrentSettingVal[field])                          

                if(getCurrentSettingVal['rsvp_group'] ===true){
                  $(".rsvp_group_set_guest_limit").prop('disabled', false);
                  $(".rsvp_group_allow_invitee_to_name").prop('disabled', false);                  
                  //setValue('rsvp_allow_group_guests',true)
                  setValue('rsvp_allow_group_guests',"on")
                  setValue('rsvp_allow_individual_guests',false)                          
                }
                if(getCurrentSettingVal['rsvp_individual']===true){
                  $(".rsvp_individual_set_guest_limit").prop('disabled', false);
                  $(".rsvp_individual_allow_invitee_to_name").prop('disabled', false);                  
                  //setValue('rsvp_allow_individual_guests',true)                          
                  setValue('rsvp_allow_individual_guests',"on")
                  setValue('rsvp_allow_group_guests',false)
                }

                });
            }, 300);
            return () => clearTimeout(timer);

            

        }

      }
    }
  ).catch(error => {
    console.log(error)
  });
}


// Delete custom form field record
const handleDeleteCFField = () => {    
    
  RsvpService.deleteCustomFormField(customformfieldid).then((res)=>{
    if(res.status === 200){          
      handleCustomFormTab()      
      displaySuccess(res.data.message)
      closeModalRefDelCForm.current.click();
    }
  }
  ).catch(error => {
    displayError(error)
    closeModalRefDelCForm.current.click();
  });
}

const handleUpdateCustomFormStatus = (e,id)=>{  
  
  const data = { rsvp_custom_form_id:id ,rsvp_field_status:e.target.checked }   
  if(id && id > 0){       
    RsvpService.updateCustomFormStatus(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
            displaySuccess(response.data.message)              
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
      }
    )
  }
}

const getEventName = (sid)=>{
  RsvpService.getRsvpSettingsById(sid).then((response)=>{      
    if(response.status === 200 && response.data.success ===1){                                                       
      //console.log(response.data.data[0]['rsvp_event_id'])            
      setRsvpSettingsPreview(response.data.data[0])
      // Get Events by id      
      if(response.data.data[0]['rsvp_event_id']){
        getEventDetailById(response.data.data[0]['rsvp_event_id'])                        
        getChildEventsById(response.data.data[0]['rsvp_event_id'])
      }
      
    }
  }
  ).catch(error => {
    console.log(error)
  });

}

const handleBasicFormTab = (e)=>{
  getBasicFormList()
  if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId != 0 && currentSettingsId !=null){
    getFormDesign(currentSettingsId ? currentSettingsId : 0)
    getEventName(currentSettingsId ? currentSettingsId : 0)
  }
}

const handleCustomFormTab = (e)=>{
  getCustomFormList()
  if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId != 0 && currentSettingsId !=null){
    getFormDesign(currentSettingsId ? currentSettingsId : 0)
    getEventName(currentSettingsId ? currentSettingsId : 0)
  }
}

// Get basic form list
const getBasicFormList = ()=>{
  const rsvpFieldStatus = true
  RsvpService.getBasicFormList(rsvpFieldStatus).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result)
        setBasicFormList(res.data.result)
      }
    }
  ).catch(error => {
    displayError(error)
  });
}


// Get custom form list
const getCustomFormList = ()=>{  
  if(currentSettingsId && currentSettingsId > 0 && currentSettingsId !='' && currentSettingsId !=null){
    const rsvpSettingsId = currentSettingsId
    RsvpService.getCustomFormList(rsvpSettingsId).then((res)=>{
        if(res.status === 200){          
          //console.log(res.data.result)
          setCustomFormList(res.data.result)
        }
      }
    ).catch(error => {
      displayError(error)
    });

  }
  
}

const handlechangeFormType = (e)=>{
  const formTypeVal = e.target.value  
  if(formTypeVal !== '' && formTypeVal !== 'textbox' && formTypeVal !== 'textarea'){
    setTypeOptionVal(true)
  }else{
    setTypeOptionVal(false)
  }
}

const handlechangecevent = (e)=>{        
  setPEventCapacity([])
  //setCEventCapacity([])
  
  const peventid = e.target.value  
  if(peventid){    
    //getParentEventsById(peventid)
    //getChildEventsById(peventid)
  }  
}

const handlechangeevent = (e)=>{        
  //alert(e.target.value)
  
  setPEventCapacity([])
  //setCEventCapacity([])
  setEventData([])
  const eventMode = e.target.value
  if(eventMode){    
    getAllEvents(eventMode)
  }  
}

 // Get All Record
 const getAllEvents = (eventMode)=>{      
    EventService.getEvents(eventMode).then((res)=>{
        if(res.status === 200){          
          //console.log(res.data.result)
          setEventData(res.data.result)
        }
      }
    ).catch(error => {
      console.log(error)
    });
  }


  
  // Get Parent Event by ID
 const getParentEventsById = (peventid)=>{      
  EventService.getEventDetail(peventid).then((res)=>{
      if(res.status === 200){      
        //console.log(res.data.result)
        const resArr = [res.data.result]  
        setChooseParentEventParticipate(resArr)          
        // setPEventCapacity(resArr)
      } 
    }
  ).catch(error => {
    console.log(error)
  });
}

  // Get Child Events by ID
 const getChildEventsById = (peventid)=>{      
  EventService.getChildEventsById(peventid).then((res)=>{
    console.log(res.data.result.length)
    if(res.data.result.length > 0){
      if(res.status === 200 && res.data.success === 1){                  
        setChooseChildEventParticipate(res.data.result)
        //setCEventCapacity(res.data.result)
      }
    }else{
      getParentEventsById(peventid)
    }
      
    }
  ).catch(error => {
    console.log(error)
  });
}
    
//Edit Default Email Settings Start
const getDEmailSettings = (sid,type)=>{
  
  if(type === 'RSVPYES'){
    RsvpService.getDEmailSettingsDetail(sid,type).then((res)=>{
        if(res.status === 200){                    
          //setData(res.data.result)
          if(res.data.result.length > 0){
            dRsvpIsYesSetValue("id", res.data.result[0]['id'])
            dRsvpIsYesSetValue("d_rsvp_is_yes_subject", res.data.result[0]['rsvp_subject'])  
            dRsvpIsYesSetValue("d_rsvp_is_yes_content", res.data.result[0]['rsvp_body'])  
            //onDRsvpIsYesChange(res.data.result[0]['rsvp_body'])  
          }          
          
          //console.log(dRsvpIsYesContent)          
        }
      }
    ).catch(error => {
      console.log(error)
    });
  }
  if(type === 'RSVPNO'){

    RsvpService.getDEmailSettingsDetail(sid,type).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result[0]['rsvp_body'])          
        //setData(res.data.result)
        if(res.data.result.length > 0){
          dRsvpIsNoSetValue("id", res.data.result[0]['id'])
          dRsvpIsNoSetValue("d_rsvp_is_no_subject", res.data.result[0]['rsvp_subject'])
          dRsvpIsNoSetValue("d_rsvp_is_no_content", res.data.result[0]['rsvp_body'])
          //onDRsvpIsNoChange(res.data.result[0]['rsvp_body'])
        }        
        //console.log(dRsvpIsYesContent)          
      }
    }
  ).catch(error => {
    console.log(error)
  });

  }
}
//Edit Default Email Settings End

//Edit Form Design start

//Edit Form Design end
const getFormDesign = (sid)=>{
  
    RsvpService.getFormDesignDetail(sid).then((res)=>{
        if(res.status === 200){          
          //console.log(res.data.result.length)          
          //setData(res.data.result)
          if(res.data.result.length > 0){
            basicFormSetValue("id", res.data.result[0]['id'])
            custFormSetValue("id", res.data.result[0]['id'])
            if(res.data.result[0]['rsvp_basic_form'] ===true){
              
              basicFormSetValue("basic_form_term_use", res.data.result[0]['rsvp_basic_form'])
              basicFormSetValue("basic_form_able_to_makeit", res.data.result[0]['rsvp_able_to_make_it'])           

            }else{
              custFormSetValue("custom_form_term_use", res.data.result[0]['rsvp_custom_form'])
              custFormSetValue("custom_form_able_to_makeit", res.data.result[0]['rsvp_able_to_make_it'])
            }            
          }else{
            basicFormSetValue("id", 0)
            custFormSetValue("id", 0)
          }
        }
      }
    ).catch(error => {
      console.log(error)
    });
}

//Edit Reminder Email Settings Start
const getReminderEmailSettings = (sid,type)=>{
  if(type === 'PNAMEOFATTENDEES1'){
    RsvpService.getReminderEmailSettingsDetail(sid,type).then((res)=>{
        if(res.status === 200){          
          //console.log(res.data.result)          
          //setData(res.data.result)
          if(res.data.result.length > 0){
            r1PNASetValue("id", res.data.result[0]['id'])
            r1PNASetValue("r_1_pna_subject", res.data.result[0]['rsvp_subject'])
            r1PNASetValue("r_1_pna_content", res.data.result[0]['rsvp_body'])
          }
          
          //onDRsvpIsYesChange(res.data.result[0]['rsvp_body'])
          //console.log(dRsvpIsYesContent)          
        }
      }
    ).catch(error => {
      console.log(error)
    });
  }
  if(type === 'PNAMEOFATTENDEES2'){

    RsvpService.getReminderEmailSettingsDetail(sid,type).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result[0]['rsvp_body'])          
        //setData(res.data.result)
        if(res.data.result.length > 0){
          r2PNASetValue("id", res.data.result[0]['id'])
          r2PNASetValue("r_2_pna_subject", res.data.result[0]['rsvp_subject'])
          r2PNASetValue("r_2_pna_content", res.data.result[0]['rsvp_body'])
        }        
        //console.log(dRsvpIsYesContent)          
      }
    }
  ).catch(error => {
    console.log(error)
  });

  }
  if(type === 'REGICLOSEDEMAIL'){

    RsvpService.getReminderEmailSettingsDetail(sid,type).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result[0]['rsvp_body'])          
        //setData(res.data.result)
        if(res.data.result.length > 0){
          regClosedESetValue("id", res.data.result[0]['id'])
          regClosedESetValue("reg_closed_e_subject", res.data.result[0]['rsvp_subject'])
          regClosedESetValue("reg_closed_e_content", res.data.result[0]['rsvp_body'])
        }        
        //console.log(dRsvpIsYesContent)          
      }
    }
  ).catch(error => {
    console.log(error)
  });

  }
  if(type === 'REMEMAILPRIORTOEVENT'){

    RsvpService.getReminderEmailSettingsDetail(sid,type).then((res)=>{
      if(res.status === 200){          
        //console.log(res.data.result[0]['rsvp_body'])          
        //setData(res.data.result)
        if(res.data.result.length > 0){
          rEPriorSetValue("id", res.data.result[0]['id'])
          rEPriorSetValue("r_eprior_subject", res.data.result[0]['rsvp_subject'])
          rEPriorSetValue("r_eprior_content", res.data.result[0]['rsvp_body'])
        }        
        //console.log(dRsvpIsYesContent)          
      }
    }
  ).catch(error => {
    console.log(error)
  });

  }
}
//Edit Reminder Email Settings End


// Default tab - RSVP Is Yes FORM Start
const {
  register:dRsvpIsYesRegister, handleSubmit:defaultRsvpIsYesHandleSubmit,  
  setValue:dRsvpIsYesSetValue, watch:dRsvpIsYesWatch,  
  formState: { errors:dRsvpIsYesErrors}} = useForm();

const onDRsvpIsYesChange = (dRsvpIsYesState) => {  
  dRsvpIsYesSetValue("d_rsvp_is_yes_content", dRsvpIsYesState);
};

useEffect(() => {
  dRsvpIsYesRegister("d_rsvp_is_yes_subject", { required: true});  
  dRsvpIsYesRegister("d_rsvp_is_yes_content", { required: true});  
}, [dRsvpIsYesRegister]);

//const dRsvpIsYesSubject = dRsvpIsYesWatch("d_rsvp_is_yes_subject");
const dRsvpIsYesContent = dRsvpIsYesWatch("d_rsvp_is_yes_content");

const onDRsvpIsYesSubmit = (data) => {    
  //console.log(data);

  data["rsvp_event_is"] = "Paid";
  data["rsvp_allow_to_primary_attendee"] = "Yes";
  data["rsvp_is"] = "Yes";
  data["rsvp_email_type"] = "RSVPYES";
  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0; 

  data["rsvp_subject"] = data["d_rsvp_is_yes_subject"]; 
  data["rsvp_body"] = data["d_rsvp_is_yes_content"];     
  
  if(data['id'] && data['id'] > 0){

    RsvpService.updateDEmailSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getDEmailSettings(currentSettingsId,"RSVPYES");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {
        displayError(error.response.data.message)
      }
  );


  }else{

    RsvpService.saveDEmailSettings(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                getDEmailSettings(currentSettingsId,"RSVPYES");
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)
        }
    );

  }

};
// Default tab - RSVP Is Yes FORM End


// Default tab - RSVP Is No FORM Start
const {
  register:dRsvpIsNoRegister, handleSubmit:defaultRsvpIsNoHandleSubmit,  
  setValue:dRsvpIsNoSetValue, watch:dRsvpIsNoWatch,  
  formState: { errors:dRsvpIsNoErrors}} = useForm();

const onDRsvpIsNoChange = (dRsvpIsNoState) => {  
  dRsvpIsNoSetValue("d_rsvp_is_no_content", dRsvpIsNoState);
};

useEffect(() => {
  dRsvpIsNoRegister("d_rsvp_is_no_subject", { required: true});  
  dRsvpIsNoRegister("d_rsvp_is_no_content", { required: true});  
}, [dRsvpIsNoRegister]);

//const dRsvpIsNoSubject = dRsvpIsNoWatch("d_rsvp_is_no_subject");
const dRsvpIsNoContent = dRsvpIsNoWatch("d_rsvp_is_no_content");

const onDRsvpIsNoSubmit = (data) => {  
  //console.log(data); 
  
  //console.log(currentSettingsId)
  data["rsvp_event_is"] = "Paid";
  data["rsvp_allow_to_primary_attendee"] = "Yes";
  data["rsvp_is"] = "No";
  data["rsvp_email_type"] = "RSVPNO";
  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0; 

  data["rsvp_subject"] = data["d_rsvp_is_no_subject"]; 
  data["rsvp_body"] = data["d_rsvp_is_no_content"]; 
  console.log(data);

  if(data['id'] && data['id'] > 0){

    RsvpService.updateDEmailSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getDEmailSettings(currentSettingsId ? currentSettingsId : 0,"RSVPNO");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {
        displayError(error.response.data.message)
      }
  );


  }else{
    RsvpService.saveDEmailSettings(data).then(
      (response) => {
          if(response.status === 200) {              
              displaySuccess(response.data.message)        
              getDEmailSettings(currentSettingsId ? currentSettingsId : 0,"RSVPNO");                    
          }else{
              displayError(response.data.message)
          }
          console.log(response.status)
        
      },
      (error) => {
        displayError(error.response.data.message)
      }
  );
  }

  

};
// Default tab - RSVP Is No FORM End


// Reminder tab - 1 providing name of attendees FORM Start
const {
  register:r1PNARegister, handleSubmit:r1PNameAttendeesHandleSubmit,  
  setValue:r1PNASetValue, watch:r1PNAWatch,  
  formState: { errors:r1PNAErrors}} = useForm();

const onR1PNAChange = (state) => {  
  r1PNASetValue("r_1_pna_content", state);
};

useEffect(() => {
  r1PNARegister("r_1_pna_subject", { required: true});  
  r1PNARegister("r_1_pna_content", { required: true});  
}, [r1PNARegister]);

//const r1PNASubject = r1PNAWatch("r_1_pna_subject");
const r1PNAContent = r1PNAWatch("r_1_pna_content");

const onR1PNASubmit = (data) => {  

  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0; 
  data["rsvp_email_type"] = "PNAMEOFATTENDEES1";
  data["rsvp_subject"] = data["r_1_pna_subject"]; 
  data["rsvp_body"] = data["r_1_pna_content"];   

  console.log(data);

  if(data['id'] && data['id'] > 0){

    RsvpService.updateReminderEmailSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"PNAMEOFATTENDEES1");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {        
          displayError(error.response.data.message)     
      }
  );


  }else{

    RsvpService.saveReminderEmailSettings(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"PNAMEOFATTENDEES1");
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)     
        }
    );

  }

};
// Reminder tab - 1 providing name of attendees FORM End

// Reminder tab - 2 providing name of attendees FORM Start
const {
  register:r2PNARegister, handleSubmit:r2PNameAttendeesHandleSubmit,  
  setValue:r2PNASetValue, watch:r2PNAWatch,  
  formState: { errors:r2PNAErrors}} = useForm();

const onR2PNAChange = (dRsvpIsNoState) => {  
  r2PNASetValue("r_2_pna_content", dRsvpIsNoState);
};

useEffect(() => {
  r2PNARegister("r_2_pna_subject", { required: true});  
  r2PNARegister("r_2_pna_content", { required: true});  
}, [r2PNARegister]);

//const r2PNASubject = r2PNAWatch("r_2_pna_subject");
const r2PNAContent = r2PNAWatch("r_2_pna_content");

const onR2PNASubmit = (data) => {    

  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0; 
  data["rsvp_email_type"] = "PNAMEOFATTENDEES2";
  data["rsvp_subject"] = data["r_2_pna_subject"]; 
  data["rsvp_body"] = data["r_2_pna_content"];   

  console.log(data);

  if(data['id'] && data['id'] > 0){

    RsvpService.updateReminderEmailSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"PNAMEOFATTENDEES2");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {        
          displayError(error.response.data.message)     
      }
  );


  }else{

    RsvpService.saveReminderEmailSettings(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"PNAMEOFATTENDEES2");
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)     
        }
    );

  }

};
// Reminder tab - 2 providing name of attendees FORM End

// Reminder tab - Registration closed email FORM Start
const {
  register:regClosedERegister, handleSubmit:regClosedEHandleSubmit,  
  setValue:regClosedESetValue, watch:regClosedEWatch,  
  formState: { errors:regClosedEErrors}} = useForm();

const onRegClosedEChange = (dRsvpIsNoState) => {  
  regClosedESetValue("reg_closed_e_content", dRsvpIsNoState);
};

useEffect(() => {
  regClosedERegister("reg_closed_e_subject", { required: true});  
  regClosedERegister("reg_closed_e_content", { required: true});  
}, [regClosedERegister]);

//const regClosedESubject = regClosedEWatch("reg_closed_e_subject");
const regClosedEContent = regClosedEWatch("reg_closed_e_content");

const onRregClosedESubmit = (data) => {  
  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0; 
  data["rsvp_email_type"] = "REGICLOSEDEMAIL";
  data["rsvp_subject"] = data["reg_closed_e_subject"]; 
  data["rsvp_body"] = data["reg_closed_e_content"];   

  console.log(data);

  if(data['id'] && data['id'] > 0){

    RsvpService.updateReminderEmailSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"REGICLOSEDEMAIL");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {        
          displayError(error.response.data.message)     
      }
  );


  }else{

    RsvpService.saveReminderEmailSettings(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"REGICLOSEDEMAIL");
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)     
        }
    );

  }
};
// Reminder tab - Registration closed email FORM End

// Reminder tab - Reminder email prior to the event FORM Start
const {
  register:rEPriorRegister, handleSubmit:rEPriorHandleSubmit,  
  setValue:rEPriorSetValue, watch:rEPriorWatch,  
  formState: { errors:rEPriorErrors}} = useForm();

const onREPriorChange = (dRsvpIsNoState) => {  
  rEPriorSetValue("r_eprior_content", dRsvpIsNoState);
};

useEffect(() => {
  rEPriorRegister("r_eprior_subject", { required: true});  
  rEPriorRegister("r_eprior_content", { required: true});  
}, [rEPriorRegister]);

//const rEPriorSubject = rEPriorWatch("r_eprior_subject");
const rEPriorContent = rEPriorWatch("r_eprior_content");

const onREPriorSubmit = (data) => {  
  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0; 
  data["rsvp_email_type"] = "REMEMAILPRIORTOEVENT";
  data["rsvp_subject"] = data["r_eprior_subject"]; 
  data["rsvp_body"] = data["r_eprior_content"];   

  //console.log(data);

  if(data['id'] && data['id'] > 0){

    RsvpService.updateReminderEmailSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"REMEMAILPRIORTOEVENT");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {        
          displayError(error.response.data.message)     
      }
  );


  }else{

    RsvpService.saveReminderEmailSettings(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"REMEMAILPRIORTOEVENT");
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)     
        }
    );

  }
};
// Reminder tab - Reminder email prior to the event FORM End



// Step 2 > Basic Form Desing Start
const {
  register:basicFormRegister, handleSubmit:basicFormHandleSubmit,  
  setValue:basicFormSetValue, watch:basicFormWatch,  
  formState: { errors:basicFormErrors}} = useForm();


useEffect(() => {
  basicFormRegister("basic_form_term_use", { required: true});  
  basicFormRegister("basic_form_able_to_makeit", { required: true});  
}, [basicFormRegister]);


const onBasicFormSubmit = (data) => {  


  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0;   
  data["rsvp_basic_form"] = true; 
  data["rsvp_custom_form"] = false; 
  data["rsvp_form_term"] = data["basic_form_term_use"];
  data["rsvp_able_to_make_it"] = data["basic_form_able_to_makeit"];   

  console.log(data);
  if(data['id'] && data['id'] > 0){

    RsvpService.updateFormDesign(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              //getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"REMEMAILPRIORTOEVENT");
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {        
          displayError(error.response.data.message)     
      }
  );


  }else{

    RsvpService.saveFormDesign(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                getFormDesign(currentSettingsId ? currentSettingsId : 0)
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)     
        }
    );

  }

}
// Step 2 > Basic Form Desing End

// Step 2 > Custom Form Desing Start
const {
  register:custFormRegister, handleSubmit:custFormHandleSubmit,  
  setValue:custFormSetValue, watch:custFormWatch,  
  formState: { errors:custFormErrors}} = useForm();


useEffect(() => {
  custFormRegister("custom_form_term_use", { required: true});  
  custFormRegister("custom_form_able_to_makeit", { required: true});  
}, [custFormRegister]);


const onCustFormSubmit = (data) => {  
  data["rsvp_settings_id"] = currentSettingsId ? currentSettingsId : 0;   
  data["rsvp_basic_form"] = false; 
  data["rsvp_custom_form"] = true; 
  data["rsvp_form_term"] = data["custom_form_term_use"];
  data["rsvp_able_to_make_it"] = data["custom_form_able_to_makeit"];   

  //console.log(data);
  if(data['id'] && data['id'] > 0){

    RsvpService.updateFormDesign(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {               
              displaySuccess(response.data.message);              
              getFormDesign(currentSettingsId ? currentSettingsId : 0)
          }else{
            console.log(response.data.message)
          }
          
      },
      (error) => {        
          displayError(error.response.data.message)     
      }
  );


  }else{

    RsvpService.saveFormDesign(data).then(
        (response) => {
            if(response.status === 200) {              
                displaySuccess(response.data.message)                            
                //getReminderEmailSettings(currentSettingsId ? currentSettingsId : 0,"REMEMAILPRIORTOEVENT");
            }else{
                displayError(response.data.message)
            }
            console.log(response.status)
          
        },
        (error) => {
          displayError(error.response.data.message)     
        }
    );

  }
}
// Step 2 > Custom Form Desing End

//Get Event Details by ID Start
const getEventDetailById = (id)=>{      
  EventService.getEventDetail(id).then((res)=>{
    if(res.status === 200){                
      //console.log(res.data.result)
      setEventDetailByID(res.data.result)
      setEventName(res.data.result.p_event_title)       
    }
  }
).catch(error => {
  console.log(error)
});
}
//Get Event Details by ID End

// Get Basic Form Preview Start
const getBasicFormPreview = ()=>{ 
  setFormDesingTitleName('BASIC')
  if(editid && editid > 0 && editid !=''){

    // Get RSVP Custom Form Details Start
      RsvpService.getBasicFormDetails(editid).then((res)=>{
          if(res.status === 200){          
            //console.log(res.data.result)
            setFormDesignPreview(res.data.result)
          }
        }
      ).catch(error => {
        displayError(error)
    });
    // Get RSVP Custom Form Details End
    //getRsvpSById()        
  }

}
// Get Basic Form Preview End

// Get Custom Form Preview Start
const getCustomFormPreview = ()=>{ 
  setFormDesingTitleName('CUSTOM')
  if(editid && editid > 0 && editid !=''){

    // Get RSVP Custom Form Details Start
      RsvpService.getCustomFormDetails(editid).then((res)=>{
          if(res.status === 200){          
            //console.log(res.data.result)
            setFormDesignPreview(res.data.result)
          }
        }
      ).catch(error => {
        displayError(error)
    });
    // Get RSVP Custom Form Details End
    //getRsvpSById()        
  }
}

// Get Custom Form Preview End


const getRsvpSById = ()=>{
  // Get RSVP Settings Details By ID Start
  RsvpService.getRsvpSettingsById(editid).then((response)=>{      
    if(response.status === 200 && response.data.success ===1){                                                       
      //console.log(response.data.data[0])
      setRsvpSettingsPreview(response.data.data[0])      
      // Get Events by id
      if(response.data.data[0]['rsvp_event_id']){
        getEventDetailById(response.data.data[0]['rsvp_event_id'])
      }
      
    }
  }
  ).catch(error => {
    console.log(error)
  });
  // Get RSVP Settings Details By ID End  
}


// Get default email template preview start 
const getDEmailTemplatePreview = ()=>{
  console.log("default template")
  RsvpService.getDEmailTemplatePreview(editid).then((response)=>{      
    if(response.status === 200 && response.data.success ===1){                                                       
      //console.log(response.data.result)
      setDEmailTemplatePreview(response.data.result)
    }
  }
  ).catch(error => {
    console.log(error)
  });
}
// Get default email template preview End

// Get reminder email template preview start 
const getREmailTemplatePreview = ()=>{
  //console.log("default template")
  RsvpService.getREmailTemplatePreview(editid).then((response)=>{      
    if(response.status === 200 && response.data.success ===1){                                                       
      //console.log(response.data.result)
      setREmailTemplatePreview(response.data.result)
    }
  }
  ).catch(error => {
    console.log(error)
  });
}
// Get reminder email template preview End

const onClickAllowGuestes = (param,e)=>{    
  if(e.target.checked === true && param == 'individual'){    
    setValue('rsvp_allow_group_guests',false)
  }
  if(e.target.checked === true && param == 'group'){    
    setValue('rsvp_allow_individual_guests',false)
    $(".rsvp_individual_set_guest_limit").prop('disabled', true);
    $(".rsvp_individual_allow_invitee_to_name").prop('disabled', true);
  }
}



const generateRavpLink = ()=>{  
  const rsvpUrl = "http://"+window.location.hostname+':3000/rsvp/'+editid
  setValueGenereatedLink(rsvpUrl);
}

const copyRavpLink = (copyText)=>{
  try {
    navigator.clipboard.writeText(copyText);
    displaySuccess('Copied!');
  } catch (err) {
    displayError('Failed to copy!');
  }
}


const rsvpPagePulblish = ()=>{ 

    const data = {}
    data['id'] = editid
    data['rsvp_status'] = 'Published'      

    RsvpService.updateRsvpSettings(data).then(
      (response) => {
          if(response.status === 200 && response.data.success === 1) {              
              displaySuccess(response.data.message) 
              navigate("/rsvp-list");                                    
          }else{
              displayError(response.data.message)
          }
      },
      (error) => {
        displayError(error.response.data.message)        
      }
    );
}
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
                <h3 className="page-title">Edit RSVP </h3>                
              </div>              
            </div>
          </div>
          {/* /Page Header */}

        <div className="row1">

          <div id="smartwizard" className="bg-white"> 
              <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#step-1">
                    <strong>Step 1</strong> <br/>Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step-2">
                    <strong>Step 2</strong> <br/> Form Design
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step-3">
                    <strong>Step 3</strong> <br/>Email Settings
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#step-4">
                    <strong>Step 4</strong> <br/>View & Publish
                    </a>
                  </li>                  
              </ul>
          
              <div className="tab-content h-100">
                  <div id="step-1" className="tab-pane" role="tabpanel" aria-labelledby="step-1">                      
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                        <form onSubmit={handleSettingsSubmitForm(onSubmitForm)}>
                          <div className="row">
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <select className={errors.rsvp_event_mode ? 'form-select is-invalid': 'form-select'} {...settingsRegister("rsvp_event_mode")} onChange={e => handlechangeevent(e)}>                  
                                <option value="">Select Event Mode</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>                              
                                <option value="hybrid">Hybrid</option>                  
                              </select>
                              {errors.rsvp_event_mode && <div className="invalid-feedback">
                                {errors.rsvp_event_mode?.message}
                              </div>}
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                                <select className={errors.rsvp_event_id ? 'form-select is-invalid': 'form-select'} {...settingsRegister("rsvp_event_id")} onChange={e => handlechangecevent(e)}>                  
                                  <option value="">Select Event Title</option>
                                  {eventData.map(({id,p_event_title},index)=><option value={id}>{p_event_title}</option>)}                                  
                                </select>   
                                {errors.rsvp_event_id && <div className="invalid-feedback">
                                {errors.rsvp_event_id?.message}
                              </div>}        
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>RSVP By</label>
                              <input className={errors.rsvp_by_date ? 'form-control is-invalid': 'form-control'} {...settingsRegister("rsvp_by_date")} placeholder="Select Date" type="date"/>
                              {errors.rsvp_by_date && <div className="invalid-feedback">
                                {errors.rsvp_by_date?.message}
                              </div>}
                              
                              </div>
                            </div>
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>&nbsp;</label>
                                <input className={errors.rsvp_by_time ? 'form-control is-invalid': 'form-control'} {...settingsRegister("rsvp_by_time")} placeholder="Select Time" type="time"/>                              
                                {errors.rsvp_by_time && <div className="invalid-feedback">
                                {errors.rsvp_by_time?.message}
                              </div>}
                              </div>
                            </div>                          
                          </div>

                          <div className="row">
                            <div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label> Event Capacity</label>
                              <input className={errors.rsvp_event_capacity ? 'form-control is-invalid': 'form-control'} {...settingsRegister('rsvp_event_capacity')} type="text" placeholder="Set Max Limit" maxLength="4"/>
                              {errors.rsvp_event_capacity && <div className="invalid-feedback">
                                {errors.rsvp_event_capacity?.message}
                              </div>}
                              </div>
                            </div>                                                        
                          </div>


                          {/* <div className="row">
                            {pEventCapacity.map(({id,p_event_title},index)=><div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>{p_event_title} Capacity</label>
                              <input className={errors.event_capacity?.[id] ? 'form-control is-invalid': 'form-control'} {...settingsRegister(`event_capacity.${id}.rsvp_event_capacity`)} type="text" placeholder="Set Max Limit" maxLength="4"/>
                              {errors.event_capacity?.[id] && <div className="invalid-feedback">
                                {errors.event_capacity?.[id]?.rsvp_event_capacity?.message}
                              </div>}
                              </div>
                            </div>)}
                            {cEventCapacity.map(({id,c_event_title},index)=><div className="col-sm-6 col-md-3">
                              <div className="form-group">
                              <label>{c_event_title} Capacity</label>
                              <input className={errors.event_capacity?.[id] ? 'form-control is-invalid': 'form-control'} {...settingsRegister(`event_capacity.${id}.rsvp_event_capacity`)} type="text" placeholder="Set Max Limit" maxLength="4"/>
                              {errors.event_capacity?.[id] && <div className="invalid-feedback">
                                {errors.event_capacity?.[id]?.rsvp_event_capacity?.message}
                              </div>}
                              </div>
                            </div>)}                            
                          </div> */}

                          <div className="row">
                            <div className="col-sm-6 col-md-12">
                              <div className="form-group">
                              <label>Allow Guests To Do </label>                            
                              </div>
                            </div>
                            
                          </div>

                        <div className="row">
                          <div className="col-sm-6 col-md-2">
                            <div className="form-group">                            
                              <div className="form-check form-check-inline">
                                <input type="checkbox" className="form-check-input" id="individual" ref={settingsRegister('rsvp_allow_individual_guests')} onClick={(e)=>onClickAllowGuestes('individual',e)} {...settingsRegister("rsvp_allow_individual_guests")}/>
                                <label className="form-check-label" htmlFor="individual">
                                  Individual RSVP
                                </label>                                                                
                                
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="form-select" ref={settingsRegister('rsvp_allow_individual_guests')} {...settingsRegister("rsvp_individual_set_guest_limit")} disabled={!settingFormWatch("rsvp_allow_individual_guests")}>                  
                                  <option value="">Set limit for plus-one guests</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>                                
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                </select>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="form-select" ref={settingsRegister('rsvp_allow_individual_guests')} {...settingsRegister("rsvp_individual_allow_invitee_to_name")} disabled={!settingFormWatch("rsvp_allow_individual_guests")}>                  
                                  <option value="">Allow Primary invitee to name the plus ones</option>
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>                                
                                </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6 col-md-2">
                            <div className="form-group">                            
                              <div className="form-check form-check-inline">
                              <input type="checkbox" className="form-check-input" id="group" ref={settingsRegister('rsvp_allow_group_guests')} onClick={(e)=>onClickAllowGuestes('group',e)} {...settingsRegister("rsvp_allow_group_guests")}/>
                              <label className="form-check-label" htmlFor="group">
                                Group RSVP
                              </label>
                            </div>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="form-select" ref={settingsRegister('rsvp_allow_group_guests')} {...settingsRegister("rsvp_group_set_guest_limit")} disabled={!settingFormWatch("rsvp_allow_group_guests")}>                  
                                  <option value="">Set limit for plus-one guests</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                  <option value="150">150</option>
                                  <option value="200">200</option>                                
                                  <option value="250">250</option>
                                </select>
                            </div>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <div className="form-group">                            
                                <select className="form-select" ref={settingsRegister('rsvp_allow_group_guests')} {...settingsRegister("rsvp_group_allow_invitee_to_name")} disabled={!settingFormWatch("rsvp_allow_group_guests")}>                  
                                  <option value="">Allow Primary invitee to name the group members</option>
                                  <option values="yes">Yes</option>
                                  <option values="no">No</option>                                
                                </select>
                            </div>
                          </div>
                        </div>

                        <div className="submit-section">                
                          {/* <button className="btn btn-custom-theme submit-btn min-w-btn-145" type="submit">DRAFT</button> */}
                          <button className="btn btn-primary submit-btn ms-1 min-w-btn-145" type="submit">SAVE</button>
                        </div>
                        </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div id="step-2" className="tab-pane" role="tabpanel" aria-labelledby="step-2">
                      
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card">
                        <div className="card-body">
                          <ul className="nav nav-tabs nav-tabs-solid nav-justified flex-column">
                            <li className="nav-item"><a className="nav-link active" onClick={(e) => handleBasicFormTab(e)} data-bs-toggle="tab" href="#basic-form">Basic Form</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={(e) => handleCustomFormTab(e)} data-bs-toggle="tab" href="#custom-form">Create your own Form</a></li>                            
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="card">
                        <div className="card-body">
                          <div className="tab-content">
                            <div id="basic-form" className="tab-pane show active">
                              <div className="card-box">
                                
                              <form onSubmit={basicFormHandleSubmit(onBasicFormSubmit)}>
                              <section className="review-section">
                              <div className="row">
                                <div className="col-md-12">
                                    <div className="review-header1 text-left">                                
                                      <h3 className="review-title">Basic Form</h3>
                                      <div className="text-muted">
                                        <div className="form-group">                            
                                          <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" id="basic_form_term" {...basicFormRegister("basic_form_term_use")}/>                                            
                                            <label className="form-check-label" htmlFor="basic_form_term">
                                            I would like to use basic form for my event - "<strong><i>{eventName}</i></strong>"
                                            </label>
                                          </div>
                                          {basicFormErrors.basic_form_term_use && <div className="invalid-feedback">                                            
                                            {basicFormErrors.basic_form_term_use && "Please select term"}
                                          </div>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-md-3">
                                    <a href="#" className="" data-bs-toggle="modal" data-bs-target="#add_basic_form">Create your own Form</a>                                                                              
                                  </div> */}
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="table-responsive">
                                      <table className="table table-bordered table-review review-table mb-0" id="table_alterations">
                                        <thead>
                                          <tr>                                            
                                            <th className="text-center">Field Name</th>
                                            {/* <th className="text-center">Status</th>                                                                                         */}
                                          </tr>
                                        </thead>
                                        <tbody id="table_alterations_tbody">
                                        <tr>                                            
                                            <td>
                                              <lable>Please let us know if you will be able to make it.</lable><br/>
                                              <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="addition_assignee" id="addition_no_emp" defaultValue="Yes" {...basicFormRegister("basic_form_able_to_makeit")}/>
                                                <label className="form-check-label" htmlFor="addition_no_emp">
                                                  Yes, I'll be there
                                                </label>
                                              </div>
                                              <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="addition_assignee" id="addition_all_emp" defaultValue="No" {...basicFormRegister("basic_form_able_to_makeit")}/>
                                                <label className="form-check-label" htmlFor="addition_all_emp">
                                                  No, I can't make it
                                                </label>
                                              </div>
                                              {basicFormErrors.basic_form_able_to_makeit && <div className="invalid-feedback">                                            
                                              {basicFormErrors.basic_form_able_to_makeit && "Please select above option"}
                                            </div>}
                                            
                                            </td>
                                            {/* <td></td>                                                                                       */}
                                          </tr>
                                          {basicFormList.map(({id,rsvp_field_name,rsvp_field_status},i)=><tr>                                            
                                            <td><lable>{rsvp_field_name}</lable></td>                                            
                                          </tr>)}                                        
                                          
                                        </tbody>                                        
                                      </table>                                      
                                    </div>
                                    
                                  </div>                                  
                                </div>
                              </section>                              
                                <div className="submit-section">                                                  
                                  <a onClick={() =>getBasicFormPreview()} data-bs-toggle="modal" data-bs-target="#preview_custom_form" className="btn btn-custom-theme submit-btn min-w-btn-145">PREVIEW</a>
                                  <button className="btn btn-primary submit-btn ms-1 mw-100 min-w-btn-145" type="submit">USE FORM</button>
                                </div>
                                </form>
                              </div>                              
                            </div>
                            
                            <div id="custom-form" className="tab-pane fade">
                            <form onSubmit={custFormHandleSubmit(onCustFormSubmit)}>
                          <section className="review-section">
                          <div className="row">
                              <div className="col-md-12">
                                <div className="review-header1 text-left">
                                  <h3 className="review-title">Custom Form</h3>
                                  <div className="text-muted">
                                    <div className="form-group">                            
                                      <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" id="custom_form_term" {...custFormRegister("custom_form_term_use")}/>
                                        <label className="form-check-label" htmlFor="custom_form_term">
                                          I would like to use custom form for my event - "<strong><i>{eventName}</i></strong>"
                                        </label>
                                      </div>
                                      {custFormErrors.custom_form_term_use && <div className="invalid-feedback">                                            
                                        {custFormErrors.custom_form_term_use && "Please select term"}
                                      </div>}
                                    </div>
                                    </div>
                                </div>
                              </div>
                              {/* <div className="col-md-4">
                                  <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_basic_form"><i className="fa fa-plus" /> Create Your Own Form</a>
                              </div> */}
                            </div>                                                                                    
                              <div className="card-box">                                
                                <div className="table-responsive">
                                <table className="table table-bordered table-review review-table mb-0" id="table_alterations">
                                  <thead>
                                    <tr>                                            
                                      <th className="text-center">Field Name</th>
                                      <th className="text-center">Status</th>                                            
                                      <th>&nbsp;</th>
                                    </tr>
                                  </thead>
                                  <tbody id="table_alterations_tbody">
                                  <tr>                                            
                                      <td>
                                        <lable>Please let us know if you will be able to make it.</lable><br/>
                                        <div className="form-check form-check-inline">
                                          <input className="form-check-input" type="radio" name="addition_assignee" id="custom_addition_no_emp" defaultValue="Yes" {...custFormRegister("custom_form_able_to_makeit")}/>
                                          <label className="form-check-label" htmlFor="custom_addition_no_emp">
                                            Yes, I'll be there
                                          </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                          <input className="form-check-input" type="radio" name="addition_assignee" id="custom_addition_all_emp" defaultValue="No" {...custFormRegister("custom_form_able_to_makeit")}/>
                                          <label className="form-check-label" htmlFor="custom_addition_all_emp">
                                            No, I can't make it
                                          </label>
                                        </div>
                                        {custFormErrors.custom_form_able_to_makeit && <div className="invalid-feedback">                                            
                                          {custFormErrors.custom_form_able_to_makeit && "Please select above option"}
                                        </div>}
                                      </td>
                                      <td></td>
                                      <td></td>                                            
                                    </tr>
                                    {customFormList.map(({id,rsvp_field_name,rsvp_field_status},i)=><tr>                                            
                                      <td><lable>{rsvp_field_name}</lable></td>
                                      <td>
                                        <div className="status-toggle">
                                          <input type="checkbox" onChange={(e)=>handleUpdateCustomFormStatus(e,id)} id={`events_module${id}`} className="check" defaultChecked={rsvp_field_status}/>
                                          <label htmlFor={`events_module${id}`} className="checktoggle">checkbox</label>
                                        </div>
                                      </td>    
                                      <td className="d-grid"><a onClick={() =>setCustomformfieldid(id)} data-bs-toggle="modal" data-bs-target="#delete_bf_field" className="delete-icon float-start text-center"><i className="fa fa-trash-o" /></a></td>
                                    </tr>)}                                                                            
                                    
                                  </tbody>                                        
                                </table> 
                                </div>
                              </div>
                              </section>                              
                              <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_question"><i className="fa fa-plus" />Add Form Element</a><br/>
                              <div className="submit-section">                                                
                                <a onClick={() =>getCustomFormPreview()} data-bs-toggle="modal" data-bs-target="#preview_custom_form" className="btn btn-custom-theme submit-btn min-w-btn-145">PREVIEW</a>
                                <button className="btn btn-primary submit-btn ms-1 mw-100 min-w-btn-145" type="submit">USER FORM</button>
                              </div>
                              </form>
                            </div> 
                                                       
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Content End */}
                  </div>

                  </div>
                  <div id="step-3" className="tab-pane" role="tabpanel" aria-labelledby="step-3">
                      

                    {/* Tabs */}
                    <section className="comp-section-top" id="comp_tabs">          
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-body">                  
                              <ul className="nav nav-tabs nav-tabs-bottom">
                                <li className="nav-item"><a className="text-capitalize nav-link active" href="#default-tab" data-bs-toggle="tab">Default</a></li>
                                <li className="nav-item"><a className="nav-link" href="#Reminders-tab" data-bs-toggle="tab">Reminders</a></li>                    
                              </ul>
                              <div className="tab-content">
                                <div className="tab-pane show active" id="default-tab">
                                  <form onSubmit={defaultRsvpIsYesHandleSubmit(onDRsvpIsYesSubmit)}>
                                  <div className="row">
                                  
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">
                                        <label>Response Message when - </label>                                            
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 1) RSVP is</label>
                                          <select className="form-select" {...dRsvpIsYesRegister("d_rsvp_is_yes_rsvp_is")} disabled>                  
                                            <option value="Yes">Yes</option>                                            
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 2) Allow the primary attendee to name the plus-ones is</label>
                                          <select className="form-select" {...dRsvpIsYesRegister("d_rsvp_is_yes_primary_attendee")} disabled>                  
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>                                            
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 3) Event is</label>
                                          <select className="form-select" {...dRsvpIsYesRegister("d_rsvp_is_yes_event_is")} disabled>                  
                                            <option value="Paid">Paid</option>
                                            <option value="Free">Free</option>                                                              
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">
                                        <label>Subject</label>
                                          <input type="text" className="form-control" {...dRsvpIsYesRegister("d_rsvp_is_yes_subject")}/>
                                          {dRsvpIsYesErrors.d_rsvp_is_yes_subject && <div className="invalid-feedback">                                            
                                            {dRsvpIsYesErrors.d_rsvp_is_yes_subject && "Please enter subject"}
                                          </div>}
                                          
                                      </div>
                                    </div>
                                    
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">                                            
                                        <ReactQuill modules={modules} value={dRsvpIsYesContent || ''} onChange={onDRsvpIsYesChange}/>
                                        {dRsvpIsYesErrors.d_rsvp_is_yes_content && <div className="invalid-feedback">                                            
                                            {dRsvpIsYesErrors.d_rsvp_is_yes_content && "Please enter body content"}
                                        </div>}
                                      </div>
                                    </div>                                    
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">                                                                                
                                        <input type="submit" className="btn add-btn" value="Save"/>                            
                                      </div>
                                    </div> 
                                    
                                  </div>
                                  </form>

                                  <form onSubmit={defaultRsvpIsNoHandleSubmit(onDRsvpIsNoSubmit)}>
                                  <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">
                                        <label>Response Message when - </label>                                            
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 1) RSVP is</label>
                                          <select className="form-select" disabled>                                                              
                                            <option value="No">No</option>
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 2) Allow the primary attendee to name the plus-ones is</label>
                                          <select className="form-select" disabled>                  
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="Yes/No">Yes/No</option>                                                
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-4">
                                      <div className="form-group">
                                        <label> 3) Event is</label>
                                          <select className="form-select" disabled>                  
                                            <option value="Paid">Paid</option>
                                            <option value="Free">Free</option>
                                            <option value="Paid/Free">Paid/Free</option>                  
                                          </select>
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">
                                        <label>Subject</label>
                                          <input type="text" className="form-control" {...dRsvpIsNoRegister("d_rsvp_is_no_subject")}/>
                                          {dRsvpIsNoErrors.d_rsvp_is_no_subject && <div className="invalid-feedback">                                            
                                            {dRsvpIsNoErrors.d_rsvp_is_no_subject && "Please enter subject"}
                                          </div>}
                                      </div>
                                    </div>
                                    
                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">                                            
                                      <ReactQuill modules={modules} value={dRsvpIsNoContent || ''} onChange={onDRsvpIsNoChange}/>
                                        {dRsvpIsNoErrors.d_rsvp_is_no_content && <div className="invalid-feedback">                                            
                                            {dRsvpIsNoErrors.d_rsvp_is_no_content && "Please enter body content"}
                                        </div>}
                                      </div>
                                    </div>

                                    <div className="col-sm-12 col-md-12">
                                      <div className="form-group">                                                                                
                                        <input type="submit" className="btn add-btn" value="Save"/>                            
                                      </div>
                                    </div>
                                                                          
                                  </div>
                                  </form>
                                  <div className="submit-section">                                                    
                                    <a onClick={() =>getDEmailTemplatePreview()} data-bs-toggle="modal" data-bs-target="#preview_default_template" className="btn btn-custom-theme submit-btn min-w-btn-145">PREVIEW</a>
                                  </div>

                                </div>
                                <div className="tab-pane" id="Reminders-tab">


                                <form onSubmit={r1PNameAttendeesHandleSubmit(onR1PNASubmit)}>
                                <div className="row">
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>1) 1st Reminder email for providing the names of the attendees  </label>                                            
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>Subject</label>
                                      <input type="text" className="form-control" {...r1PNARegister("r_1_pna_subject")}/>
                                      {r1PNAErrors.r_1_pna_subject && <div className="invalid-feedback">                                            
                                        {r1PNAErrors.r_1_pna_subject && "Please enter subject"}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                            
                                      <label>Body</label>
                                      <ReactQuill modules={modules} value={r1PNAContent || ''} onChange={onR1PNAChange}/>
                                        {r1PNAErrors.r_1_pna_content && <div className="invalid-feedback">                                            
                                            {r1PNAErrors.r_1_pna_content && "Please enter body content"}
                                        </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                             
                                      <input type="submit" className="btn add-btn ms-2" value="Save"/>           
                                      <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#schedule_reminder_modal">Schedule Send</a>
                                    </div>
                                  </div>                                                                          
                                </div>
                                </form>

                                <form onSubmit={r2PNameAttendeesHandleSubmit(onR2PNASubmit)}>
                                <div className="row">
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>2) 2nd Reminder email for providing the names of the attendees  </label>                                            
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>Subject</label>
                                      <input type="text" className="form-control" {...r2PNARegister("r_2_pna_subject")}/>
                                      {r2PNAErrors.r_2_pna_subject && <div className="invalid-feedback">                                            
                                        {r2PNAErrors.r_2_pna_subject && "Please enter subject"}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                            
                                      <label>Body</label>
                                      <ReactQuill modules={modules} value={r2PNAContent || ''} onChange={onR2PNAChange}/>
                                        {r2PNAErrors.r_2_pna_content && <div className="invalid-feedback">                                            
                                            {r2PNAErrors.r_2_pna_content && "Please enter body content"}
                                        </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group"> 
                                      <input type="submit" className="btn add-btn ms-2" value="Save"/>                                                  
                                      <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#schedule_reminder_modal">Schedule Send</a>
                                    </div>
                                  </div>                                                                          
                                </div>
                                </form>

                                <form onSubmit={regClosedEHandleSubmit(onRregClosedESubmit)}>
                                <div className="row">
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>3) Registration closed email</label>                                            
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>Subject</label>
                                      <input type="text" className="form-control" {...regClosedERegister("reg_closed_e_subject")}/>
                                      {regClosedEErrors.reg_closed_e_subject && <div className="invalid-feedback">                                            
                                        {regClosedEErrors.reg_closed_e_subject && "Please enter subject"}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                            
                                      <label>Body</label>
                                      <ReactQuill modules={modules} value={regClosedEContent || ''} onChange={onRegClosedEChange}/>
                                        {regClosedEErrors.reg_closed_e_content && <div className="invalid-feedback">                                            
                                            {regClosedEErrors.reg_closed_e_content && "Please enter body content"}
                                        </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">       
                                      <input type="submit" className="btn add-btn ms-2" value="Save"/>                                 
                                      <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#schedule_reminder_modal">Schedule Send</a>
                                    </div>
                                  </div>                                                                          
                                </div>
                                </form>

                                <form onSubmit={rEPriorHandleSubmit(onREPriorSubmit)}>
                                <div className="row">
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>4) Reminder Email prior to the event</label>                                            
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">
                                      <label>Subject</label>
                                      <input type="text" className="form-control" {...rEPriorRegister("r_eprior_subject")}/>
                                      {rEPriorErrors.r_eprior_subject && <div className="invalid-feedback">                                            
                                        {rEPriorErrors.r_eprior_subject && "Please enter subject"}
                                      </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                            
                                      <label>Body</label>
                                      <ReactQuill modules={modules} value={rEPriorContent || ''} onChange={onREPriorChange}/>
                                        {rEPriorErrors.r_eprior_content && <div className="invalid-feedback">                                            
                                            {rEPriorErrors.r_eprior_content && "Please enter body content"}
                                        </div>}
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group">                                        
                                      <input type="submit" className="btn add-btn ms-2" value="Save"/>
                                      <a href="#" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#schedule_reminder_modal">Schedule Send</a>
                                    </div>
                                  </div>                                                                          
                                </div>
                                </form>
                                <div className="submit-section">                                                    
                                    <a onClick={() =>getREmailTemplatePreview()} data-bs-toggle="modal" data-bs-target="#preview_reminder_template" className="btn btn-custom-theme submit-btn min-w-btn-145">PREVIEW</a>
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
                  <div id="step-4" className="tab-pane" role="tabpanel" aria-labelledby="step-4">
                      
                  
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">Preview</h3>                
                      </div>              
                    </div>
                    
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            RSVP Form - Prieview
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            
                            <div className="row">

                              <div className="card">
                                <div className="card-body"> 

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                               
                                      <h2 className="h2-horizontal-line"><span>RSVP</span></h2>
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                               
                                      <h3>{eventDetailByID.p_event_title}</h3>
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                               
                                    {/* <h4>March 04, 2022</h4> */}
                                      <h4>{moment(rsvpSettingsPreview.rsvp_by_date).format('MMMM Do, YYYY')} &nbsp;
                                      {moment(rsvpSettingsPreview.rsvp_by_time, "HH:mm").format("hh:mm A")}</h4>
                                    </div>
                                  </div>

                                  <div className="col-sm-12 col-md-12">
                                    <div className="form-group text-center">                                
                                      
                                    <label>Please let us know if you will be able to make it.</label><br/>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" id="preview_active" defaultValue="Active" />
                                      <label className="form-check-label" htmlFor="preview_active">Yes, I'll be there</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" id="preview_inactive" defaultValue="Inactive" />
                                      <label className="form-check-label" htmlFor="preview_inactive">No, I can't make it</label>
                                    </div>

                                    </div>
                                  </div>                   


                                    <div className="h3 card-title">                        
                                      <label>CONTACT INFO</label>
                                    </div>
                                        
                                    {formDesignPreview.map(({rsvp_field_name,rsvp_field_type,rsvp_field_options},index)=><div className="col-sm-12 col-md-12">
                                      {rsvp_field_type && rsvp_field_type =='textbox' && <div className="form-group">
                                        <input className="form-control" type={rsvp_field_type} placeholder={rsvp_field_name}/>                                    
                                      </div>}                         
                                      {rsvp_field_type && rsvp_field_type =='radio' && <div className="form-group">
                                        <label>{rsvp_field_name}</label><br/>
                                          {rsvp_field_options.map(item=><div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio"  id={item}/>
                                            <label className="form-check-label" htmlFor={item}>{item}</label>
                                          </div>)}                          
                                      </div>}     
                                      {rsvp_field_type && rsvp_field_type =='dropdown' && <div className="form-group">                        
                                        <select className="form-select">          
                                          <option value="">{rsvp_field_name}</option>                
                                          {rsvp_field_options.map(item=><option value={item}>{item}</option>)}                                 
                                        </select>
                                      </div>}     
                                      {rsvp_field_type && rsvp_field_type =='checkbox' && <div className="form-group">
                                        <label>{rsvp_field_name}</label><br/>
                                          {rsvp_field_options.map(item=><div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id={item}/>
                                            <label className="form-check-label" htmlFor={item}>{item}</label>
                                          </div>)}                          
                                      </div>} 
                                      {rsvp_field_type && rsvp_field_type =='textarea' && <div className="form-group">                        
                                        <textarea className="form-control" placeholder={rsvp_field_name}></textarea>
                                      </div>}      
                                    </div>)}                  

                                  
                                </div>

                                <div className="col-sm-12 col-md-12"> 
                                  <div className="card">
                                      <div className="card-header">
                                        <h4 className="card-title mb-0">CHOOSE EVENTS YOU WILL PARTICIPATE</h4>
                                      </div>
                                      <div className="col-sm-12 col-md-12 mt-2"> 
                                        <div className="card-body">
                                          <div className="table-responsive">
                                            <table className="table table-nowrap mb-0">
                                              
                                              <tbody>
                                              {/* <tr>
                                                <td>
                                                  <div className="form-check form-check-inline">
                                                    <input type="checkbox" className="form-check-input" id="group" defaultChecked/>
                                                    <label className="form-check-label" htmlFor="group">
                                                      All
                                                    </label>
                                                  </div>
                                                </td>
                                                <td>600 Rs/per person</td>                                                                           
                                              </tr> */}

                                              {chooseParentEventParticipate.map(({p_event_title,p_event_price},i)=><tr key={i}>
                                                <td>
                                                  <div className="form-check form-check-inline">
                                                    {/* <input type="checkbox" className="form-check-input" id="group"/> */}
                                                    <label className="form-check-label" htmlFor="group">
                                                      {p_event_title}
                                                    </label>
                                                  </div>
                                                </td>
                                                <td>{p_event_price} Rs/per person</td>                                        
                                                
                                              </tr>)}

                                              {chooseChildEventParticipate.map(({c_event_title,c_event_price},i)=><tr key={i}>
                                                <td>
                                                  <div className="form-check form-check-inline">
                                                    {/* <input type="checkbox" className="form-check-input" id="group"/> */}
                                                    <label className="form-check-label" htmlFor="group">
                                                      {c_event_title}
                                                    </label>
                                                  </div>
                                                </td>
                                                <td>{c_event_price} Rs/per person</td>                                        
                                                
                                              </tr>)}                                              
                                              
                                              </tbody>
                                            </table>
                                                                              
                                          </div>
                                        </div>
                                      </div>
                                  </div>    
                                </div>

                                {/* <div className="col-sm-12 col-md-12 mt-2">
                                  <div className="form-group text-center">
                                    <label><strong>Total: 600 Rs</strong></label>
                                  </div>
                                </div>*/}

                              </div>              
                            </div>

                          </div>
                        </div>
                      </div>                      
                      
                    </div>

                    <div className="row mt-4">
                      <div className="col-sm-12 col-md-4">
                        <div className="form-group">                               
                          <label><strong>RSVP Link</strong></label>
                          <input className="form-control" type="text" name="rsvp_link" value={valueGenereatedLink}/>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-6 mt-3">
                        <div className="form-group">                                  
                          <a onClick={() =>generateRavpLink()} className="btn btn-custom-theme submit-btn min-w-btn-145">Generate</a>
                          <a onClick={() =>copyRavpLink(valueGenereatedLink)} className="btn btn-primary submit-btn ms-2 min-w-btn-145">Copy</a>                          
                        </div>
                      </div>                      

                    </div>

                    <div className="submit-section">                                                            
                      <a onClick={() =>rsvpPagePulblish(valueGenereatedLink)} className="btn btn-primary submit-btn min-w-btn-145">Publish RSVP Page</a>
                    </div>

                  </div>                  
              </div>

          </div>
        </div>
      </div>
      {/* /Page Content */}  

      {/* Add Basic Form Modal */}       
      <div id="add_basic_form" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Custom Form</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Field Name <span className="text-danger">*</span></label>
                    <input className="form-control" type="text" />                    
                  </div>                  
                  <div className="form-group">
                    <label>Field Type <span className="text-danger">*</span></label>
                    <div className="add-group-btn">
                      <select className="select">
                      <option>Select Field Type</option>
                        <option value="textbox">Textbox</option>
                        <option value="textarea">Textarea</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio button</option>
                      </select>                      
                    </div>
                  </div>
                  {addMoreOptionsTypeListForBF.map((x, i) => { 
                  return (
                  <div className="form-group" key={i}>
                    <label>Field Options</label>
                    <div className="add-group-btn">
                      <input className="form-control" type="text" name="options_type" value={x.options_type}
                            onChange={e => handleInputOTChangeForBF(e, i)}/>
                      <a href="#" onClick={() => handleRemoveOTClickForBF(i)} className="delete-icon mt-2 ms-2"><i className="fa fa-trash-o" /></a>
                    </div>
                  </div>  
                  )
                  })}    
                  <div className="add-more">
                    <a href="#" onClick={() => handleAddOTClickForBF()}><i className="fa fa-plus-circle" /> Add More</a>
                  </div> 

                  <div className="form-group mt-2">                        
                    <label>Status</label>                        
                    <div className="status-toggle">
                      <input type="checkbox" id="status_for_bf" className="check" defaultChecked/>
                      <label htmlFor="status_for_bf" className="checktoggle">checkbox</label>
                    </div>
                  </div>
                              
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       </div>      
      {/* /Add Basic Form Modal */}  

      
      {/* Add Question Modal */}       
       <div id="add_question" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Question</h5>
                <button type="button" className="close" ref={closeModalRefAddCForm} data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleCustomSubmitForm(onSubmitCustomForm)}>
                  <div className="form-group">
                    <label>Type a Question <span className="text-danger">*</span></label>
                    <input className={errorsCustomForm.c_rsvp_field_name ? 'form-control is-invalid': 'form-control'} type="text" {...customFormRegister('c_rsvp_field_name')}/>                    
                    {errorsCustomForm.c_rsvp_field_name && <div className="invalid-feedback">
                      {errorsCustomForm.c_rsvp_field_name?.message}
                    </div>}
                  </div>                  
                  <div className="form-group">
                    <label>Select a form type <span className="text-danger">*</span></label>
                    <div className="add-group-btn">
                      <select className={errorsCustomForm.rsvp_event_id ? 'form-select is-invalid': 'form-select'} 
                       {...customFormRegister('c_rsvp_field_type', { onChange: (e) => {handlechangeFormType(e)} })}>
                      <option value="">Select form type</option>
                        <option value="textbox">Textbox</option>
                        <option value="textarea">Textarea</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="radio">Radio button</option>
                      </select>                       
                    </div>
                    {errorsCustomForm.c_rsvp_field_type && <div className="invalid-feedback">
                      {errorsCustomForm.c_rsvp_field_type?.message}
                    </div>}                     
                  </div>
                  {typeOptionVal && apfields.map((x, i) => { 
                  return (
                  <div className="form-group" key={i}>
                    <label>Type Options</label>
                    <div className="add-group-btn">
                      <input className={errorsCustomForm.rsvpfo?.[i] ? 'form-control is-invalid': 'form-control'} type="text" 
                      {...customFormRegister(`rsvpfo.${i}.c_rsvp_field_options`)}/>
                      <a href="#" onClick={() => removeQuestionOption(i)} className="delete-icon mt-2 ms-2"><i className="fa fa-trash-o" /></a>                      
                    </div>
                    {errorsCustomForm.rsvpfo?.[i] && <div className="invalid-feedback">
                        {errorsCustomForm.rsvpfo?.[i]?.c_rsvp_field_options?.message}
                      </div>}
                  </div>  
                  )
                  })}    
                  {typeOptionVal && <div className="add-more">
                    <a href="#" onClick={() => addMoreQuestionOption()}><i className="fa fa-plus-circle" /> Add More</a>
                  </div>}            
                  <div className="submit-section">
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       </div>      
      {/* /Add Question Modal */}

      {/* Add Schedule Reminder Modal */}       
       <div id="schedule_reminder_modal" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Date & Time</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      <label>Select Date</label>
                      <input className="form-control" type="date" />                    
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group">
                      <label>Select Time</label>
                      <input className="form-control" type="time" />                    
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                      <label>Select Country</label>
                        <select className="form-select">
                          <option>Select Country</option>
                          <option value="checkbox">India</option>                          
                          <option value="textbox">United State</option>
                          <option value="textarea">Canada</option>
                        </select> 
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-12">
                    <div className="form-group">
                      <label>Select Timezone</label>
                        <select className="form-select">
                          <option>Select Timezone</option>                                                    
                        </select> 
                    </div>
                  </div>                  
                </div>                          
                  <div className="submit-section text-end">
                    <button  type="button" data-bs-dismiss="modal" aria-label="Close" className="min-w-btn-145 btn submit-btn">Cancel</button>
                    <button className="btn btn-primary ms-2 submit-btn" type="button">Schedule Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
       </div>      
      {/* /Add Schedule Reminder Modal */}  

      {/* Delete Basic form field Modal */}
        <div className="modal custom-modal fade" id="delete_bf_field" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete this field</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a onClick={()=>handleDeleteCFField()} className="btn btn-primary continue-btn">Delete</a>
                    </div>
                    <div className="col-6">
                      <a ref={closeModalRefDelCForm} data-bs-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* /Delete Basic form field Modal */}

      {/* Delete custom form field Modal */}
        <div className="modal custom-modal fade" id="delete_cf_question" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete this question</h3>
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
      {/* /Delete custom form field Modal */} 

      {/* Preview Custom Form Modal Start */}       
      <div id="preview_custom_form" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">PREVIEW - {formDesingTitleName} FORM</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="row">

                <div className="card">
                  <div className="card-body"> 

                  <div className="col-sm-12 col-md-12">
                    <div className="form-group text-center">                               
                      <h2 className="h2-horizontal-line"><span>RSVP</span></h2>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="form-group text-center">                               
                      <h3>{eventDetailByID.p_event_title}</h3>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="form-group text-center">                               
                    {/* <h4>March 04, 2022</h4> */}
                      <h4>{moment(rsvpSettingsPreview.rsvp_by_date).format('MMMM Do, YYYY')} &nbsp;
                      {moment(rsvpSettingsPreview.rsvp_by_time, "HH:mm").format("hh:mm A")}</h4>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="form-group text-center">                                
                      
                    <label>Please let us know if you will be able to make it.</label><br/>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" id="preview_active" defaultValue="Active" />
                      <label className="form-check-label" htmlFor="preview_active">Yes, I'll be there</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" id="preview_inactive" defaultValue="Inactive" />
                      <label className="form-check-label" htmlFor="preview_inactive">No, I can't make it</label>
                    </div>

                    </div>
                  </div>                   
                  

                    <div className="h3 card-title">                        
                      <label>CONTACT INFO</label>
                    </div>
                        
                    {formDesignPreview.map(({rsvp_field_name,rsvp_field_type,rsvp_field_options},index)=><div className="col-sm-12 col-md-12">
                      {rsvp_field_type && rsvp_field_type =='textbox' && <div className="form-group">
                        <input className="form-control" type={rsvp_field_type} placeholder={rsvp_field_name}/>                                    
                      </div>}                         
                      {rsvp_field_type && rsvp_field_type =='radio' && <div className="form-group">
                        <label>{rsvp_field_name}</label><br/>
                          {rsvp_field_options.map(item=><div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio"  id={item}/>
                            <label className="form-check-label" htmlFor={item}>{item}</label>
                          </div>)}                          
                      </div>}     
                      {rsvp_field_type && rsvp_field_type =='dropdown' && <div className="form-group">                        
                        <select className="form-select">          
                          <option value="">{rsvp_field_name}</option>                
                          {rsvp_field_options.map(item=><option value={item}>{item}</option>)}                                 
                        </select>
                      </div>}     
                      {rsvp_field_type && rsvp_field_type =='checkbox' && <div className="form-group">
                        <label>{rsvp_field_name}</label><br/>
                          {rsvp_field_options.map(item=><div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id={item}/>
                            <label className="form-check-label" htmlFor={item}>{item}</label>
                          </div>)}                          
                      </div>} 
                      {rsvp_field_type && rsvp_field_type =='textarea' && <div className="form-group">                        
                        <textarea className="form-control" placeholder={rsvp_field_name}></textarea>
                      </div>}      
                    </div>)}                  

                                                  
                  </div>                  

                </div>              
                </div>
              </div>
            </div>
          </div>
       </div>      
      {/* Preview Custom Form Modal End */}


      {/* Preview Default Email Template Modal Start */}       
      <div id="preview_default_template" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">PREVIEW - DEFAULT TEMPLATES</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="row">

                <div className="card">
                  <div className="card-body">                  
                      {dEmailTemplatePreview.map(({rsvp_subject,rsvp_body},i)=><div className="col-sm-12 col-md-12" key={i}>
                        <div className="form-group text-center">                               
                          <h3>{rsvp_subject}</h3>
                        </div>
                        <div className="form-group text-center">                               
                          <div
                            dangerouslySetInnerHTML={{
                              __html: rsvp_body
                            }}></div>
                        </div>
                        <hr/>
                      </div>)}   
                  </div>

                </div>              
                </div>
              </div>
            </div>
          </div>
      </div>
      {/* Preview Default Email Template Modal End */}

      {/* Preview Default Email Template Modal Start */}       
      <div id="preview_reminder_template" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">PREVIEW - REMINDER TEMPLATES</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <div className="row">

                <div className="card">
                  <div className="card-body">                  
                      {rEmailTemplatePreview.map(({rsvp_subject,rsvp_body},i)=><div className="col-sm-12 col-md-12" key={i}>
                        <div className="form-group text-center">                               
                          <h3>{rsvp_subject}</h3>
                        </div>
                        <div className="form-group text-center">                               
                          <div
                            dangerouslySetInnerHTML={{
                              __html: rsvp_body
                            }}></div>
                        </div>
                        <hr/>
                      </div>)}   
                  </div>

                </div>              
                </div>
              </div>
            </div>
          </div>
      </div>
      {/* Preview Default Email Template Modal End */}       
        
      </div>
        
    </div>
  )
}

export default RSVPEditForm