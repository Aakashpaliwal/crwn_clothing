import React, { Fragment } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import "./sign-in-and-sign-up.style.scss";

const SignInAndSignUp = () => {
  return (
    <Fragment>
      <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
      </div>
    </Fragment>
  );
};

export default SignInAndSignUp;
