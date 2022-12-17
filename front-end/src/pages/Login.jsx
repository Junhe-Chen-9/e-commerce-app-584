import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    let text = `${formData.email}:${formData.password}`;
    let encoded = window.btoa(text);

    var config = {
      method: "post",
      url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/login",
      headers: {
        "Content-Type": "text/plain",
      },
      data: encoded,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        sessionStorage.setItem(
          "sessionId",
          JSON.stringify(response.data.sessionId)
        );
        sessionStorage.setItem(
          "displayName",
          JSON.stringify(response.data.displayName)
        );
        sessionStorage.setItem(
          "userName",
          JSON.stringify(response.data.userName)
        );
        props.toggleUser();
        navigate("/comp584_final_project");
      })
      .catch(function (error) {
        console.log(error);
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
        style={{
          height: "80vh",
        }}
      >
        <div className="p-5 border shadow rounded w-50">
          <h1 className="w-100 text-center">Sign In</h1>
          <Form className="py-3" onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="email"
              onChange={handleChange}
              value={formData.email}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="password"
              onChange={handleChange}
              value={formData.password}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Link to={"/comp584_final_project/register"}>
            Need an account? Sign Up
          </Link>
        </div>
      </Container>
    </Container>
  );
}
