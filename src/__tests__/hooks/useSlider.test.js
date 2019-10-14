import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useSlider from '../../hooks/useSlider';

test('returns `render` value', () => {
  const result = {};
  function TestComponent() {
    result.current = useSlider();
    return null;
  };
  render(<TestComponent />);
  console.log(result.current);
})