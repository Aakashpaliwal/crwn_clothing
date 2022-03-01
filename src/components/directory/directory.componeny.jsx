import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import MenuIem from "../menu-item/menu-item.component";
import { selectDirectorySection } from "./directory.selector";
import "./directory.style.scss";

export class Directory extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <div className="directory-menu">
          {this.props.sections.map(({ id, title, imageUrl, linkUrl, size }) => (
            <MenuIem
              key={id}
              title={title}
              imageUrl={imageUrl}
              size={size}
              linkUrl={linkUrl}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection,
});

export default connect(mapStateToProps)(Directory);
