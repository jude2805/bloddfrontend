import React, { useState } from 'react';

function DonationsForm() {
    const [donorId, setDonorId] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState('');
    const [donationDate, setDonationDate] = useState('');
    const [donorInfo, setDonorInfo] = useState({});
    const [inventory, setInventory] = useState(0);
    const [donorExists, setDonorExists] = useState(false);

    // Fetch donor info based on donor ID
    const handleDonorIdChange = async (e) => {
        setDonorId(e.target.value);
        const response = await fetch(`http://localhost:3001/donors/${e.target.value}`);
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
        const response = await fetch(`http://localhost:3003/inventory/${e.target.value}`);
        if (response.ok) {
            const inventoryData = await response.json();
            setInventory(inventoryData.quantity);
        } else {
            setInventory(0);
        }
    };

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

        // Call the Blood Donation Service to register the donation
        const response = await fetch('http://localhost:3002/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(donation),
        });

        const result = await response.json();
        console.log(result);
        alert('Donation registered successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={donorId}
                onChange={handleDonorIdChange}
                placeholder="Donor ID"
            />
            <input
                type="text"
                value={bloodGroup}
                onChange={handleBloodGroupChange}
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

            {/* Display Donor Information */}
            {donorExists && (
                <div>
                    <h3>Donor Information</h3>
                    <p>Name: {donorInfo.name}</p>
                    <p>Blood Group: {donorInfo.blood_group}</p>
                    <p>Last Donation: {donorInfo.last_donation_date}</p>
                </div>
            )}

            {/* Display Inventory Info */}
            <div>
                <h3>Available Inventory</h3>
                <p>Blood Group: {bloodGroup}</p>
                <p>Quantity Available: {inventory}</p>
            </div>
        </form>
    );
}

export default DonationsForm;
