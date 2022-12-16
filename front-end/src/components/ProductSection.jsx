import { Button, Col, Container, Row } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";

export default function ProductSection(props) {
  return (
    <div className="product-section">
      <Container
        fluid
        style={{
          backgroundColor: props.lightMode ? "white" : "#121212",
          minHeight: "100vh",
        }}
      >
        <Row className="row-cols-2 row-cols-xl-3 g-4 px-3">
          {props.products.map((product) => (
            <Col key={product.id}>
              {product.image_url.length !== 0 ? (
                <img
                  src={product.image_url[0]}
                  alt="product"
                  style={{ width: "100%" }}
                />
              ) : (
                <img
                  src="https://www.nicepng.com/png/detail/207-2070432_white-background-url.png"
                  alt="product"
                  style={{ width: "100%" }}
                />
              )}

              <p
                style={{
                  color: props.lightMode ? "black" : "white",
                }}
              >
                {product.productName} <br />${" "}
                {(product.price / Math.pow(10, 2)).toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <Button
                onClick={() => {
                  props.addToCart(product);
                }}
                className="shadow"
              >
                <PlusSquare /> Add To Cart
              </Button>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
