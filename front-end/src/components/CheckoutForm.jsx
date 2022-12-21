import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState();
  const [email, setEmail] = useState("");
  //const [orderTracking, setOrderTracking] = useState("");

  //idk when to call thsi function
  function placeOrder() {
    let temp = [];
    props.cartItems.forEach((element) => {
      let tempObj = {
        imageUrl: element.image_url[0],
        unitPrice: element.price,
        productId: element.id,
      };
      temp.push(tempObj);
    });
    var data = JSON.stringify({
      email: email,
      address: `${address.line1}, ${address.city}, ${address.state} ${address.postal_code}`,
      orderTotal: props.cartItems.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.price),
        0
      ),
      itemList: temp,
    });
    console.log(`placed order: ${data}`);
    var config = {
      method: "post",
      url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/order/placeOrder",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        //setOrderTracking(response.data);
        alert("your tracking id is " + response.data);
        props.resetCart();
        if (sessionStorage.getItem("userName") !== undefined) {
          props.clearUserCart();
          props.updateUserCart();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    // const clientSecret = props.key;

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `https://localhost:3000/`,
        },
        redirect: "if_required",
      })
      .then(function (response) {
        console.log(response);

        placeOrder();
        navigate("/tracking");
      })
      .catch(function (error) {
        console.log(error);
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
          window.alert(message);
        }
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
      />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Payment</Accordion.Header>
          <Accordion.Body>
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Shipping</Accordion.Header>
          <Accordion.Body>
            <AddressElement
              onChange={(event) => {
                if (event.complete) {
                  // Extract potentially complete address
                  const address = event.value.address;
                  setAddress(address);
                  console.log(address);
                }
              }}
              options={{
                mode: "shipping",
                defaultValues: {
                  name: "Jane Doe",
                  allowedCountries: ["US"],
                  blockPoBox: true,
                  address: {
                    line1: "354 Oyster Point Blvd",
                    city: "South San Francisco",
                    state: "CA",
                    postal_code: "94080",
                    country: "US",
                  },
                },
              }}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <button
        className="checkout-button mt-2"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        // onClick={() => {
        //   placeOrder();
        // }}
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
