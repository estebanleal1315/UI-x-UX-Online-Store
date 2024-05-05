import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "./CartContext";
import "../styles/ProductDetails.css";

const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const [size, setSize] = useState("Medium"); // Default size set to 'Medium'
  const [feedbackMessage, setFeedbackMessage] = useState(""); // State to hold feedback message

  const item = location.state?.itemData || {
    id: "",
    name: "Item not found",
    image: "",
    price: 0,
    description: "Description not available",
    quantity: 0,
    size: "",
    uniqueId: "b",
  };

  const handleAddToCart = () => {
    if (item.quantity > 0) {
      const itemWithSize = { ...item, size };
      addToCart(itemWithSize);
      setFeedbackMessage("Item added to cart!"); // Set feedback message
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
    } else {
      setFeedbackMessage("This item is out of stock."); // Inform user item is out of stock
      setTimeout(() => setFeedbackMessage(""), 3000); // Clear message after 3 seconds
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="product-details" aria-labelledby="product-title">
      <img className="product-image" src={item.image} alt={item.name} />
      <h2 className="product-title" id="product-title">{item.name}</h2>
      <p className="product-price">${item.price.toFixed(2)}</p>
      <p className="product-description">{item.description}</p>
      <p className="product-availability">
        {item.quantity > 0 ? `Available: ${item.quantity}` : <strong>Out of Stock</strong>}
      </p>
      <div className="size-selector">
        <label htmlFor="size-select">Size:
        <select id="size-select" value={size} onChange={(e) => setSize(e.target.value)} aria-label="Select size" disabled={item.quantity === 0}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        </label>
      </div>
      {feedbackMessage && (
        <div className="feedback-message" aria-live="assertive">
          {feedbackMessage}
        </div>
      )}
      <div className="action-buttons">
        <button className="back-button" onClick={goBack} aria-label="Go back to previous page">
          Back
        </button>
        <button className="cart-button" onClick={handleAddToCart} aria-label="Add item to cart" disabled={item.quantity === 0} style={{ opacity: item.quantity > 0 ? 1 : 0.5 }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
