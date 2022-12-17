import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);

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
    console.log("Submitted!");
    axios
      .post(
        "https://themillenniumfalcon.junhechen.com/584final/api/v1/user/register",
        {
          firstName: `${formData.firstName}`,
          lastName: `${formData.lastName}`,
          email: `${formData.email}`,
          password: `${formData.password}`,
          displayName: `${formData.firstName} ${formData.lastName}.`,
        }
      )
      .then((res) => {
        console.log(res);
        setIsRegistered(true);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // error.request is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  return (
    <Container
      fluid
      style={{
        backgroundColor: props.lightMode ? "white" : "#121212",
        color: props.lightMode ? "black" : "white",
      }}
    >
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="p-5 m-5 border shadow rounded w-50"
          style={{ minWidth: 400 }}
        >
          <h1 className="w-100 text-center">Register</h1>
          {isRegistered === false ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="firstName"
                value={formData.firstName}
                onChange={handleChange}
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="Enter First Name" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="lastName"
                value={formData.lastName}
                onChange={handleChange}
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Enter Last Name" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="email"
                value={formData.email}
                onChange={handleChange}
              >
                <Form.Label>Email</Form.Label>
                <Form.Control type="Email" placeholder="name@example.com" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="password"
                value={formData.password}
                onChange={handleChange}
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            <div className="text-center p-4">
              <h4>
                Please confirm your account through email and then{" "}
                <Link to="/comp584_final_project/login">log in</Link>
              </h4>
            </div>
          )}
        </div>
      </Container>
    </Container>
  );
}
