/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
//import React, { useState,useEffect } from "react";
//import { withRouter } from 'react-router-dom';
import { Link,useNavigate } from 'react-router-dom';
//import { Helmet } from "react-helmet";
import logo from './../../../assets/img/logo.png';
import avatar21 from './../../../assets/img/profiles/avatar-21.jpg';

// import  lnEnglish from './../../../assets/img/flags/us.png';
// import  lnFrench from './../../../assets/img/flags/fr.png';
// import  lnSpanish from './../../../assets/img/flags/es.png';
// import  lnGerman from './../../../assets/img/flags/de.png';

import AuthService from "../../../Services/auth.service";

const Header = () => {   
  
  const navigate  = useNavigate();
  const [userid,setUserId] = useState(null);
  const [token,setToken] = useState(null);

  
  const getCurrentUserVal = ()=>{
    var currentUserData = AuthService.getCurrentUser();    
    
    if(currentUserData){
      if(currentUserData.usertypeid && currentUserData.id_session){
        setUserId(currentUserData.usertypeid);
        setToken(currentUserData.id_session)
      }      
    }
    
  }
  
  // console.log(token)
  // if(userid == null && token == null){
  //   navigate("/login");
  // }

  const logout = ()=>{
    AuthService.logout()
    navigate("/login");
  }  
  useEffect( ()=>{      
    //console.log(userid)  
    getCurrentUserVal()    
  },[]);
  //console.log(userid) 
  
  return (
    <>
        <div className="header" style={{right:"0px"}}>
        {/* Logo */}
        <div className="header-left">
          <Link to="/dashboard" className="logo">
            <img src={logo} width={40} height={40} alt="" />
          </Link>
        </div>
        {/* /Logo */}
        <a id="toggle_btn" href="#">
          <span className="bar-icon"><span />
            <span />
            <span />
          </span>
        </a>
        {/* Header Title */}
        <div className="page-title-box">
          <h3>Corporate Event Management Solutions</h3>
        </div>
        {/* /Header Title */}
        <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
        {/* Header Menu */}
        <ul className="nav user-menu">          
          {/* Flag */}
          {/* <li className="nav-item dropdown has-arrow flag-nav">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">
              <img src={lnEnglish} alt="" height={20} /> <span>English</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
            <a href="" className="dropdown-item">
                    <img src={lnEnglish} alt="" height={16} /> English
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnFrench} alt="" height={16} /> French
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnSpanish} alt="" height={16} /> Spanish
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnGerman} alt="" height={16} /> German
                  </a>
            </div>
          </li> */}
          {/* /Flag */}
          {/* Notifications */}
          {/* <li className="nav-item dropdown">
            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
              <i className="fa fa-bell-o" /> <span className="badge badge-pill">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="" className="clear-noti"> Clear All </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                          <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                          <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                          <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                          <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src="" />
                        </span>
                        <div className="media-body">
                          <p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
                          <p className="noti-time"><span className="notification-time">2 days ago</span></p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link onClick={()=>localStorage.setItem("minheight","true")} to="/app/administrator/activities">View all Notifications</Link>
              </div>
            </div>
          </li> */}
          {/* /Notifications */}
          {/* Message Notifications */}
          {/* <li className="nav-item dropdown">
            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
              <i className="fa fa-comment-o" /> <span className="badge badge-pill">8</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Messages</span>
                <a href="" className="clear-noti"> Clear All </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src="" />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Richard Miles </span>
                          <span className="message-time">12:28 AM</span>
                          <div className="clearfix" />
                          <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src="" />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">John Doe</span>
                          <span className="message-time">6 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src="" />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author"> Tarah Shropshire </span>
                          <span className="message-time">5 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src="" />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">Mike Litorus</span>
                          <span className="message-time">3 Mar</span>
                          <div className="clearfix" />
                          <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="notification-message">
                    <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src="" />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author"> Catherine Manseau </span>
                          <span className="message-time">27 Feb</span>
                          <div className="clearfix" />
                          <span className="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link onClick={()=>localStorage.setItem("minheight","true")} to="/conversation/chat">View all Messages</Link>
              </div>
            </div>
          </li> */}
          {/* /Message Notifications */}
          <li className="nav-item dropdown has-arrow main-drop">
            <a href="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown">
              <span className="user-img me-1"><img src={avatar21} alt="" />
                <span className="status online" /></span>
              <span>Super Admin</span>
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/profile">My Profile</Link>              
              { userid != null && token != null &&<Link onClick={logout} className="dropdown-item" to="/login">Logout</Link> }
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="/app/profile/employee-profile">My Profile</Link>
            <Link className="dropdown-item" to="/settings/companysetting">Settings</Link>
            { userid != null && token != null &&<Link onClick={logout} className="dropdown-item" to="/login">Logout</Link> }
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
        </>
  )
}

export default Header