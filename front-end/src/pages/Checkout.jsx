import { Elements } from "@stripe/react-stripe-js";
import { Container } from "react-bootstrap";
import CheckoutForm from "../components/CheckoutForm";

export default function Checkout(props) {
  return (
    <div
      className="w-100"
      style={{
        backgroundColor: props.lightMode ? "white" : "#121212",
        color: props.lightMode ? "black" : "white",
      }}
    >
      <Container
        style={{
          height: "80vh",
        }}
      >
        <div className="container order__container">
          <p>show items and totals here</p>
        </div>
        <div
          className="p-3"
          style={{ backgroundColor: "lightgrey", borderRadius: "15px" }}
        >
          {props.clientSecret && (
            <Elements
              options={props.options}
              stripe={props.stripePromise}
              key={props.clientSecret}
            >
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </Container>
    </div>
  );
}
