import React, { Fragment } from "react";
import CollectionItem from "../collection-item/collection-item.component";
import "./preview-collection.style.scss";

const PreviewCollection = ({ title, items }) => {
  return (
    <Fragment>
      <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
          {items
            .filter((item, idx) => idx < 4)
            .map((item) => (
              <Fragment>
                <CollectionItem key={item.id} item={item} />
              </Fragment>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PreviewCollection;
