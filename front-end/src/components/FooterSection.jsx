import { Container } from "react-bootstrap";
import { Instagram, Twitter, Youtube } from "react-bootstrap-icons";

export default function FooterSection(props) {
  return (
    <Container
      fluid
      className="py-2"
      style={{
        backgroundColor: props.lightMode ? "white" : "#121212",
        color: props.lightMode ? "black" : "white",
      }}
    >
      <div className="d-flex justify-content-end">
        <a href="#Home" className="me-3">
          <Twitter color="grey" />
        </a>
        <a href="#Home" className="me-3">
          <Instagram color="grey" />
        </a>
        <a href="#Home" className="me-3">
          <Youtube color="grey" />
        </a>
      </div>
      <hr></hr>
      <div className="d-flex justify-content-center">
        <a
          href="#Home"
          className="me-3"
          style={{ textDecoration: "none", color: "inherit", fontSize: 12 }}
        >
          <p>ABOUT</p>
        </a>
        <a
          href="#Home"
          className="me-3"
          style={{ textDecoration: "none", color: "inherit", fontSize: 12 }}
        >
          CONTACT
        </a>
      </div>
      <div
        className="d-flex flex-column align-items-center pb-3"
        style={{ margin: 0 }}
      >
        <p style={{ margin: 0, fontSize: 12 }}>@2022 CODING IN CLOTHING</p>
        <p style={{ margin: 0, fontSize: 12 }}>18111 NORDOFF ST</p>
        <p style={{ margin: 0, fontSize: 12 }}>NORTHRIDGE, CA 91330</p>
      </div>
    </Container>
  );
}
