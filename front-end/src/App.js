import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./pages/Checkout";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CookiesProvider } from "react-cookie";
import { useCookies } from "react-cookie";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function App() {
  const [cookies, setCookie] = useCookies(["cartItems"]);

  const [isLightMode, setIsLightMode] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [clientSecret, setClientSecret] = useState("");
  const [isUser, setIsUser] = useState(false);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  function toggleUser() {
    setIsUser((prev) => !prev);
  }

  function toggleMode() {
    setIsLightMode((prev) => !prev);
  }

  function clearUserCart() {
    var data = JSON.stringify({
      username: sessionStorage.getItem("userName").replace(/['"]+/g, ""),
      stripeId: "lol",
    });
    var config = {
      method: "post",
      url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/cart/clear",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateUserCart() {
    let temp = [];
    cartItems.forEach((item) => {
      temp.push(item.id);
    });
    console.log(temp);
    var data = JSON.stringify({
      userName: sessionStorage.getItem("userName").replace(/['"]+/g, ""),
      stripeIds: temp,
    });

    var config = {
      method: "post",
      url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/cart/updateCart",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function addToCart(product) {
    let temp = [...cartItems];
    temp.push(product);
    setCartItems(temp);
    setCookie("cartItems", temp);
  }

  function removeItem(product) {
    let temp = [];
    let flag = true;
    cartItems.forEach((item) => {
      if (flag === true && item.id === product.id) {
        flag = false;
      } else {
        temp.push(item);
      }
    });
    setCartItems(temp);
    setCookie("cartItems", temp);
  }

  function checkout() {
    // Create PaymentIntent as soon as the page loads
    fetch(
      "https://themillenniumfalcon.junhechen.com//584final/api/v1/stripe/paymentIntend",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartItems.reduce(
            (accumulator, currentValue) =>
              accumulator + parseInt(currentValue.price),
            0
          ),
          currency: "USD",
          method: "card",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
    console.log("clientsecret: " + clientSecret);
  }

  function filter(category, products) {
    let outputArr = [];
    products.forEach((element) => {
      if (element.category === category) {
        outputArr.push(element);
      }
    });
    return outputArr;
  }

  useEffect(() => {
    function loadCart() {
      if (!isUser) {
        console.log("No user logged in");
        return;
      }
      let temp = [];
      var config = {
        method: "post",
        url: "https://themillenniumfalcon.junhechen.com/584final/api/v1/cart/load",
        headers: {
          "Content-Type": "text/plain",
        },
        data: sessionStorage.getItem("userName").replace(/['"]+/g, ""),
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          response.data.forEach((element) => {
            temp.push(element);
          });
          setCartItems(temp);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    loadCart();
  }, [isUser]);

  useEffect(() => {
    axios
      .get(
        "https://themillenniumfalcon.junhechen.com/584final/api/v1/stripe/getAllItem"
      )
      .then((res) => {
        const products = res.data;
        let resArr = [];
        products.forEach((element) => {
          resArr.push(element);
        });
        //console.log(products);
        setAllProducts(resArr);
      })
      .catch((err) => {
        console.log(err);
      });
    setCartItems(cookies.cartItems === undefined ? [] : cookies.cartItems);
  }, []);

  return (
    <CookiesProvider>
      <Routes>
        <Route
          path="/e-commerce-app-584"
          element={
            <Dashboard
              key={cartItems}
              lightMode={isLightMode}
              toggleMode={toggleMode}
              cartItems={cartItems}
              removeItem={removeItem}
              checkout={checkout}
              isUser={isUser}
              toggleUser={toggleUser}
              clearUserCart={clearUserCart}
              updateUserCart={updateUserCart}
            />
          }
        >
          <Route index element={<Home lightMode={isLightMode} />} />
          <Route
            path="/e-commerce-app-584/outerwear"
            element={
              <Products
                text="Outerwear"
                lightMode={isLightMode}
                products={filter("outerwear", allProducts)}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/e-commerce-app-584/tops"
            element={
              <Products
                text="Tops"
                lightMode={isLightMode}
                products={filter("tops", allProducts)}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/e-commerce-app-584/bottoms"
            element={
              <Products
                text="Bottoms"
                lightMode={isLightMode}
                products={filter("bottoms", allProducts)}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/e-commerce-app-584/accessories"
            element={
              <Products
                text="Accesories"
                lightMode={isLightMode}
                products={filter("accessories", allProducts)}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/e-commerce-app-584/all"
            element={
              <Products
                text="All Products"
                lightMode={isLightMode}
                products={allProducts}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/e-commerce-app-584/checkout"
            element={
              <Checkout
                lightMode={isLightMode}
                appearance={appearance}
                options={options}
                clientSecret={clientSecret}
                stripePromise={stripePromise}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/e-commerce-app-584/login"
            element={<Login toggleUser={toggleUser} lightMode={isLightMode} />}
          />
          <Route
            path="/e-commerce-app-584/register"
            element={<Register lightMode={isLightMode} />}
          />
        </Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
