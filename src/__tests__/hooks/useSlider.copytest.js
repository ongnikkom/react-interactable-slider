import * as React from 'react';
import { render, wait } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import useSlider from '../../hooks/useSlider';
import { mockInternalProps, mockComponentProps } from '../__mocks__/mockProps';
import usePropsToState from '../../hooks/usePropsToState';

const TestComponent = ({ children, ...rest }) => children(rest)

function setup (props) {
  let returnVal;
  render(
    <TestComponent {...props}>
      {val => {
        returnVal = useSlider(val);
        return null;
      }}
    </TestComponent>
  );
  return returnVal;
};

test('if it returns the `render` value', async () => {
  const children = [...Array(10).keys()].map((slide, index) => React.createElement('div', { key: index }, slide))
  
  const initialProps = {
    ...mockInternalProps,
    ...mockComponentProps,
    children
  }

  const { result: usePropsToStateResult } = renderHook(usePropsToState, { initialProps });
  const result = setup(usePropsToStateResult.current);
  console.log(result);
  // expect(result.current[0]).toBeInstanceOf(Function);

  // rerender({ mockInternalProps, ...mockComponentProps })
});