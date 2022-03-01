import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.style.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth, db } from "../../firebase/firebase.utils";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Header = ({ currentUser, hidden }) => {
  console.log("currentUser", currentUser);
  const getUsers = async () => {
    // const allUsers = await getDocs(collection(db, "users"));
    // console.log(
    //   "allusers",
    //   allUsers.docs.map((doc) => doc.data())
    // );
    //FETCHING CARTS OF USER
    // const docRef = await getDocs(
    //   collection(db, "users", "2lleJ5E4S63YJkKwz17u", "cartItems")
    // );
    // console.log(
    //   "docRef",
    //   docRef.docs.map((doc) => doc.data())
    // );
    // const docSnap = await getDoc(docRef);
    //FETCHING SINGLE CART ITEM
    // const docRef = doc(
    //   db,
    //   "users",
    //   "2lleJ5E4S63YJkKwz17u",
    //   "cartItems",
    //   "YsA1MFbq8fNtZCL1VjlL"
    // );
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }
  };

  useEffect(() => {
    getUsers();
  });

  return (
    <Fragment>
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="options">
          <Link className="option" to="/shop">
            SHOP
          </Link>
          <Link className="option" to="/contact">
            CONTACT
          </Link>
          {currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          ) : (
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {!hidden ? <CartDropdown /> : null}
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
