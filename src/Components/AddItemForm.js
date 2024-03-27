import React, { useState } from 'react';

function AddItemForm(props) {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handleItemPriceChange = (event) => {
        setItemPrice(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can handle the submission of the form, e.g., send data to a server
        // You can access itemName and itemPrice state variables here to get the form data
        console.log('Submitted:', { itemName, itemPrice });
        // Optionally, you can reset the form fields after submission
        setItemName('');
        setItemPrice('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Item Name:
                <input type="text" value={itemName} onChange={handleItemNameChange} />
            </label>
            <label>
                Item Price:
                <input type="text" value={itemPrice} onChange={handleItemPriceChange} />
            </label>
            <button type="submit">Add Item</button>
        </form>
    );
}

export default AddItemForm;
