import React, { useState, useEffect } from 'react';

import config from '../../config';

const apiUrl = config.apiUrl;

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log("use effect called in ImageComponent");
        const response = await fetch('http://localhost:8080/FetchImage/12345uuid');
        const blob = await response.blob();

        // Create a data URL from the blob
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    // Fetch the image when the component mounts
    fetchImage();
  }, []);

  return (
    <div className='ImageComponent-div'>
      {imageUrl && <img src={imageUrl} alt="GCS Image" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageComponent;
