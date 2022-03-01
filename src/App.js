import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument, db } from "./firebase/firebase.utils";
import Checkout from "./pages/checkout/checkout.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sing-up/sign-in-and-sing-up.component";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log("apprp", this.props);
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      console.log("user", user);
      if (user) {
        const userRef = await createUserProfileDocument(user);
        console.log("suerref", userRef);
        onSnapshot(userRef.ref, (snap) => {
          console.log("snap", snap);
          setCurrentUser({
            currentUser: {
              id: snap.id,
              ...snap.data(),
            },
          });
        });
      } else {
        setCurrentUser(user);
      }

      // onSnapshot((snapShot) => {
      //   setCurrentUser({
      //     id: snapShot.id,
      //     ...snapShot.data(),
      //   });
      // });

      // if (userAuth) {
      //   const userRef = await createUserProfileDocument(userAuth);

      //   userRef.onSnapshot((snapShot) => {
      //     setCurrentUser({
      //       id: snapShot.id,
      //       ...snapShot.data(),
      //     });
      //   });
      // }

      // setCurrentUser(userAuth);

      //   if (user) {
      //     const userRef = await createUserProfileDocument(user);
      //     onSnapshot(collection(db, "users"), (snapshot) => {
      //       snapshot.docs.map((doc) => {
      //         this.props.setCurrentUser({
      //           id: doc.id,
      //           ...doc.data(),
      //         });
      //         doc.data();
      //       });

      //       // console.log(
      //       //   "snapshot",
      //       //   snapshot.docs[0].data()
      //       //   // snapshot.docs.map((doc) => doc.data())
      //       // );
      //       //setPosts(snapshot.docs.map(doc => doc.data()));
      //     });

      //     // this.setState({ currentUser: user });
      //     // onSnapshot(userRef, (snapshot) => {
      //     //   console.log("snapshot", snapshot);
      //     //   // this.setState({
      //     //   //   currentUser: {
      //     //   //     id: snapshot.id,
      //     //   //     ...snapshot,
      //     //   //   },
      //     //   // });
      //     // });
      //   } else {
      //     this.props.setCurrentUser(user);
      //   }
      //   // await createUserProfileDocument(user);
      //   // if (user) {
      //   //   console.log("user", user);
      //   //   this.setState({
      //   //     currentUser: user,
      //   //   });
      //   // } else {
      //   //   console.log("no user");
      //   //   this.setState({
      //   //     currentUser: null,
      //   //   });
      //   // }
      // });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" exact component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapdispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(mapStateToProps, mapdispatchToProps)(App));
