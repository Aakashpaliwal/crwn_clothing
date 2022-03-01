import { signInWithEmailAndPassword } from "firebase/auth";
import React, { Component, Fragment } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.style.scss";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("loginrror", error);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="sign-in">
          <h2>I already have an account</h2>
          <span>Sign In with your email and password</span>

          <form onSubmit={this.handleSubmit} className="group">
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
            <div className="buttons">
              <CustomButton type={`submit`}>Sign In</CustomButton>
              <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>
                Sign In With Google
              </CustomButton>
            </div>
            {/* <input type={`submit`} value={"Submit"} /> */}
            {/* <button>Sign In</button> */}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default SignIn;
