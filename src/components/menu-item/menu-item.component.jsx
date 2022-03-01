import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.style.scss";

const MenuIem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <Fragment>
      {" "}
      <div
        className={`${size} menu-item`}
        onClick={() => history.push(`${match.url}${linkUrl}`)}
      >
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="content">
          <h1 className="title">{title.toUpperCase()}</h1>
          <span className="subtitle">SHOP NOW</span>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(MenuIem);
