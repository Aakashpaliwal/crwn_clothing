import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";
import CustomButton from "../custom-button/custom-button.component";
import "./collection-item.style.scss";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <Fragment>
      <div className="collection-item">
        <div
          className="image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="collection-footer">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </div>
        <CustomButton inverted={true} onClick={() => addItem(item)}>
          Add To Cart
        </CustomButton>
      </div>
    </Fragment>
  );
};

const mapdispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapdispatchToProps)(CollectionItem);
