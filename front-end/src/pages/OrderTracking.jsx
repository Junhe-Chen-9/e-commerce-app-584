import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
export default function OrderTracking() {
  const [flag, setFlag] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const [formData, setFormData] = useState({
    trackingId: "",
  });

  function handleChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    var data = formData.trackingId;
    var config = {
      method: "post",
      url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/order/get",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFlag(true);
        setOrderDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (flag) {
    return (
      <div className="container tracking__container">
        <Container
          className="d-md-flex"
          style={{
            minHeight: "80vh",
          }}
        >
          <div className="d-flex w-100 w-md-50 flex-column text-start p-md-5 p-3 my-3 me-md-4 ">
            <h1>
              {orderDetail.email} <br />
              Total:{" $"}
              {(orderDetail.total / Math.pow(10, 2)).toLocaleString("en-us", {
                minimumFractionDigits: 2,
              })}{" "}
              <br />
              Shipping to {orderDetail.address}
            </h1>
            {orderDetail.products.map((item) => {
              return (
                <div
                  className="d-flex align-items-center border rounded my-1"
                  style={{ minWidth: "250px" }}
                >
                  {item.image_url.length !== 0 ? (
                    <img
                      className="m-2"
                      src={item.image_url[0]}
                      alt="product"
                      style={{ width: 60, height: 60 }}
                    />
                  ) : (
                    <img
                      src="https://www.nicepng.com/png/detail/207-2070432_white-background-url.png"
                      alt="product"
                      style={{ width: 30 }}
                    />
                  )}
                  <p className="mt-2" style={{ fontSize: 12 }}>
                    {item.productName} <br />${" "}
                    {(item.price / Math.pow(10, 2)).toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="container tracking__container">
      <Form className="py-3" onSubmit={handleSubmit} noValidate>
        <Form.Group
          required
          className="mb-3"
          controlId="trackingId"
          onChange={handleChange}
          value={formData.trackingId}
        >
          <Form.Label>Tracking ID</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
          <Form.Control.Feedback type="invalid">
            Please check your tracking ID is valid
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
