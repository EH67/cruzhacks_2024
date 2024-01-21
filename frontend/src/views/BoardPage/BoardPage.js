import Flyer from './Flyer/Flyer';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import slug_logo from '../../images/slug_logo.svg';
import {Link} from 'react-router-dom';
import './BoardPage.css';


const BoardPage = () => {
  const [jsonData, setJsonData] = useState();
  // const [eventNames, setEventNames] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/NewAllEvents'); // Replace with your API endpoint
        const data = await response.json();
        setJsonData(data.events);
        console.log("data is ");
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // const fetchData2 = async () => {
    //   try {
    //     const response = await fetch('http://localhost:8080/AllEventNames'); // Replace with your API endpoint
    //     const data = await response.json();
    //     setEventNames(data);
    //     console.log("data2 is ");
    //     console.log(data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // fetchData2();
    fetchData();
  },[]); // The empty dependency array ensures this effect runs only once after the initial render


  // const modifiedData = Object.entries(jsonData).map(([uuid, entry]) => ({
  //   uuid,
  //   ...entry
  // }));
  return (
    <div>
      {/* Navbar */}
      <div className="sticky-top rounded-30 py-0 py-lg-1" style={{ backgroundColor: '#003E70' }} >
        <div className="container rounded-30">

          {/* row1 */}
          <div className="row d-flex align-items-center rounded-10">
            <div className="col float-right pl-5">
              <img src="/slug_logo.png" className="logo-img" height="150px" alt="Slug Logo"></img>
            </div>
            <div className="col float-left">
              <span className="h1 ml-2 text-left text-light title-name" font-size="large">Slug Board</span>
            </div>
            <div className="ml-auto pr-5 mr-5">
              <Link to="/EventPage" className="btn btn-light">Add Event</Link>
            </div>
          </div>

          {/* row2 */}
          <div className="row text-center"></div>
          <div className="row text-center">
            <span className="p1 text-center text-light title-name" >Slugs for the fun! Stay up to date on upcoming events!</span>
          </div>
          <div className="row text-center"></div>
        </div>
      </div>

      <div className="all-flyers-div">
        { jsonData && Object.entries(jsonData).map(([index, entry]) => (
          // <Flyer key={uuid} data={{uuid, ...entry}} />
          <Flyer className="flyer-div" key={index} uuid={entry && entry.uuid} data={entry}/>

        )) }
      </div>
      <div>
          
      </div>
      {/* Add your content for the Board component */}
    </div>
  );
};

export default BoardPage;