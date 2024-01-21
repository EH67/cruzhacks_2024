import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
import DropDown from '../../../components/DropDown/DropDown';
import config from '../../../config';
import './Event.css';
import Popup from '../../../components/Popup/Popup';

const apiUrl = config.apiUrl;

// PARENT
const Event = ({uuid}) => {
  const [formData, setFormData] = useState({
    eventname: '',
    date: '',
    location: '',
    tags: [],
    // filename: '',
  });

  const [allTags] = useState([
    "Arts & Crafts",
    "Food",
    "Outdoor",
    "Indoor",
    "Workshop",
    "Leisure",
    "Culture",
    "Fitness",
    "Academics",
    "Music"
  ]);

  const [getImg, setImg] = useState(null);
  // drop
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleChange = (e) => {
    // const [name, value] = useState([]);
    const { name, value } = e.target;
    // if (getImg == null) {
    //   // Update formData with the filename from getImg
    // //   setFormData((prevData) => ({
    // //     ...prevData,
    // //     filename: getImg.name,
    // // }))
    // return alert('empty image')
    // if (name === "date") {
    //   value = value.replace(value.replace(/(\d{2})(?=\d)/g, '$1/'))
    // }
  // };
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };

  const handleDateChange = (e) => {
    // const [name, value] = useState([]);
    const { name, value } = e.target;
    // if (getImg == null) {
    //   // Update formData with the filename from getImg
    // //   setFormData((prevData) => ({
    // //     ...prevData,
    // //     filename: getImg.name,
    // // }))
    // return alert('empty image')
    // if (name === "date") {
    //   value = value.replace(value.replace(/(\d{2})(?=\d)/g, '$1/'))
    // }
  // };
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };
  const handleCheckboxChange = (tag) => {
    setFormData((prevData) => {
      const tags = prevData.tags.includes(tag)
        ? prevData.tags.filter((item) => item !== tag)
        : [...prevData.tags, tag];
      return {
        ...prevData,
        tags,
      };
    });
  };

  const uploadFile = async (file) => {
    try {
      const url = `${apiUrl}/UploadImage/${uuid}`; // Replace with your API endpoint
  
      // Make the POST request using axios
      const response = await axios.post(url, file, {
        headers: {
          'Content-Type': getImg.type, // Set the content type based on your server's requirement
        }
      });
  
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(getImg)
    try {
      const apiUrl = `http://localhost:8080/UploadEventJson/${uuid}`; // Replace with your API endpoint

      // Ensure getImg is not null before proceeding
      if (getImg == null) {
          // Update formData with the filename from getImg
        //   setFormData((prevData) => ({
        //     ...prevData,
        //     filename: getImg.name,
        // }))
        setIsPopupOpen(false);
        return alert('empty image');
      };

      if (formData === null) {
        setIsPopupOpen(false);
        return alert('No form data');
      }

      if (formData['eventname'] === '') {
        setIsPopupOpen(false);
        return alert('No event name given');
      }

      if (formData['date'] === '') {
        setIsPopupOpen(false);
        return alert('No date given');
      }

      uploadFile(getImg);

      // handleOpenPopup();

      // Convert form data to JSON
      // const jsonData = JSON.stringify(formData);
      const jsonData = JSON.stringify({
        ...formData,
        filename: getImg.name,
        type: getImg.type,
        club_or_affiliation: selectedOption,
    });

      // Send JSON data to the API using Axios
      const response = await axios.post(apiUrl, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data);

      
      
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      {/* column one starts here> */}
      {/* add padding */}
      <div className="row">
        {/* column one starts here> */}
        {/*  align-items-center ceters it vertically */}
        <div className="col d-flex justify-content-between align-items-center">
          {/* grey rectangle */}
          <div className="card rounded-20 pt-3" width="100%" style={{ backgroundColor: '#D9D9D9' }}>
            <div className="card-body pt-5 mt-5">
              <ImageUpload selectedImage={getImg} setSelectedImage={setImg} uuid={uuid}/>
            <br />
            <br />
            </div>
          </div>
        </div>
        <br />

      
        {/* column two starts here */}
        <div className="col-md-6 text-left">
          
          <div className="form-group">  
            <label className="required">Event Name</label>
            <br />
            <input type="text" name="eventname" value={formData.eventname} onChange={handleChange} />
          </div>  
          
          <div className="form-group">
            <label className="required">Date</label>
            <br />
            <input type="text" name="date" value={formData.date} onChange={handleDateChange} />
          </div>
          
          <div className="form-group">
            <label className="required">Location</label>
            <br />
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          <br />

          <div className="form-group">
            <label>Organization Affiliation</label>
            <br />
            <DropDown selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={options} setOptions={setOptions}/>
          </div>
          <br />


          <div className="form-group">
            <label>Tags</label>
            <br />
            {allTags.map((tag) => (
              <div key={tag} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={formData.tags.includes(tag)}
                  onChange={() => handleCheckboxChange(tag)}
                />
                <label className="form-check-label ml-auto">{tag}</label>
              </div>
            ))}
          </div>
          <br />
          <div className="">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#003E70' }} onClick={handleOpenPopup}>Submit</button>
            {isPopupOpen && (
              <Popup onClose={handleClosePopup}>
              <div class="text-center">
                <img
                  src="/slug_logo.png"
                  className={isPopupOpen ? 'slug-animated' : ''}
                  height="400vm"
                  animation-name="wiggle"
                  animation-duration="infinite"
                  alt="Slug Logo"
                />
                <p>Thank you for sharing an Event. </p>
                <p>Close popup to see newest selection of events.</p>  
                <br />
                <br />
                <p>The Banana Slug of the Board says 💙 you!</p>  
              </div>
            </Popup>
            )}
          </div>
        </div>

      </div>
    </form>
  );
};

export default Event;
