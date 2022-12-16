import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HeroSection(props) {
  return (
    <div className="hero-section text-center d-flex flex-column justify-content-center">
      <h1
        className="display-1 fw-bold pb-5 mt-5"
        style={{ color: props.lightMode ? "black" : "white" }}
      >
        Coding in Clothing
      </h1>
      <div className="col-7 mx-auto mb-5">
        <div className="gap-2 d-xl-flex d-grid justify-content-xl-center">
          <Link to={"/comp584_final_project/outerwear"}>
            <Button
              variant={props.lightMode ? "light" : "dark"}
              size="large"
              className="px-xl-4 shadow w-100"
            >
              Outerwear
            </Button>
          </Link>
          <Link to={"/comp584_final_project/tops"}>
            <Button
              variant={props.lightMode ? "light" : "dark"}
              size="large"
              className="px-xl-4 shadow w-100"
            >
              Tops
            </Button>
          </Link>
          <Link to={"/comp584_final_project/bottoms"}>
            <Button
              variant={props.lightMode ? "light" : "dark"}
              size="large"
              className="px-xl-4 shadow w-100"
            >
              Bottoms
            </Button>
          </Link>
          <Link to={"/comp584_final_project/accessories"}>
            <Button
              variant={props.lightMode ? "light" : "dark"}
              size="large"
              className="px-xl-4 shadow w-100"
            >
              Accessories
            </Button>
          </Link>
          <Link to={"/comp584_final_project/all"}>
            <Button
              variant={props.lightMode ? "light" : "dark"}
              size="large"
              className="px-xl-4 shadow w-100"
            >
              All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
