import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`Logout failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Logout request failed. Please try again.');
    }
  };

  return (
    <div className="logout-container">
      <h2>Déconnexion en cours...</h2>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Logout;
