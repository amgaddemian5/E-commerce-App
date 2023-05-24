import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const KEY =
  "pk_test_51LTQ1RINjymeNKJjIdJO559bul2hnKJXvCwPc1LDfEdYmlLOM0OZpa7KJFVhnLf0BuSXEngxJPZV9AgHhwMFMqyz00v0eEcs2T";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        history.push("/success");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing. Please Wait....</span>
      ) : (
        <StripeCheckout
          name="SHOPIFY"
          image="https://image.pngaaa.com/770/585770-middle.png"
          billingAddress
          shippingAddress
          description="Your total is 20$"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "red",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
