// Popup.js
import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ onClose, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
    window.location.href = '/BoardPage';
  };

  return (
    isOpen && (
      <div className="popup">
        <div className="popup-content">
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    )
  );
};

export default Popup;
