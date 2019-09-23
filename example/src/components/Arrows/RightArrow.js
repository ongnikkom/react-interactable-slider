import React from 'react';
import { arrow } from './styles';

function RightArrow({ navigationType, disabledArrow }) {
  return (
    <div className={arrow('right', navigationType === 'both', disabledArrow)}>
      <i className="far fa-arrow-alt-circle-right" />
    </div>
  );
}

export default RightArrow;
