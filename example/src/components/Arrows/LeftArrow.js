import React from 'react';
import { arrow } from './styles';

function LeftArrow({ navigationType, disabledArrow }) {
  return (
    <div className={arrow('left', navigationType === 'both', disabledArrow)}>
      <i className="far fa-arrow-alt-circle-left" />
    </div>
  );
}

export default LeftArrow;
