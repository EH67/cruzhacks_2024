import React from "react";
import PropTypes from "prop-types"; 
import testFlyer from './testFlyer.svg'; // FIXreplace "Event" with your own component
import ImageComponent from "../../../components/ImageComponent/ImageComponent";

export default class Event extends React.Component { // replace "Event" with your own component
  static propTypes = { // define any props here
    name: PropTypes.string,
  };

  render() {
    return (
    <div className="Event">

      {/* <img className="Event-img" src={testFlyer} alt="Music Poster"/> */
          <form>
          <p>
              <label for="name">Event Name</label>
              <input type="text" name="name" id="name" />
          </p>
          <p>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" />
          </p>
          <button type="submit">Submit</button>
          </form>
      }
      <ImageComponent/>
    </div>
    );
  }
}