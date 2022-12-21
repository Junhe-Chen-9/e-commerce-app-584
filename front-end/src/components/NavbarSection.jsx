import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Moon, Sun } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";

export default function NavbarSection(props) {
  const navigate = useNavigate();
  function handleClick(path) {
    props.checkout();
    navigate(path);
  }
  function handleNav(path) {
    navigate(path);
  }

  function logout() {
    const config = {
      method: "post",
      url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/logout",
      headers: {
        Authorization: `${sessionStorage.getItem("sessionId")}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        props.clearUserCart();
        props.updateUserCart();
        props.toggleUser();
        sessionStorage.clear();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg={props.lightMode ? "light" : "dark"}
      variant={props.lightMode ? "light" : "dark"}
      className="shadow"
    >
      <Container fluid>
        <Link to={"/"}>
          <Navbar.Brand>
            <svg
              width="30"
              height="30"
              viewBox="0 0 174 143"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M109 0C109 20 64 20 64 0H37L0 20L9 58H37V143H137V58H167L174 20L137 0H109ZM67.1603 58.0011C68.0264 58.3648 68.773 58.8706 69.3791 59.5403C70.5588 60.8441 71.071 62.6199 71.071 64.7468V71.961C71.071 74.0848 71.4439 75.3286 72.0514 76.0468C72.6227 76.7222 73.5778 77.1321 75.2936 77.1321H76.3466H77.3466V78.1321V82V83H76.3466H74.8963C71.6368 83 69.0387 82.2019 67.2699 80.3737C65.5076 78.5521 64.7471 75.8913 64.7471 72.5629V66.448C64.7471 64.3071 64.3804 63.1989 63.7731 62.5833C63.1697 61.9718 62.0902 61.606 60 61.606H59V60.606V55.394V54.394H60C62.0902 54.394 63.1697 54.0281 63.7731 53.4167C64.3804 52.8011 64.7471 51.6929 64.7471 49.552V43.4371C64.7471 40.1084 65.5087 37.4476 67.2715 35.6262C69.0406 33.7982 71.6386 33 74.8963 33H76.3466H77.3466V34V37.8719V38.8719H76.3466H75.2936C73.5778 38.8719 72.6227 39.2818 72.0514 39.9572C71.4439 40.6754 71.071 41.9192 71.071 44.043V51.2532C71.071 53.3818 70.5589 55.1588 69.3791 56.4627C68.773 57.1324 68.0263 57.638 67.1603 58.0011ZM106.842 58C105.975 57.6363 105.228 57.1301 104.621 56.4597C103.441 55.1559 102.929 53.3801 102.929 51.2532V44.039C102.929 41.9152 102.556 40.6714 101.949 39.9532C101.377 39.2778 100.422 38.8679 98.7064 38.8679H97.6534H96.6534V37.8679V34V33H97.6534H99.1037C102.361 33 104.959 33.7982 106.729 35.6262C108.491 37.4476 109.253 40.1084 109.253 43.4371V49.552C109.253 51.6929 109.62 52.8011 110.227 53.4167C110.83 54.0281 111.91 54.394 114 54.394H115V55.394V60.606V61.606H114C111.91 61.606 110.83 61.9718 110.227 62.5833C109.62 63.1989 109.253 64.3071 109.253 66.448V72.5629C109.253 75.8913 108.492 78.5521 106.73 80.3737C104.961 82.2019 102.363 83 99.1037 83H97.6534H96.6534V82V78.1321V77.1321H97.6534H98.7064C100.422 77.1321 101.377 76.7222 101.949 76.0468C102.556 75.3286 102.929 74.0848 102.929 71.961V64.7468C102.929 62.6199 103.441 60.8441 104.621 59.5403C105.228 58.8699 105.975 58.3638 106.842 58Z"
                fill={props.lightMode ? "black" : "white"}
              />
            </svg>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {props.isUser ? (
              <div className="d-flex">
                <Navbar.Brand>
                  Hello{" "}
                  {sessionStorage.getItem("displayName").replace(/['"]+/g, "")}
                </Navbar.Brand>
                <Nav.Link onClick={() => logout()}>Sign Out</Nav.Link>
              </div>
            ) : (
              <Nav.Link onClick={() => handleNav("/login")}>Sign In</Nav.Link>
            )}

            <Nav.Link onClick={() => handleNav("/tracking")}>
              Track Order
            </Nav.Link>
            <NavDropdown
              title="Product Catagories"
              id="collasible-nav-dropdown"
              variant={props.lightMode ? "light" : "dark"}
            >
              <NavDropdown.Item onClick={() => handleNav("/outerwear")}>
                Outerwear
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNav("/tops")}>
                Tops
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNav("/bottoms")}>
                Bottoms
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleNav("/accessories")}>
                Accessories
              </NavDropdown.Item>

              <NavDropdown.Item onClick={() => handleNav("/all")}>
                All Products
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={`Cart (${props.cartItems.length})`}
              id="collasible-nav-dropdown"
              variant={props.lightMode ? "light" : "dark"}
            >
              {props.cartItems.length === 0 ? (
                <div className="d-flex justify-content-center">
                  <p>Your Cart is Empty</p>
                </div>
              ) : (
                props.cartItems.map((item) => {
                  return (
                    <div
                      key={nanoid()}
                      className="d-flex justify-content-between align-items-center"
                      style={{ minWidth: "350px" }}
                    >
                      <div className="d-flex">
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
                          {(item.price / Math.pow(10, 2)).toLocaleString(
                            "en-us",
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </div>
                      <Button
                        variant="danger"
                        className="m-2"
                        onClick={() => {
                          props.removeItem(item);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })
              )}
              <NavDropdown.Divider />
              <div className="w-100 d-flex">
                <Button
                  variant="dark"
                  size="large"
                  className="w-75 mx-auto"
                  onClick={() => {
                    handleClick("/checkout");
                  }}
                  disabled={props.cartItems.length === 0}
                >
                  Checkout
                </Button>
              </div>
            </NavDropdown>
            <button
              className="toogle-theme d-flex align-items-center px-lg-3 p-0"
              style={{
                background: "none",
                border: "none",
                textDecoration: "none",
              }}
              onClick={props.toggleMode}
            >
              {props.lightMode ? <Sun fill="black" /> : <Moon fill="white" />}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
