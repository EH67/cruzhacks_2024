import Flyer from './Flyer/Flyer';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import slug_logo from '../../images/slug_logo.svg';
import {Link} from 'react-router-dom';
import './BoardPage.css';


const BoardPage = () => {
  const [jsonData, setJsonData] = useState();
  const [eventNames, setEventNames] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/AllEvents'); // Replace with your API endpoint
        const data = await response.json();
        setJsonData(data);
        console.log("data is ");
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8080/AllEventNames'); // Replace with your API endpoint
        const data = await response.json();
        setEventNames(data);
        console.log("data2 is ");
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData2();
    fetchData();
  },[]); // The empty dependency array ensures this effect runs only once after the initial render


  // const modifiedData = Object.entries(jsonData).map(([uuid, entry]) => ({
  //   uuid,
  //   ...entry
  // }));
  return (
    <div>
      {/* <!-- Image and text --> */}
      {/* horizontal row */}
      <div className="sticky-top py-1 py-lg-3" >
        <div className="container" style={{ backgroundColor: '#003E70' }}>

          <div className="row d-flex align-items-center" >
            <div className="col float-right">
              <img src="/slug_logo.png" className="logo-img" height="150px" alt="Slug Logo"></img>
            </div>
            <div className="col float-center">
              <span className="h1 ml-2 text-left text-light">Slug Board</span>
            </div>
            <div className="col float-right text-end">
              <Link to="/EventPage">ADD NEW EVENT</Link>
            </div>
          </div>
          
        </div>
      </div>

      {/* thick padding on left and right */}
      <div className="all-flyers-div">
        { jsonData && Object.entries(jsonData).map(([uuid, entry]) => (
          // <Flyer key={uuid} data={{uuid, ...entry}} />
          <Flyer className="flyer-div" key={uuid} uuid={uuid} data={entry}/>

        )) }
      </div>
      <div>
          
      </div>
      {/* Add your content for the Board component */}
    </div>
  );
};

export default BoardPage;