import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Item.css";  // Make sure the path is correct and the CSS is needed.

const Item = ({
  id,
  image,
  name,
  price,
  description = "No description available",  // Default description
  quantity = 1,  // Default quantity
  size = "N/A",  // Default size
  inCart = false,
  uniqueId
}) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/item-details/${id}`, {
      state: {
        itemData: {
          id,
          image,
          name,
          price,
          description,
          quantity,
          inCart,
          size,
          uniqueId,
        },
      },
    });
  };

  return (
    <div className="product__item" onClick={goToDetails} role="button" aria-label={`View details of ${name}`}>
      <img src={image} alt={name} className="item-image" />
      <div className="product__details">
        <h3 className="product__item__text">{name}</h3>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Item;
