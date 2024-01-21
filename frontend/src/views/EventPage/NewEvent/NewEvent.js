import React, { Component } from 'react';

class NewEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        username: '',
        email: '',
        // Add more form fields as needed
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    console.log('Form data submitted:', this.state.formData);
  };

  render() {
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={this.handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={this.handleChange} />
        </label>

        {/* Add more form fields as needed */}

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default NewEvent;
