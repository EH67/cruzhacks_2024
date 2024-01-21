import React from 'react';
import ImageComponent from '../../../components/ImageComponent/ImageComponent';

const Flyer = ({uuid, data}) => {
    const hardcoded_json = {
        "club_or_affiliation": null,
        "date": "1",
        "eventname": "1",
        "filename": "zero waste_sustainability office_2022.png",
        "flyer": "gs://cruzhack-24.appspot.com/bc11f326-5258-4ae1-831d-3188969f74f1.png",
        "location": "1",
        "social_link": null,
        "tags": [],
        "time": null,
        "type": "image/png",
        "uuid": "bc11f326-5258-4ae1-831d-3188969f74f1",
        "image_api_url": "http://localhost:3000/FetchImage/bc11f326-5258-4ae1-831d-3188969f74f1"
          
    };

  return (
    <div>
      <h2>Flyer</h2>
      {/* <ImageComponent uuid={hardcoded_json.uuid}/> */}
      <ImageComponent uuid={uuid}/>
      
    </div>
  );
};

export default Flyer;