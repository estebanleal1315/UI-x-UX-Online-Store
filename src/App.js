import React, { useState, useEffect } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import Cart from "./Components/Cart.js";
import About from "./Components/About.js";
import Shop from "./Components/SearchComp"; // Import the Cart component
import Checkout from "./Components/Checkout.js";
import { CartProvider } from "./Components/CartContext.js"; // Import the CartProvider
import Register from "./Components/RegisterComponent.js";
import MensClothing from "./Components/MensClothing.js";
import WomensClothing from "./Components/WomensClothing.js";
import AddItemForm from "./Components/AddItemForm.js";
import { AuthProvider } from "./Components/AuthProvider.js"; // adjust the import path as necessary

import "./styles/bootstrap.min.css";
import "./styles/font-awesome.min.css";
import "./styles/elegant-icons.css";
import "./styles/magnific-popup.css";
import "./styles/nice-select.css";
import "./styles/owl.carousel.min.css";
import "./styles/slicknav.min.css";
import "./styles/style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import ItemDetails from "./Components/ProductDetails";
import SearchBar from "./Components/SearchBar";
import SearchComp from "./Components/SearchComp";
import axios from "axios"; // Import axios for making HTTP requests

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://ixzulbasz7.execute-api.us-east-2.amazonaws.com/dev/clothing");
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        const mensItems = (data.MensClothing || []).map(item => ({ ...item, category: 'Men' }));
        const womensItems = (data.WomensClothing || []).map(item => ({ ...item, category: 'Women' }));
        const combinedItems = [...mensItems, ...womensItems];   
        setItems(combinedItems);

      } catch (error) {
        console.error("Error fetching items:", error);
        setItems([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addItem = (newItem) => {
    setItems(prevItems => [
      ...prevItems,
      { ...newItem, id: prevItems.length + 1 },
    ]);
  };

  function transformNewItemToOldFormat(newItem) {
    return {
      id: newItem.SKU, // Use SKU as id
      name: newItem.ITEM,
      price: parseFloat(newItem.PRICE),
      quantity: parseInt(newItem.NUM_AVAILABLE, 10),
      description: newItem.DESCRIPTION,
      image: newItem.ITEM_IMAGE, // Adjust if the key for image URL differs
      inCart: 1,
    };
  }

  const oItems = items.map(transformNewItemToOldFormat);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* Google Font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          <div className="top-banner">
            <img className="banner-image" src="/Logo.png" alt="Banner Image" />
          </div>

          {/* Header Section Begin */}
          <header className="header">
            <div className="header__top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-7"></div>
                      <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/search-comp" >Shop</Link>
                        <Link to="/about-us">About Us</Link>
                        <SearchBar items={oItems} />
                        <Link className="login-link" to="/login">
                          <FaUserCircle /> {/* Render the avatar icon */}
                        </Link>
                        <Link className="cart-link" to="/cart">
                          <FaShoppingBag /> {/* Render the shopping bag icon */}
                        </Link>
                      </div>
                </div>
              </div>
            </div>

          </header>

          <Routes>
            <Route path="/" element={<Home items={oItems} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/mens-clothing" element={<MensClothing />} />
            <Route path="/womens-clothing" element={<WomensClothing />} />
            <Route path="/item-details/:id" element={<ItemDetails />} />
            <Route path="/Shop" element={<SearchComp items={oItems} />} />
            <Route path="/search-comp" element={<SearchComp items={oItems}/>} />
            <Route
              path="/add-item"
              element={<AddItemForm addItem={addItem} />}
            />
            <Route
                path="/search-comp"
                element={<SearchComp key={Date.now()} />}
            />

            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
