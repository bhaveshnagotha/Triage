/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

const LeftSideBar = () => {  
  const location = useLocation();
  let pathname = location.pathname  
  return (
    <>
         <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              {/* <li className="menu-title"> 
                <span>Main</span>
              </li> */}
              <li className={pathname.includes('/dashboard') ?"active" :""}>
                <Link to="/dashboard"><i className="la la-dashboard" /> <span> Dashboard</span></Link>              
              </li>
              <li className="submenu">
                <a href="#"><i className="la la-bookmark-o" /> <span> Events</span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><Link className={pathname.includes('/add-event') ?"active" :""} to="/add-event">Create Event</Link></li>                  
                  <li><Link className={pathname.includes('/events') ?"active" :""} to="/events">Event List</Link></li>                  
                </ul>
              </li>

              <li className="submenu">
                <a href="#"><i className="la la-ticket" /> <span> RSVP</span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><Link className={pathname.includes('/rsvp-form') ?"active" :""} to="/rsvp-form">Form Design</Link></li>                  
                  <li><Link className={pathname.includes('/rsvp-list') ?"active" :""} to="/rsvp-list">Lists</Link></li>
                                    
                </ul>
              </li>              
              <li className={pathname.includes('/post-event') ?"active" :""}>
                <Link to="/post-event"><i className="la la-ticket" /> <span> Post Event</span></Link>              
              </li>
              <li className={pathname.includes('/email-builder') ?"active" :""}>
                <Link to="/email-builder"><i className="la la-ticket" /> <span> Email Builder</span></Link>              
              </li>
              <li className={pathname.includes('/connections') ?"active" :""}>
                <Link to="/connections"><i className="la la-ticket" /> <span> Connections</span></Link>              
              </li>

              <li className="submenu">
                <a href="#"><i className="la la-user-plus" /> <span> Users</span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><Link className={pathname.includes('/user-list') ?"active" :""} to="/user-list">User List</Link></li>
                </ul>
              </li>
            
              <li className="submenu">
                <a href="#"><i className="la la-files-o" /> <span> Masters</span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><Link className={pathname.includes('/company-list') ?"active" :""} to="/company-list">Company</Link></li>                  
                  <li><Link className={pathname.includes('/user-roles') ?"active" :""} to="/user-roles">User Roles</Link></li>
                  <li><Link className={pathname.includes('/user-type') ?"active" :""} to="/user-type">User Types</Link></li>
                  
                  <li><Link className={pathname.includes('/event-type') ?"active" :""} to="/event-type">Event Types</Link></li>
                  <li><Link className={pathname.includes('/participants') ?"active" :""} to="/participants">Participant List</Link></li>
                                    
                </ul>
              </li>
              
              
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSideBar