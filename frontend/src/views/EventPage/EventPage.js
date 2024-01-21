import React from "react";
import PropTypes from "prop-types"; 
import './EventPage.css'; // replace "EventPage" with your own component
import Event from './Event/Event';
import CheckBox from '../../components/CheckBox/CheckBox';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
export default class EventPage extends React.Component { // replace "EventPage" with your own component
  static propTypes = { // define any props here
    name: PropTypes.string,
  };

  

  render() {
    return (
    <div className="cards">
        {/* <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <button type="submit">Submit</button>
        </form> */}
        <div>
          <h1>Upload Your Event</h1>
          <p>Add you poster, flyer, picture, or social media post here.</p>
          <div>
            <Event/>
            
            {/* <CheckBox/> */}
          </div>
        </div>
    </div>
    );
  }
}