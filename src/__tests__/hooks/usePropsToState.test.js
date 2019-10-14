import { renderHook, act } from '@testing-library/react-hooks';
import usePropsToState from "../../hooks/usePropsToState";
import { internalProps, mockProps } from '../__mocks__/mockProps';

test('usePropsToState', () => {
  // INITIAL RENDER
  const { result, rerender } = renderHook(usePropsToState, { initialProps: mockProps });
  expect(result.current[0]).toEqual(Object.assign({}, internalProps, mockProps));

  // Changing one of the properties in the props
  rerender({ ...mockProps, cellAlign: 'right'});
  expect(result.current[0]).toEqual(Object.assign({}, internalProps, mockProps, { cellAlign: 'right' }));

  // Firing 'setState' funtion
  act(() => result.current[1]({ ...mockProps, marginGapsPerSlide: 8 }));
  expect(result.current[0]).toEqual(Object.assign({}, internalProps, mockProps, { marginGapsPerSlide: 8 }));
});
