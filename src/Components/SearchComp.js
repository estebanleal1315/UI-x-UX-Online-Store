import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Item from "./Item";
import "../styles/SearchComp.css";

export default function SearchComp({ items }) {
  const location = useLocation();
  const initialItems = location.state?.filteredItems || items;  // Use default items if location state is undefined
  const searchTerm = location.state?.searchTerm || "";

  const [filteredItems, setFilteredItems] = useState(initialItems);  // Initialize with initialItems
  const [priceFilter, setPriceFilter] = useState("...");
  const [availableFilter, setAvailableFilter] = useState(false);

  useEffect(() => {
    // Listen to location state changes for new filtered items
    if (location.state?.filteredItems) {
      setFilteredItems(location.state.filteredItems);
    }
  }, [location.state]);

  useEffect(() => {
    let newFilteredItems = [...initialItems]; // Start with a fresh copy of initialItems

    // Apply price sorting
    switch (priceFilter) {
      case "low-to-high":
        newFilteredItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "high-to-low":
        newFilteredItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
    }

    // Filter by availability if required
    if (availableFilter) {
      newFilteredItems = newFilteredItems.filter(item => item.quantity > 0);
    }

    setFilteredItems(newFilteredItems);
  }, [priceFilter, availableFilter, initialItems]);  // Include initialItems in the dependency array

  const onProductClick = (itemName) => {
    console.log(`${itemName} clicked!`);
    // Additional logic can be added here
  };

  return (
    <div className="component-container">
      <div className="filter-container">
        <div>
          <label>
            Sort by price:
            <select
              className="sort-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="...">Select</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </label>
          <label className="availability-checkbox">
            Show available items only
            <input
              type="checkbox"
              checked={availableFilter}
              onChange={(e) => setAvailableFilter(e.target.checked)}
            />
          </label>
        </div>
      </div>

      <div className="results-heading">{`${searchTerm}`}</div>
      <section className="items-display">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-container">
            <Item
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
              quantity={item.quantity}
              size={item.size}
              inCart={item.inCart}
              uniqueId={item.uniqueId}
              onProductClick={() => onProductClick(item.name)}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
