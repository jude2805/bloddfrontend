import React, { useState } from 'react';

function DonationsForm() {
    const [donorId, setDonorId] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [donorInfo, setDonorInfo] = useState({});
    const [inventory, setInventory] = useState(0);
    const [donorExists, setDonorExists] = useState(false);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if the donor exists and there is enough blood in the inventory
        if (!donorExists) {
            alert('Donor not found!');
            return;
        }
        if (inventory < quantity) {
            alert('Not enough blood in the inventory!');
            return;
        }

        const donation = {
            donor_id: donorId,
            blood_group: bloodGroup,
            quantity: quantity,
            donation_date: donationDate,
        };

        // Make the POST request to register the donation
        const response = await fetch('https://donationapp-crf8cwfpe8f7dqdz.canadacentral-01.azurewebsites.net/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donation),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert('Donation registered successfully!');
        } else {
            alert('Failed to register donation!');
        }
    };

    // Fetch donor info based on donor ID
    const handleDonorIdChange = async (e) => {
        setDonorId(e.target.value);
        const response = await fetch('https://donationapp-crf8cwfpe8f7dqdz.canadacentral-01.azurewebsites.net/');
        if (response.ok) {
            const donor = await response.json();
            setDonorInfo(donor);
            setDonorExists(true);
        } else {
            setDonorExists(false);
        }
    };

    // Fetch available inventory based on the blood group
    const handleBloodGroupChange = async (e) => {
        setBloodGroup(e.target.value);
        const response = await fetch('https://inventoryapp-ghhnaub4ehcvd7d0.canadacentral-01.azurewebsites.net/');
        if (response.ok) {
            const inventoryData = await response.json();
            setInventory(inventoryData.quantity);
        } else {
            setInventory(0);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={donorId}
                onChange={handleDonorIdChange} // Only use handleDonorIdChange here
                placeholder="Donor ID"
            />
            <input
                type="text"
                value={bloodGroup}
                onChange={handleBloodGroupChange} // Only use handleBloodGroupChange here
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

            {/* Display Donor Information if donor exists */}
            {donorExists && (
                <div>
                    <h3>Donor Info:</h3>
                    <p>Name: {donorInfo.name}</p>
                    <p>Email: {donorInfo.email}</p>
                    <p>Blood Group: {donorInfo.bloodGroup}</p>
                </div>
            )}
        </form>
    );
}

export default DonationsForm;
