import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../src/assets/css/font-awesome.min.css';
import '../src/assets/css/line-awesome.min.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../src/assets/css/bootstrap.min.css";



// Custom Style File

//import '../src/assets/js/jquery-3.2.1.min.js';
//import "../src/assets/js/jquery-ui.min.js";
import "../src/assets/js/multiselect.min.js";
//import '../src/assets/js/bootstrap.bundle.js';
import '../src/assets/css/select2.min.css';

//import '../src/assets/js/popper.min.js';
import '../src/assets/js/app.js';
import '../src/assets/js/select2.min.js';


import '../src/assets/js/jquery.slimscroll.min.js';

//import "../src/assets/js/bootstrap-datetimepicker.min.js";

import "../src/assets/js/task.js";

import "../src/assets/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css";
import "../src/assets/css/bootstrap-datetimepicker.min.css";
import '../src/assets/css/style.css';



ReactDOM.render( 
    <React.StrictMode>
       <BrowserRouter>
            <App />
       </BrowserRouter> 
    </React.StrictMode>,
    document.getElementById('root')
);
