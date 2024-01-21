import React from "react";
import PropTypes from "prop-types"; 
import './EventPage.css'; // replace "EventPage" with your own component
import Event from './Event/Event';
import NewEvent from './NewEvent/NewEvent';
import NewNewEvent from "./NewNewEvent/NewNewEvent";

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
          <h1>New Event</h1>
          <div><NewEvent/></div>
          <div><NewNewEvent/></div>
        </div>
    </div>
    );
  }
}