import React, { Fragment } from "react";
import Directory from "../../components/directory/directory.componeny";
import "./homepage.style.scss";

const HomePage = () => {
  return (
    <Fragment>
      <div className="homepage">
        <Directory />
      </div>
    </Fragment>
  );
};

export default HomePage;
