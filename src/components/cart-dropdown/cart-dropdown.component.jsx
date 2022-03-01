import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.style.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <Fragment>
      <div className="cart-dropdown">
        <div className="cart-items">
          {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <span className="empty-message">Your cart is Emapty</span>
          )}
        </div>
        <CustomButton
          onClick={() => {
            history.push("/checkout");
            dispatch(toggleCartHidden());
          }}
        >
          GO TO CHECKOUT
        </CustomButton>
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
