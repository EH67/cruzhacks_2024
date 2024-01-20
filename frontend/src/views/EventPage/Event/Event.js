import React from "react";
import PropTypes from "prop-types"; 
import testFlyer from './testFlyer.svg'; // FIXreplace "Event" with your own component

export default class Event extends React.Component { // replace "Event" with your own component
  static propTypes = { // define any props here
    name: PropTypes.string,
  };

  render() {
    return (
    <div className="Event">
      <img className="Event-img" src={testFlyer} alt="Music Poster"/>
    </div>
    );
  }
}