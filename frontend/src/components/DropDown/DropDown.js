import React, { useState, useEffect } from 'react';
import config from '../../config';

const apiUrl = config.apiUrl;

const DropDown = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  
  useEffect(() => {
    // Fetch options from the API
    const fetchOptions = async () => {
      try {
        const response = await fetch(apiUrl + '/AllClubs'); // Replace with your API endpoint
        const data = await response.json();
        setOptions(data['clubs']);
        console.log("All Clubs: ");
        console.log(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  const handleDropdownChange = (e) => {
    const newSelectedOption = e.target.value;
    // setSelectedOption(newSelectedOption);

    // Call the callback function to pass the selected option to the parent
    // onSelectedOptionChange(newSelectedOption);
  };

  return (
    <div>
      <h2>Dropdown with API Options</h2>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="">-- Select --</option>
          {options.map((club, index) => (
            <option key={index} value={club}>
              {club}
            </option>
          ))}
        </select>
      </label>

      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default DropDown;
