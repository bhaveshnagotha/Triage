
import React from 'react'
import Layout from './Pages/Layout/Layout'
import Login from './Pages/Login/login'
import Dashboard from './Pages/Dashboard/dashboard'

import { Routes, Route } from 'react-router-dom'
import EventList from './Pages/Events/event-list'
import AddEvent from './Pages/Events/add-event'
import EventView from './Pages/Events/event-view'
import RSVPCard from './Pages/RSVP-Card/rsvp-card'
import PostEvent from './Pages/Post-Event/post-event'
import EmailBuilder from './Pages/Email-Builder/email-builder'
import Connections from './Pages/Connections/connections'
import UserList from './Pages/Users/user-list'



function App() {
    return ( 
        <Routes>            
            <Route path="/" exact element={<Layout/>} > 
                <Route path="/dashboard" element={<Dashboard />}/>

                {/* Events */}
                <Route path="/add-event" element={<AddEvent/>}/> 
                <Route path="/events" element={<EventList />}/>
                <Route path="/event-view" element={<EventView/>}/>

                {/* RSVP Card */}
                <Route path="/rsvp-card" element={<RSVPCard/>}/>

                {/* Post Event */}
                <Route path="/post-event" element={<PostEvent/>}/>

                {/* Email Builder */}
                <Route path="/email-builder" element={<EmailBuilder/>}/>

                {/* Connections */}
                <Route path="/Connections" element={<Connections/>}/>

                {/* Users */}
                <Route path="/user-list" element={<UserList/>}/>
                


            </Route>
            <Route path="/login" element={<Login/>} />            
        </Routes>
    );
}

export default App;
