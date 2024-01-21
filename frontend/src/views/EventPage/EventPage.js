import React from "react";
import PropTypes from "prop-types"; 
import './EventPage.css'; // replace "EventPage" with your own component
import Event from './Event/Event';
import CheckBox from '../../components/CheckBox/CheckBox';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { v4 as uuidv4 } from 'uuid';
import './EventPage.css';
import {Link} from 'react-router-dom';

export default class EventPage extends React.Component { // replace "EventPage" with your own component
  static propTypes = { // define any props here
    name: PropTypes.string,
  };

  generateUuid = () => {
    return uuidv4();
  };

  render() {
    return (
    <div className="cards text-lefts px-9 mx-24">
      {/* add padding */}
        {/* <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <button type="submit">Submit</button>
        </form> */}
        {/* <div className="text-lefts p-6 m-6"> */}
          <div>
            <h1>Upload Your Event</h1>
            <p>Add you poster, flyer, picture, or social media post here.</p>
            <div>
              <Event uuid={this.generateUuid()}/>
              
              {/* <CheckBox/> */}
            </div>
            <Link to="/BoardPage">GO BACK TO SLUG BOARD</Link>
          </div>
        </div>
    );
  }
}