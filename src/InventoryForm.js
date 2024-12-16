import React, { useState } from 'react';

function InventoryForm() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inventory = {
      blood_group: bloodGroup,
      quantity: quantity,
    };

    const response = await fetch('https://inventoryapp-ghhnaub4ehcvd7d0.canadacentral-01.azurewebsites.net/', {  // Change to your backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inventory),
    });

    const result = await response.json();
    console.log(result);  // Log the response from your backend API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        placeholder="Blood Group"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <button type="submit">Update Inventory</button>
    </form>
  );
}

export default InventoryForm;
