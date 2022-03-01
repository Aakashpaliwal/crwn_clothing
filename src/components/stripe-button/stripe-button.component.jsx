import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./stripe-button.style.scss";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51KKj1USBYQWkn281Fj6uM70enwD19LAiWKNRm6qkXm93PbWn4QGyJWjJATsRHo5XSDJUX9ge0NEpFahuQdwYuOfj00x510qi1D";

  const onToken = (token) => {
    console.log(token);
    alert("payment success");
  };

  return (
    <Fragment>
      <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing Ltd"
        billingAddress
        shippingAddress
        //   image=""
        description={`Total is $${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />
    </Fragment>
  );
};

export default StripeCheckoutButton;
