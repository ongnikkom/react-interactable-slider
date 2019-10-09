import React from 'react';

function Arrow({ children, className, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      {children && children}
    </div>
  );
}

export default Arrow;
