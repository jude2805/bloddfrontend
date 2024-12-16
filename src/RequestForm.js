import React, { useState } from 'react';

function RequestForm() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [quantity, setQuantity] = useState('');
  const [requestDate, setRequestDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const request = {
      blood_group: bloodGroup,
      quantity: quantity,
      request_date: requestDate,
    };

    const response = await fetch('https://requestapp-cqevaydxatg8fhhk.canadacentral-01.azurewebsites.net/', {  // Change to your backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
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
      <input
        type="date"
        value={requestDate}
        onChange={(e) => setRequestDate(e.target.value)}
      />
      <button type="submit">Submit Request</button>
    </form>
  );
}

export default RequestForm;
