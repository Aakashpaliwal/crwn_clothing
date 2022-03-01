import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { Component, Fragment } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.style.scss";

export class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="sign-up">
          <h2 className="title">I do not have an account</h2>
          <span>Sign Up with your email and password</span>
          <form className="group sign-up-form" onSubmit={this.handleSubmit}>
            <FormInput
              type={"text"}
              name={"displayName"}
              label={`Display Name`}
              value={this.state.displayName}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              type={"email"}
              name={"email"}
              label={`Email`}
              value={this.state.email}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              type={"password"}
              name={"password"}
              label={`Password`}
              value={this.state.password}
              handleChange={this.handleChange}
              required
            />
            <FormInput
              type={"password"}
              name={"confirmPassword"}
              label={`Confirm Password`}
              value={this.state.confirmPassword}
              handleChange={this.handleChange}
              required
            />
            <div className="buttons">
              <CustomButton type={`submit`}>Sign Up</CustomButton>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default SignUp;
