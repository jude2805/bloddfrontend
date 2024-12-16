import React, { useState } from 'react';

function DonationsForm() {
    const [donorId, setDonorId] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('');
    const [donationDate, setDonationDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const donation = {
            donor_id: donorId,
            blood_group: bloodGroup,
            quantity: quantity,
            donation_date: donationDate,
        };

        const response = await fetch('http://localhost:3002/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donation),
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={donorId}
                onChange={(e) => setDonorId(e.target.value)}
                placeholder="Donor ID"
            />
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
                value={donationDate}
                onChange={(e) => setDonationDate(e.target.value)}
            />
            <button type="submit">Submit Donation</button>
        </form>
    );
}

export default DonationsForm;
