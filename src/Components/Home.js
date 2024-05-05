import React, { useState, useContext } from "react";
import "../styles/Home.css";
import Item from "./Item";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import banner from "../images/banner/banner66.png";

const Home = ({ items }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");

  const onProductClick = (itemName) => {
    console.log(`${itemName} clicked!`);
    // Add additional logic here for when an item is clicked
  };

  return (
    <div>
      <div className="top-banner">
        <img className="banner-image"
            src={banner}
            alt="Header Image"
            style={{ display: 'block', margin: 'auto' }}
        />
      </div>
      <div className="home-container">
        <section className="product-section">
          <div className="product-container">
            <div className="filter-controls">
              <h3 style={{ padding: 20 }}>Best Sellers</h3>
            </div>

            <div className="product-display" aria-live="polite">
              {items.slice(0, 10).sort((a, b) => b.price - a.price).map((item) => (
                <div key={item.id} className="product-item" onClick={() => onProductClick(item.description)} tabIndex="0" aria-label={`Click for more about ${item.name}`}>
                  <Item
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    quantity={item.quantity}
                    size={item.size}
                    inCart={item.inCart}
                    uniqueId={item.uniqueId}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer__about">
                <a href="#">
                  <img src="../images/footer-logo.png" alt="Footer Logo" />
                </a>
                <p>The customer is at the heart of our unique business model, which includes design.</p>
                <a href="#">
                  <img src="../images/payment.png" alt="Payment Methods" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
