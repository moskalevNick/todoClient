import React, {useState} from 'react';

import './styles.css';

export const Modal = ({ children, isOpen, onClose, closeOnOverlayClick = true }) => {
  const [isOverlay, setIsOverlay] = useState(false);
  
  const handleClose = () => {
    if (isOverlay) {
      onClose();
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          className={'overlay'}
          onClick={closeOnOverlayClick && handleClose}
        >
          <div
            className={'content'}
            onMouseEnter={setIsOverlay.bind(null, false)}
            onMouseLeave={setIsOverlay.bind(null, true)}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};