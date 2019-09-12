import React from 'react';
import PropTypes from 'prop-types';

RadioOption.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

RadioOption.defaultProps = {
  value: '',
  disabled: false,
  checked: false
};

function RadioOption({ name, label, value, disabled, onChange, checked }) {
  const id = `${name}-${label}`.toLowerCase();
  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />
      {label}
    </label>
  );
}

export default RadioOption;
