import React from 'react';
import { arrow } from './styles';

function LeftArrow({ navigationType, disabled }) {
  return (
    <div className={arrow('left', navigationType === 'both', disabled)}>
      <i className="far fa-arrow-alt-circle-left" />
    </div>
  );
}

export default LeftArrow;
