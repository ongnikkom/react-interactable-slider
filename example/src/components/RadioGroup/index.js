import React from 'react';
import PropTypes from 'prop-types';
import { container } from './styles';

import RadioOption from '../RadioOption';

RadioGroup.propTypes = {
  children: PropTypes.node.isRequired,
  stacked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

function RadioGroup({ children, stacked, value, ...rest }) {
  return React.Children.map(children, (child, index) => {
    if (child.type === RadioOption) {
      const props = { ...child.props, checked: value === child.props.value };
      const el = <child.type {...props} {...rest} />;
      const isLast = index === React.Children.count(children) - 1;
      return <div className={container(stacked, isLast)}>{el}</div>;
    } else {
      return child;
    }
  });
}

export default RadioGroup;
