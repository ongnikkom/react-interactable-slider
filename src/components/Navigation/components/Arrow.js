import React from 'react';

function Arrow({ children, className, onClick }) {
  return (
    <div className={className} onClick={onClick} data-testid='navigation-arrow'>
      {children && children}
    </div>
  );
}

export default Arrow;
