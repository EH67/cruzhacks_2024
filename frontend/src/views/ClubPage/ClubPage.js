import React from "react";
import PropTypes from "prop-types"; 
import './ClubPage.css'; // replace "Club" with your own component

export default class ClubPage extends React.Component { // replace "Club" with your own component
  static propTypes = { // define any props here
    name: PropTypes.string,
  };

  render() {
    return (
    <div className="cards">
      ClubPage
      {/** start your html here! (delete this whole line, including the {}) */}
    </div>
    );
  }
}