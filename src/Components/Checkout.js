import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/checkout.css";
import { CartContext } from "./CartContext";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    apartmentNumber: "",
    phoneNumber: "",
    email: "",
    cardholderName: "",
    cardNumber: "",
    cardExpiration: "",
    cardCvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompletedOrder({ formData, cartItems }); // Store both form data and cart items
    setCheckoutCompleted(true);
    setCartItems([]); // Clear cart items on successful checkout
  };

  if (checkoutCompleted && completedOrder) {
    return (
      <div className="checkout-container2">
        <h1>Thank you for your purchase, {completedOrder.formData.firstName}!</h1>
        <h2>Order Summary</h2>
        <div>
          <h3>Shipping to:</h3>
          <p>{completedOrder.formData.streetAddress}, {completedOrder.formData.apartmentNumber ? `${completedOrder.formData.apartmentNumber}, ` : ''}{completedOrder.formData.city}, {completedOrder.formData.state} {completedOrder.formData.zipcode}</p>
          <h3>Contact:</h3>
          <p>Email: {completedOrder.formData.email}, Phone: {completedOrder.formData.phoneNumber}</p>
        </div>
        <h3>Items Purchased:</h3>
        <ul>
          {completedOrder.cartItems.map((item, index) => (
            <li key={index}>{item.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
        <Link to="/" className="back-link2">Back to Shopping</Link>
      </div>
    );
  }

  // Render form fields for user input
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <h5>Personal Information</h5>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required />
          <label htmlFor="middleInitial">Middle Initial</label>
          <input type="text" name="middleInitial" id="middleInitial" value={formData.middleInitial} onChange={handleChange} />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <h5>Shipping Information</h5>
          <label htmlFor="streetAddress">Street Address</label>
          <input type="text" name="streetAddress" id="streetAddress" value={formData.streetAddress} onChange={handleChange} required />
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required />
          <label htmlFor="state">State</label>
          <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required />
          <label htmlFor="zipcode">Zipcode</label>
          <input type="text" name="zipcode" id="zipcode" value={formData.zipcode} onChange={handleChange} required />
          <label htmlFor="apartmentNumber">Apartment Number (Optional)</label>
          <input type="text" name="apartmentNumber" id="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <h5>Contact Information</h5>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <h5>Payment Information</h5>
          <label htmlFor="cardholderName">Cardholder's Name</label>
          <input type="text" name="cardholderName" id="cardholderName" value={formData.cardholderName} onChange={handleChange} required />
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" name="cardNumber" id="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
          <label htmlFor="cardExpiration">Expiration Date (MM/YYYY)</label>
          <input type="text" name="cardExpiration" id="cardExpiration" value={formData.cardExpiration} onChange={handleChange} required />
          <label htmlFor="cardCvv">CVV</label>
          <input type="text" name="cardCvv" id="cardCvv" value={formData.cardCvv} onChange={handleChange} required />
        </div>
        <button type="submit" className="checkout-button">Complete Purchase</button>
      </form>
      <Link to="/cart" className="back-link">Back to Cart</Link>
    </div>
  );
};

export default Checkout;
