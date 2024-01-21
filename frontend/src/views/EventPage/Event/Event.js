import React, { Component } from "react";
import PropTypes from "prop-types";

class Event extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // Create a ref for the form element
    this.formRef = React.createRef();
  }

  // convert the form to JSON
  getFormJSON = (form) => {
    const data = new FormData(form);
    return Array.from(data.keys()).reduce((result, key) => {
      result[key] = data.get(key);
      return result;
    }, {});
  };

  // handle the form submission event, prevent default form behavior, check validity, convert form to JSON
  handler = (event) => {
    event.preventDefault();
    const formElement = this.formRef.current;
    const valid = formElement.reportValidity();
    if (valid) {
      const result = this.getFormJSON(formElement);
      console.log(result);
    }
  };

  componentDidMount() {
    // add the event listener in componentDidMount
    this.formRef.current.addEventListener("submit", this.handler);
  }

  componentDidUpdate(prevProps, prevState) {
    // clean up the event listener if form element changes
    if (this.formRef.current !== prevProps.formElement) {
      this.formRef.current.removeEventListener("submit", this.handler);
      this.formRef.current.addEventListener("submit", this.handler);
    }
  }

  componentWillUnmount() {
    // remove the event listener in componentWillUnmount to avoid memory leaks
    this.formRef.current.removeEventListener("submit", this.handler);
  }

  render() {
    return (
      <div className="Event">
        {/* Attach the ref to the form element */}
        <form ref={this.formRef}>
          <p>
            <label htmlFor="name">Event Name</label>
            <input type="text" name="name" id="name" />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </p>
          <button type="submit">Submit</button>
        </form>
        {/* <ImageComponent/> */}
      </div>
    );
  }
}

export default Event;

