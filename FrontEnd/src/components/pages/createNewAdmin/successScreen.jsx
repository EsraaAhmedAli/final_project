import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/admins');
  };

  return (
    <div>
      <p>Admin Added Successfully !</p>
      <button onClick={handleRedirect}>Close</button>
    </div>
  );
};

export default MyComponent;
