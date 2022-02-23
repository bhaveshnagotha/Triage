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
                  <li><Link className={pathname.includes('/add-event') ?"active" :""} to="/add-event">New</Link></li>                  
                  <li><Link className={pathname.includes('/events') ?"active" :""} to="/events">Online</Link></li>
                  <li><Link to="/events">Offline</Link></li>
                  <li><Link to = "/events">Hybrid</Link></li>                  
                </ul>
              </li>
              <li className={pathname.includes('/rsvp-card') ?"active" :""}>
                <Link to="/rsvp-card"><i className="la la-ticket" /> <span> RSVP Card</span></Link>              
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
                  <li><Link className={pathname.includes('/user-role') ?"active" :""} to="/user-role">User Role</Link></li>
                                    
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