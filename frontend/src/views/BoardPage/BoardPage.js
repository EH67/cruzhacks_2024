import Flyer from './Flyer/Flyer';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import slug_logo from '../../images/slug_logo.svg';
import {Link} from 'react-router-dom';


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
      <nav class="navbar navbar-dark bg-dark py-3 py-lg-5">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src='/slug_logo.png'class="" alt="slug logo"></img>
          <span class="h2 ml-2">Slug Board</span>
        </a>
      </nav>
      <Link to="/EventPage">ADD NEW EVENT</Link>
      <div>
        { jsonData && Object.entries(jsonData).map(([uuid, entry]) => (
          // <Flyer key={uuid} data={{uuid, ...entry}} />
          <Flyer key={uuid} uuid={uuid} data={entry}/>

        )) }
      </div>
      <div>
          
      </div>
      {/* Add your content for the Board component */}
    </div>
  );
};

export default BoardPage;