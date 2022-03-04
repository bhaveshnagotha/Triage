import React, {useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import placeholders from './../../assets/img/placeholder.jpg';

const EventView = () => {
  
    useEffect( ()=>{
        let firstload = localStorage.getItem("firstload")
        if(firstload === "true"){
            setTimeout(function() {
              window.location.reload(1)
              localStorage.removeItem("firstload")
            },1000)
        }
     });     

     $(document).ready(function(){  
      $('.select').select2({        
        minimumResultsForSearch: -1,
        width: '100%'
      });
    })

  return (
    
    <div>

      <div className="page-wrapper">

        {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Event Name</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/events">Events</Link></li>
                <li className="breadcrumb-item active">Event Details</li>
              </ul>
            </div>            
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-lg-8 col-xl-9">
            <div className="card">
              <div className="card-body">
                <div className="project-title">
                  <h5 className="card-title">Event Name</h5>                  
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at. </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at. </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title m-b-20">Uploaded Event Images</h5>
                <div className="row">
                  <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={placeholders} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={placeholders} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={placeholders} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-lg-4 col-xl-3">
                    <div className="uploaded-box">
                      <div className="uploaded-img">
                        <img src={placeholders} className="img-fluid" alt="" />
                      </div>
                      <div className="uploaded-img-name">
                        demo.png
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title m-b-20">Uploaded files</h5>
                <ul className="files-list">
                  <li>
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis"><a href="#">AHA Selfcare Mobile Application Test-Cases.xls</a></span>
                        <span className="file-author"><a href="#">John Doe</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                        <div className="file-size">Size: 14.8Mb</div>
                      </div>
                      <ul className="files-action">
                        <li className="dropdown dropdown-action">
                          <a href="" className="dropdown-toggle btn btn-link" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="">Download</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                            <a className="dropdown-item" href="">Delete</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="files-cont">
                      <div className="file-type">
                        <span className="files-icon"><i className="fa fa-file-pdf-o" /></span>
                      </div>
                      <div className="files-info">
                        <span className="file-name text-ellipsis"><a href="#">AHA Selfcare Mobile Application Test-Cases.xls</a></span>
                        <span className="file-author"><a href="#">Richard Miles</a></span> <span className="file-date">May 31st at 6:53 PM</span>
                        <div className="file-size">Size: 14.8Mb</div>
                      </div>
                      <ul className="files-action">
                        <li className="dropdown dropdown-action">
                          <a href="" className="dropdown-toggle btn btn-link" data-bs-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_horiz</i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="">Download</a>
                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#share_files">Share</a>
                            <a className="dropdown-item" href="">Delete</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
          <div className="col-lg-4 col-xl-3">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title m-b-15">Event details</h6>
                <table className="table table-striped table-border">
                  <tbody>
                    <tr>
                        <td>Date:</td>
                        <td className="text-end">21 February, 2022 </td>
                    </tr>
                    <tr>
                    <td>Location:</td>
                      <td className="text-end">Ahmedabad</td>
                    </tr>
                    <tr>
                      <td>Tickets:</td>
                      <td className="text-end">Sold 40/100</td>
                    </tr>                        
                    <tr>
                      <td>Event Type:</td>
                      <td className="text-end">FREE</td>
                    </tr>
                  </tbody>
                </table>
                <p className="m-b-5">Sold <span className="text-success float-end">40%</span></p>
                <div className="progress progress-xs mb-0">
                  <div className="progress-bar bg-success" role="progressbar" data-bs-toggle="tooltip" title="40%" style={{width: '40%'}} />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      {/* /Page Content */}     
        
      </div>
        
    </div>
  )
}

export default EventView