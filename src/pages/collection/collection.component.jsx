import React, { Fragment } from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selector";
import "./collection.style.scss";

const Collection = ({ match, collection }, props) => {
  console.log("category", match, collection, props);
  return (
    <Fragment>
      <div className="collection-page">
        <h2 className="title">{collection.title}</h2>
        <div className="items">
          {collection.items.map((item) => {
            return <CollectionItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(Collection);
