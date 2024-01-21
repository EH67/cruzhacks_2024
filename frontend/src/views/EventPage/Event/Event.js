import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from '../../../components/ImageUpload/ImageUpload';
// PARENT
const Event = () => {
  const [formData, setFormData] = useState({
    eventname: '',
    date: '',
    location: '',
    tags: [],
    filename: '',
  });

  const [allTags] = useState([
    "Arts & Crafts",
    "Food",
    "Outdoor",
    "Indoor",
    "Workshop",
    "Leisure",
  ]);

  const [getImg, setImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const apiUrl = 'http://localhost:8080/UploadEventJson/test_uuid'; // Replace with your API endpoint

      // Ensure getImg is not null before proceeding
    if (getImg) {
      // Update formData with the filename from getImg
      setFormData((prevData) => ({
        ...prevData,
        filename: getImg.name,
    }))};

      // Convert form data to JSON
      const jsonData = JSON.stringify(formData);

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
      <label>
        Event Name:
        <input type="text" name="eventname" value={formData.eventname} onChange={handleChange} />
      </label>
      <br />
      <label>
        Date:
        <input type="text" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <br />
      <label>
        Tags:
        {allTags.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={formData.tags.includes(tag)}
              onChange={() => handleCheckboxChange(tag)}
            />
            {tag}
          </label>
        ))}
      </label>
      <br />
      <i class="fas fa-upload"></i> 
      <ImageUpload selectedImage={getImg} setSelectedImage={setImg}/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Event;
