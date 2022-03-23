/* eslint-disable no-unused-vars */
import React, {useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
//import {User,Avatar_19,Avatar_07,Avatar_06,Avatar_14} from '../../../Entryfile/imagepath.jsx'

import {BarChart,Bar, Cell,ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
  //import "../../index.css"  
  
  const barchartdata = [
    { y: '2006', "Total Income" : 100, 'Total Outcome' : 90 },
    { y: '2007', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2008', "Total Income" : 50,  'Total Outcome' : 40 },
    { y: '2009', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2010', "Total Income" : 50,  'Total Outcome' : 40 },
    { y: '2011', "Total Income" : 75,  'Total Outcome' : 65 },
    { y: '2012', "Total Income" : 100, 'Total Outcome' : 90 }
  ];
  const linechartdata = [
    { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
    { y: '2007', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2008', "Total Sales": 50,  'Total Revenue': 40 },
    { y: '2009', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2010', "Total Sales": 50,  'Total Revenue': 40 },
    { y: '2011', "Total Sales": 75,  'Total Revenue': 65 },
    { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
  ];

const Dashboard = () => {

    useEffect( ()=>{
        let firstload = localStorage.getItem("firstload")
        if(firstload === "true"){
            setTimeout(function() {
              window.location.reload(1)
              localStorage.removeItem("firstload")
            },1000)
        }        
     },[]);

  return (
    <div>
        <div className="page-wrapper">
             <Helmet>
                    <title>Dashboard - HRMS Admin Template</title>
                    <meta name="description" content="Dashboard"/>					
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Welcome Super Admin!</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          
          
        </div>
        {/* /Page Content */}
    </div>

    </div>
  )
}

export default Dashboard