import React from 'react';
import './App.css';
import DonationsForm from './DonationsForm';  // Import the DonationsForm component
import logo from './assets/blood-donation.png';  // Adjust the path as needed

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blood Donation Form</h1>  {/* Title for the page */}
        <DonationsForm />  {/* Render the DonationsForm component */}
      </header>
    </div>
  );
}

export default App;

