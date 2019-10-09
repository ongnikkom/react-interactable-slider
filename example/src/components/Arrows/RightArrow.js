import React from 'react';
import { arrow } from './styles';

function RightArrow({ navigationType, disabled }) {
  console.log(navigationType);
  return (
    <div className={arrow('right', navigationType === 'both', disabled)}>
      <i className="far fa-arrow-alt-circle-right" />
    </div>
  );
}

export default RightArrow;
