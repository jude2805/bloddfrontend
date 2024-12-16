import React, { useState } from 'react';

function DonorForm() {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState('');
  const [lastDonationDate, setLastDonationDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const donor = {
      name: name,
      blood_group: bloodGroup,
      age: age,
      last_donation_date: lastDonationDate,
    };

    const response = await fetch('https://donorapp-g0b3bvcaepe5g3e6.canadacentral-01.azurewebsites.net/', {  // Change to your backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donor),
    });
    
    const result = await response.json();
    console.log(result);  // Log the response from your backend API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Donor Name"
      />
      <input
        type="text"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        placeholder="Blood Group"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input
        type="date"
        value={lastDonationDate}
        onChange={(e) => setLastDonationDate(e.target.value)}
      />
      <button type="submit">Add Donor</button>
    </form>
  );
}

export default DonorForm;
