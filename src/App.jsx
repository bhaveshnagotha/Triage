
import React from 'react'
import Layout from './Pages/Layout/Layout'
import Login from './Pages/Login/login'
import Dashboard from './Pages/Dashboard/dashboard'

import { Routes, Route } from 'react-router-dom'
import EventList from './Pages/Events/event-list'
import AddEvent from './Pages/Events/add-event'
import EventView from './Pages/Events/event-view'
import PostEvent from './Pages/Post-Event/post-event'
import EmailBuilder from './Pages/Email-Builder/email-builder'
import Connections from './Pages/Connections/connections'
import UserList from './Pages/Users/user-list'
import UserRoles from './Pages/Users/user-roles'
import Profile from './Pages/Profile/profile'
import RSVPForm from './Pages/RSVP/rsvp-form'
import RSVPList from './Pages/RSVP/rsvp-list'
import CompanyList from './Pages/Company/company-list'
import Register from './Pages/Register/register'
import Rsvp from './front/rsvp-form/rsvp'
import Rsvp2 from './front/rsvp-form/rsvp-2'
import Rsvp3 from './front/rsvp-form/rsvp-3'
import EventType from './Pages/Masters/event-type'
import UserType from './Pages/Masters/user-type'
import EditEvent from './Pages/Events/edit-event'
import RSVPEditForm from './Pages/RSVP/rsvp-form-edit'
import Participants from './Pages/Masters/participants'
import RsvpAttendee from './front/rsvp-form/rsvp-attendee'

function App() {
    return ( 
        <Routes>            
            <Route path="/" exact element={<Layout/>} > 
                <Route path="/" element={<Dashboard />}/>
                <Route path="/dashboard" element={<Dashboard />}/>

                {/* Events */}
                <Route path="/add-event" element={<AddEvent/>}/> 
                <Route path="/edit-event/:id" element={<EditEvent/>}/> 
                <Route path="/events" element={<EventList />}/>
                <Route path="/event-view/:id" element={<EventView/>}/>

                {/* RSVP Card */}
                <Route path="/rsvp-form" element={<RSVPForm/>}/>
                <Route path="/rsvp-form-edit/:id" element={<RSVPEditForm/>}/>
                <Route path="/rsvp-list" element={<RSVPList/>}/>

                {/* Post Event */}
                <Route path="/post-event" element={<PostEvent/>}/>

                {/* Email Builder */}
                <Route path="/email-builder" element={<EmailBuilder/>}/>

                {/* Connections */}
                <Route path="/Connections" element={<Connections/>}/>

                {/* Users */}
                <Route path="/user-list" element={<UserList/>}/>
                <Route path="/user-roles" element={<UserRoles/>}/>

                {/* Company */}
                <Route path="/company-list" element={<CompanyList/>}/>

                <Route path="/profile" element={<Profile/>}/>

                {/* Masters */}
                
                <Route path="/user-type" element={<UserType/>}/>
                <Route path="/event-type" element={<EventType/>}/>
                <Route path="/participants" element={<Participants/>}/>
                
                
                


            </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />          

            {/* Front RSVP Form */}  
            <Route path="/rsvp/:id" element={<Rsvp/>} />
            <Route path="/rsvp-attendee-form/:id" element={<RsvpAttendee/>} />          
            <Route path="/rsvp-2" element={<Rsvp2/>} />
            <Route path="/rsvp-3" element={<Rsvp3/>} />
        </Routes>
    );
}

export default App;
