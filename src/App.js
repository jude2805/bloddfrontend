import React from 'react';
import './App.css';
import logo from './assets/logo.png';  // Adjust the path as needed
import DonationsForm from './DonationsForm';  // Import the DonationsForm component
import DonorForm from './DonorForm';
import RequestForm from './RequestForm';
import InventoryForm from './InventoryForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Blood Donation Management System</h1>  {/* Title for the page */}
      </header>

      <div className="forms-container">
        <DonorForm />
        <DonationsForm />
        <RequestForm />
        <InventoryForm />
      </div>
    </div>
  );
}

export default App;

