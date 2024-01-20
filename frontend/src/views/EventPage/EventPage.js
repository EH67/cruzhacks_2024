import React from "react";
import PropTypes from "prop-types"; 
import './EventPage.css'; // replace "EventPage" with your own component
import Event from './Event/Event';

export default class EventPage extends React.Component { // replace "EventPage" with your own component
  static propTypes = { // define any props here
    name: PropTypes.string,
  };

  render() {
    return (
    <div className="cards">
      <Event/>
    </div>
    );
  }
}