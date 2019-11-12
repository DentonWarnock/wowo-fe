import React, { Component } from 'react';
import { MDBInput, MDBBtn } from "mdbreact";
import '../App.css';

export class WasherSignUpPersonal extends Component {
  render() {
    const { values, handleChange } = this.props;
    const nextBtn = evt => {
      evt.preventDefault();
      this.props.nextStep()
    };

    return (
      <span>
        <form onSubmit={nextBtn}>
          <MDBInput
            name="firstName"
            type="text"
            onChange={handleChange('firstName')}
            label="First Name"
            value={values.firstName}
            required
          />
          <MDBInput
            name="lastName"
            type="text"
            onChange={handleChange('lastName')}
            label="Last Name"
            value={values.lastName}
            required
          />
          <MDBInput
            name="email"
            type="email"
            onChange={handleChange('email')}
            label="Email"
            value={values.email}
            required
          />
          <MDBInput
            name="password"
            type="password"
            onChange={handleChange('password')}
            label="Password"
            value={values.password}
            required
          />
          <MDBBtn type="submit" color="info">Continue</MDBBtn>
        </form>
      </span>
    );
  }
};

export default WasherSignUpPersonal;